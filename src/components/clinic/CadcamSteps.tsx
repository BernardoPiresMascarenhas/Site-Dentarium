"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Cog, PenTool, ScanLine } from "lucide-react";

import { cadcamSteps } from "@/data/content";

const icons = [ScanLine, PenTool, Cog];

/**
 * As três etapas do CAD/CAM em abas horizontais acessíveis (setas, Home/End),
 * com uma linha de progresso e botões de etapa anterior/seguinte. A troca de
 * conteúdo é um fade curto, sem efeitos 3D.
 */
export function CadcamSteps() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const count = cadcamSteps.length;
  const current = cadcamSteps[active];
  const Icon = icons[active];

  const select = (i: number, focus = false) => {
    const next = Math.min(Math.max(i, 0), count - 1);
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = {
      ArrowRight: (i + 1) % count,
      ArrowLeft: (i - 1 + count) % count,
      Home: 0,
      End: count - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <div className="rounded-[var(--radius-md)] border border-taupe-soft bg-ivory p-6 sm:p-9">
      <div role="tablist" aria-label="Etapas do CAD/CAM" className="grid grid-cols-3 gap-3">
        {cadcamSteps.map((step, i) => {
          const selected = i === active;
          return (
            <button
              key={step.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${step.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className="group text-left"
            >
              <span className="relative block h-0.5 overflow-hidden rounded-full bg-taupe-soft">
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 bg-clay transition-[width] duration-700 ease-soft ${i <= active ? "w-full" : "w-0"}`}
                />
              </span>
              <span className={`mt-4 block font-serif text-lg tabular-nums transition-colors ${selected ? "text-clay" : "text-taupe"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-1 block text-[0.82rem] font-semibold leading-snug transition-colors sm:text-sm ${
                  selected ? "text-ink" : "text-stone group-hover:text-ink"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="mt-9 min-h-[13rem] border-t border-line pt-8 sm:min-h-[11rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-6 sm:grid-cols-[3.5rem_1fr]"
          >
            <span aria-hidden className="grid size-14 place-items-center rounded-full bg-taupe-tint text-clay">
              <Icon strokeWidth={1.5} className="size-6" />
            </span>
            <div>
              <h3 className="display-md">{current.title}</h3>
              <p className="prose-body mt-3 max-w-[34rem]">{current.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => select(active - 1)}
          disabled={active === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-graphite transition-opacity disabled:opacity-35"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Etapa anterior
        </button>
        <p className="text-sm text-stone tabular-nums" aria-hidden>
          {active + 1} de {count}
        </p>
        <button
          type="button"
          onClick={() => select(active + 1)}
          disabled={active === count - 1}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-semibold text-graphite transition-opacity disabled:opacity-35"
        >
          Próxima etapa
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
