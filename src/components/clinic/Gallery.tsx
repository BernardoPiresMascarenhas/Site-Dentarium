"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import type { ClinicImage } from "@/data/images";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { PhotoTile, useLightbox } from "./Lightbox";

/** Intervalo entre as fotos no celular. */
const AUTOPLAY_MS = 4000;
/** Depois de um toque ou arraste, espera antes de voltar a passar sozinho. */
const RESUME_AFTER_TOUCH_MS = 8000;

/** Posição de rolagem que encaixa a foto `i` no início da faixa. */
function offsetOf(list: HTMLUListElement, i: number) {
  const item = list.children[i] as HTMLElement | undefined;
  if (!item) return 0;
  return Math.min(item.offsetLeft - parseFloat(getComputedStyle(list).paddingLeft), list.scrollWidth - list.clientWidth);
}

/**
 * Galeria da home. Desktop: fotos lado a lado, alinhadas pela base, cada uma
 * na proporção original. Celular: carrossel com encaixe e altura uniforme que
 * passa sozinho; pausa ao toque, fora da tela, com a aba oculta, com a foto
 * ampliada, pelo botão de pausa ou com prefers-reduced-motion.
 */
export function Gallery({ items }: { items: ClinicImage[] }) {
  const { openAt, lightbox, isOpen } = useLightbox(items);
  const count = items.length;
  const reducedMotion = usePrefersReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const pause = useRef({ touchUntil: 0, hidden: false, offscreen: true });

  const goTo = (i: number) => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({ left: offsetOf(list, i), behavior: reducedMotion ? "auto" : "smooth" });
  };

  // Foto ativa acompanha a rolagem (inclusive a feita com o dedo).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const onScroll = () => {
      const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 2;
      if (atEnd) return setActive(count - 1);
      let nearest = 0;
      for (let i = 1; i < count; i++) {
        if (Math.abs(offsetOf(list, i) - list.scrollLeft) < Math.abs(offsetOf(list, nearest) - list.scrollLeft)) nearest = i;
      }
      setActive(nearest);
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, [count]);

  // Pausas automáticas: aba oculta e faixa fora da tela.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const onVisibility = () => (pause.current.hidden = document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const io = new IntersectionObserver(([entry]) => (pause.current.offscreen = !entry.isIntersecting), { threshold: 0.5 });
    io.observe(list);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  const autoplay = !reducedMotion && count > 1;

  useEffect(() => {
    if (!autoplay || userPaused || isOpen) return;
    const id = window.setInterval(() => {
      const list = listRef.current;
      const p = pause.current;
      // A faixa só existe no celular (md:hidden): sem largura, não há o que passar.
      if (!list || list.clientWidth === 0 || p.hidden || p.offscreen || Date.now() < p.touchUntil) return;
      goTo((active + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // goTo depende só de refs e de reducedMotion, já coberto por `autoplay`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, userPaused, isOpen, active, count]);

  const holdForTouch = () => (pause.current.touchUntil = Date.now() + RESUME_AFTER_TOUCH_MS);

  return (
    <>
      <ul
        ref={listRef}
        onPointerDown={holdForTouch}
        onTouchStart={holdForTouch}
        className="relative -mx-[clamp(1.25rem,4vw,2.5rem)] flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4vw,2.5rem)] gap-4 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-4 [scrollbar-width:none] md:hidden"
        aria-label="Fotos da clínica"
      >
        {items.map((img, i) => (
          <li key={img.id} className="shrink-0 snap-start">
            <PhotoTile img={img} index={i} count={count} onOpen={openAt} className="h-[19rem]" sizes="320px" fixedHeight />
          </li>
        ))}
      </ul>

      {count > 1 && (
        <div className="mt-2 flex items-center justify-between gap-4 md:hidden">
          {autoplay ? (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-medium text-taupe transition-colors hover:text-ink"
            >
              {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
              {userPaused ? "Retomar fotos" : "Pausar fotos"}
            </button>
          ) : (
            <span />
          )}
          <div className="flex items-center">
            {items.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => {
                  holdForTouch();
                  goTo(i);
                }}
                aria-label={`Ver foto ${i + 1} de ${count}: ${img.caption}`}
                aria-current={i === active ? "true" : undefined}
                className="grid size-11 place-items-center"
              >
                <span
                  aria-hidden
                  className={`block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-soft ${
                    i === active ? "w-6 bg-clay" : "w-1.5 bg-taupe-soft"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <ul className="hidden items-end gap-6 md:flex lg:gap-8">
        {items.map((img, i) => (
          // A largura de cada item é proporcional à razão largura/altura: alturas iguais, sem recorte.
          <li key={img.id} className={i === 1 ? "md:-translate-y-10" : ""} style={{ flex: `${img.src.width / img.src.height} 1 0` }}>
            <PhotoTile img={img} index={i} count={count} onOpen={openAt} sizes="(min-width: 1024px) 400px, 32vw" />
          </li>
        ))}
      </ul>

      {lightbox}
    </>
  );
}
