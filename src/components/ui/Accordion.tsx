"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

type Item = { question: string; answer: string };

/**
 * Acordeão acessível. A altura anima via grid-template-rows (0fr → 1fr),
 * sem medir conteúdo e sem salto.
 */
export function Accordion({ items, headingLevel = "h3" }: { items: readonly Item[]; headingLevel?: "h2" | "h3" }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-[1.2rem] leading-snug text-ink transition-colors group-hover:text-clay sm:text-[1.3rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-soft ${
                    isOpen ? "rotate-45 border-clay bg-clay text-white" : "border-taupe-soft text-ink group-hover:border-taupe-line group-hover:bg-taupe-tint"
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-soft ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="prose-body max-w-[42rem] pr-12 pb-7">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
