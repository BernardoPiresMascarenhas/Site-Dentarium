"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

import type { Review } from "@/data/reviews";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { ReviewCard } from "./ReviewCard";

/** Velocidade do deslocamento contínuo, em px/s. */
const SPEED = 26;
/** Constante de tempo da aceleração/desaceleração ao pausar e retomar (s). */
const EASE_TIME = 0.5;

const mod = (n: number, m: number) => ((n % m) + m) % m;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Carrossel contínuo em "anel": cada depoimento existe UMA vez no DOM e é
 * reposicionado individualmente quando sai pela esquerda — o loop é infinito
 * sem clones (nada duplicado para leitores de tela ou teclado).
 *
 * Pausa com: hover, foco, toque/arrasto, texto expandido, aba em segundo
 * plano, seção fora da tela ou botão de pausa. Com prefers-reduced-motion,
 * fica estático e navegável pelas setas e por gesto.
 */
export function ReviewsCarousel({ items }: { items: Review[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [loopable, setLoopable] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [userPaused, setUserPaused] = useState(false);

  // Estado de animação fora do React: 60 fps sem re-renderizar.
  const anim = useRef({
    offset: 0,
    velocity: 0,
    step: 0,
    gap: 0,
    cardWidth: 0,
    total: 0,
    viewport: 0,
    loop: true,
    /** Respiro lateral da área visível (onde ocorre o esmaecimento). */
    pad: 0,
    tween: null as null | { from: number; to: number; start: number; duration: number },
    drag: null as null | { id: number; startX: number; startY: number; startOffset: number; active: boolean },
  });
  const pause = useRef({ hover: false, focus: false, touch: false, hidden: false, offscreen: false });
  const flags = useRef({ expanded: false, user: false, reduced: false });
  useEffect(() => {
    flags.current = { expanded: expanded.size > 0, user: userPaused, reduced: reducedMotion };
  }, [expanded, userPaused, reducedMotion]);

  const place = useCallback(() => {
    const a = anim.current;
    if (!a.step) return;
    if (!a.loop) a.offset = Math.max(0, Math.min(a.offset, Math.max(0, a.total - a.gap - a.viewport)));
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const base = i * a.step - a.offset;
      // Faixa [-lead, total - lead): o card só volta para a direita depois de sair
      // totalmente da área visível (inclusive do respiro esmaecido).
      const lead = a.step + a.pad;
      const x = a.loop ? mod(base + lead, a.total) - lead : base;
      el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    });
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const first = cardRefs.current[0];
    if (!viewport || !first) return;
    const a = anim.current;
    a.pad = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
    a.viewport = viewport.clientWidth - 2 * a.pad;
    a.cardWidth = first.offsetWidth;
    a.gap = a.viewport >= 600 ? 24 : 16;
    a.step = a.cardWidth + a.gap;
    a.total = items.length * a.step;
    // O anel só funciona se houver cards suficientes para cobrir a vista, o respiro e mais um card.
    a.loop = a.total >= a.viewport + 2 * a.pad + a.step;
    setLoopable(a.loop);
    place();
  }, [items.length, place]);

  // O servidor já entrega os cards na posição de offset 0 (translate em CSS);
  // a partir daqui o JS assume, sem mudança visível.
  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Laço de animação.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const a = anim.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = pause.current;
      const f = flags.current;
      const paused = p.hover || p.focus || p.touch || p.hidden || p.offscreen || f.expanded || f.user || f.reduced || !a.loop;
      a.velocity += ((paused ? 0 : SPEED) - a.velocity) * (1 - Math.exp(-dt / EASE_TIME));

      if (a.tween) {
        const t = Math.min(1, (now - a.tween.start) / a.tween.duration);
        a.offset = a.tween.from + (a.tween.to - a.tween.from) * easeInOut(t);
        if (t >= 1) a.tween = null;
      } else if (!a.drag?.active) {
        a.offset += a.velocity * dt;
      }
      if (a.loop && a.total) a.offset = mod(a.offset, a.total);
      place();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [place]);

  // Aba em segundo plano e seção fora da tela.
  useEffect(() => {
    const onVisibility = () => (pause.current.hidden = document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(([entry]) => (pause.current.offscreen = !entry.isIntersecting));
    if (viewportRef.current) io.observe(viewportRef.current);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  const goTo = useCallback(
    (to: number, duration = 650) => {
      const a = anim.current;
      if (flags.current.reduced || duration === 0) {
        a.tween = null;
        a.offset = to;
        place();
        return;
      }
      a.tween = { from: a.offset, to, start: performance.now(), duration };
    },
    [place],
  );

  const stepBy = (dir: 1 | -1) => {
    const a = anim.current;
    if (!a.step) return;
    const from = a.tween ? a.tween.to : a.offset;
    const index = dir > 0 ? Math.floor(from / a.step + 0.001) + 1 : Math.ceil(from / a.step - 0.001) - 1;
    let to = index * a.step;
    if (!a.loop) to = Math.max(0, Math.min(to, Math.max(0, a.total - a.gap - a.viewport)));
    goTo(to);
  };

  /** Foco por teclado: traz o card para dentro da área visível. */
  const revealCard = (i: number, el: HTMLElement) => {
    if (!el.matches(":focus-visible")) return;
    const a = anim.current;
    if (!a.step) return;
    const lead = a.step + a.pad;
    const x = a.loop ? mod(i * a.step - a.offset + lead, a.total) - lead : i * a.step - a.offset;
    if (x < 0) goTo(a.offset + x, 450);
    else if (x + a.cardWidth > a.viewport) goTo(a.offset + (x + a.cardWidth - a.viewport), 450);
  };

  // Gesto horizontal (toque/caneta). O mouse usa as setas e o hover.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    pause.current.touch = true;
    anim.current.drag = { id: e.pointerId, startX: e.clientX, startY: e.clientY, startOffset: anim.current.offset, active: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = anim.current.drag;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      d.active = true;
      anim.current.tween = null;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (d.active) {
      anim.current.offset = d.startOffset - dx;
      place();
    }
  };
  const endDrag = (e: React.PointerEvent) => {
    const a = anim.current;
    const d = a.drag;
    if (!d || d.id !== e.pointerId) return;
    if (d.active && a.step) {
      const moved = d.startOffset - a.offset;
      const base = Math.round(d.startOffset / a.step);
      // Arrasto curto já avança um card no sentido do gesto.
      const index = Math.abs(moved) > a.step * 0.18 ? base + (moved > 0 ? -1 : 1) : base;
      goTo(index * a.step, 420);
    }
    a.drag = null;
    // Retoma depois de um instante, para a leitura não ser interrompida.
    window.setTimeout(() => (pause.current.touch = false), 1600);
  };

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const showPauseButton = !reducedMotion && loopable;
  const isMoving = showPauseButton && !userPaused;

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Avaliações de pacientes"
      onPointerEnter={(e) => e.pointerType === "mouse" && (pause.current.hover = true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && (pause.current.hover = false)}
      onFocusCapture={() => (pause.current.focus = true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) pause.current.focus = false;
      }}
    >
      <div
        ref={viewportRef}
        className="-mx-2 overflow-hidden px-2 py-3 [touch-action:pan-y] sm:-mx-10 sm:px-10 sm:[mask-image:linear-gradient(to_right,transparent,black_40px,black_calc(100%-40px),transparent)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* Todos os cards na mesma célula do grid: a altura acompanha o card mais alto (expandido). */}
        <div className="grid grid-cols-1 items-start [--gap:16px] sm:[--gap:24px]">
          {items.map((review, i) => (
            <ReviewCard
              key={review.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              review={review}
              position={i + 1}
              total={items.length}
              expanded={expanded.has(review.id)}
              onToggle={() => toggle(review.id)}
              onFocus={(e) => revealCard(i, e.currentTarget)}
              // Posição inicial (offset 0) já no HTML do servidor: i × (largura + espaço).
              style={{ transform: `translate3d(calc(${i} * (100% + var(--gap))), 0, 0)` }}
              className="justify-self-start will-change-transform [grid-area:1/1] w-[84%] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        {showPauseButton ? (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-pressed={userPaused}
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-1 text-sm font-medium text-taupe transition-colors hover:text-ink"
          >
            {isMoving ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
            {isMoving ? "Pausar movimento" : "Retomar movimento"}
          </button>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <ArrowButton dir="prev" onClick={() => stepBy(-1)} />
          <ArrowButton dir="next" onClick={() => stepBy(1)} />
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-taupe-soft bg-paper/60 text-ink transition-colors hover:border-taupe-line hover:bg-taupe-tint"
    >
      <Icon aria-hidden className="size-5" />
      <span className="sr-only">{dir === "prev" ? "Avaliação anterior" : "Próxima avaliação"}</span>
    </button>
  );
}
