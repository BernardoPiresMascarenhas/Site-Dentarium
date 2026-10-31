"use client";

import { useEffect, useId, useState } from "react";
import { Plus } from "lucide-react";

export type DetailsAccordionItem = { id: string; title: string; content: React.ReactNode };

/**
 * Detalhes complementares de um tratamento, recolhidos por padrão. Cada item
 * mantém a própria âncora (ex.: /tratamentos/periodontia#retracao-gengival):
 * quem chega por um link para ela encontra o item já aberto. O conteúdo fica
 * no HTML mesmo fechado, então continua acessível a buscadores.
 */
export function DetailsAccordion({ items }: { items: DetailsAccordionItem[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const baseId = useId();

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (items.some((item) => item.id === id)) setOpen((prev) => new Set(prev).add(id));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [items]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${baseId}-${item.id}-b`;
        const panelId = `${baseId}-${item.id}-p`;
        return (
          <section key={item.id} id={item.id} className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-[1.3rem] leading-snug text-ink transition-colors group-hover:text-clay sm:text-[1.45rem]">
                  {item.title}
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
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-soft ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-[42rem] pr-12 pb-7">{item.content}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
