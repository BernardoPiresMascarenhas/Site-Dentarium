"use client";

import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Cog, PenTool, ScanLine } from "lucide-react";

import { cadcamSteps } from "@/data/content";

const icons = [ScanLine, PenTool, Cog];

/** "Desenho (CAD)" → ["Desenho", "(CAD)"]: no celular, a sigla vai para a segunda linha. */
function splitLabel(label: string) {
  const at = label.indexOf(" (");
  return at === -1 ? [label, null] : [label.slice(0, at), label.slice(at + 1)];
}

/**
 * As três etapas do CAD/CAM em abas horizontais acessíveis (setas, Home/End),
 * com uma linha de progresso e botões de etapa anterior/seguinte. As etapas
 * ficam empilhadas na mesma célula da grade: o card assume a altura da maior
 * e a troca é só um fade curto, sem salto de layout.
 */
export function CadcamSteps() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const count = cadcamSteps.length;
  const current = cadcamSteps[active];

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

  const navButton =
    "inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-1 text-sm font-semibold text-graphite transition-opacity disabled:opacity-35 sm:gap-2";

  return (
    <div className="rounded-[var(--radius-md)] border border-taupe-soft bg-ivory p-4 min-[380px]:p-5 sm:p-9">
      <div role="tablist" aria-label="Etapas do CAD/CAM" className="grid grid-cols-3 gap-2 sm:gap-3">
        {cadcamSteps.map((step, i) => {
          const selected = i === active;
          const [name, abbr] = splitLabel(step.label);
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
              className="group flex min-h-11 min-w-0 flex-col items-stretch pb-1 text-left"
            >
              <span className="relative block h-0.5 overflow-hidden rounded-full bg-taupe-soft">
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 bg-clay transition-[width] duration-700 ease-soft ${i <= active ? "w-full" : "w-0"}`}
                />
              </span>
              <span
                className={`mt-3 block font-serif text-base tabular-nums transition-colors sm:mt-4 sm:text-lg ${selected ? "text-clay" : "text-taupe"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`mt-0.5 block text-[clamp(0.72rem,0.55rem+0.9vw,0.82rem)] font-semibold leading-snug transition-colors sm:mt-1 sm:text-sm ${
                  selected ? "text-ink" : "text-stone group-hover:text-ink"
                }`}
              >
                {name}
                {abbr && (
                  <>
                    {" "}
                    <span className="block font-medium text-taupe sm:inline sm:font-semibold sm:text-current">{abbr}</span>
                  </>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="mt-5 grid border-t border-line pt-6 sm:mt-9 sm:pt-8"
      >
        {cadcamSteps.map((step, i) => {
          const Icon = icons[i];
          const shown = i === active;
          return (
            <div
              key={step.id}
              aria-hidden={!shown}
              className={`grid grid-cols-[2.75rem_1fr] content-start items-center gap-x-4 transition-[opacity,transform,visibility] duration-300 ease-soft [grid-area:1/1] sm:grid-cols-[3.5rem_1fr] sm:items-start sm:gap-x-6 ${
                shown ? "visible translate-y-0 opacity-100 delay-75" : "invisible translate-y-2 opacity-0"
              }`}
            >
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full bg-taupe-tint text-clay sm:row-span-2 sm:size-14"
              >
                <Icon strokeWidth={1.5} className="size-5 sm:size-6" />
              </span>
              <h3 className="display-md max-sm:text-[clamp(1.3rem,1.05rem+1.3vw,1.55rem)]">{step.title}</h3>
              <p className="prose-body col-span-2 mt-4 max-w-[34rem] sm:col-span-1 sm:col-start-2 sm:mt-3">{step.text}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-line pt-3 sm:mt-8 sm:gap-4 sm:border-t-0 sm:pt-0">
        <button
          type="button"
          onClick={() => select(active - 1)}
          disabled={active === 0}
          aria-label="Etapa anterior"
          className={`${navButton} justify-self-start`}
        >
          <ArrowLeft aria-hidden className="size-4 shrink-0" />
          <span className="sm:hidden">Anterior</span>
          <span className="hidden sm:inline">Etapa anterior</span>
        </button>
        <p className="whitespace-nowrap text-sm text-stone tabular-nums" aria-hidden>
          {active + 1} de {count}
        </p>
        <button
          type="button"
          onClick={() => select(active + 1)}
          disabled={active === count - 1}
          aria-label="Próxima etapa"
          className={`${navButton} justify-self-end`}
        >
          <span className="sm:hidden">Próxima</span>
          <span className="hidden sm:inline">Próxima etapa</span>
          <ArrowRight aria-hidden className="size-4 shrink-0" />
        </button>
      </div>
    </div>
  );
}
