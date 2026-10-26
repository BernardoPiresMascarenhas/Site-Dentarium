"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState } from "react";

import { technologies, technologyNote } from "@/data/content";
import { images } from "@/data/images";

/**
 * Recursos em abas verticais acessíveis (setas, Home/End) ao lado de uma
 * fotografia real do consultório. A foto não é legendada como nenhum
 * equipamento específico: ela mostra o ambiente, não comprova recursos.
 */
export function TechShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const photo = images.consultorioEquipamentos;
  const current = technologies[active];

  const focusTab = (i: number) => {
    const next = (i + technologies.length) % technologies.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: technologies.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      focusTab(keys[e.key]);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div className="order-2 lg:order-1">
        <div role="tablist" aria-orientation="vertical" aria-label="Recursos" className="relative border-l border-white/15">
          {technologies.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group relative flex w-full items-baseline justify-between gap-6 py-4 pl-7 text-left"
              >
                {selected && (
                  <motion.span
                    layoutId={`${baseId}-indicator`}
                    aria-hidden
                    className="absolute top-0 bottom-0 -left-px w-0.5 bg-sand"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className={`font-serif text-[1.35rem] leading-tight transition-colors duration-300 sm:text-[1.5rem] ${
                    selected ? "text-on-deep" : "text-on-deep-muted group-hover:text-on-deep"
                  }`}
                >
                  {t.name}
                </span>
                <span
                  className={`hidden shrink-0 text-[0.78rem] font-semibold transition-colors sm:inline ${
                    selected ? "text-sand" : "text-on-deep-muted/80"
                  }`}
                >
                  {t.stage}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${current.id}`}
          className="mt-8 min-h-[7.5rem] rounded-[var(--radius-md)] bg-deep-2 p-6 sm:p-7"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.78rem] font-semibold text-sand">{current.stage}</p>
              <p className="mt-2 max-w-[34rem] leading-relaxed text-on-deep">{current.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="mt-5 text-[0.85rem] text-on-deep-muted">{technologyNote}</p>
      </div>

      <figure className="order-1 mx-auto w-full max-w-[22rem] lg:order-2 lg:mr-0 lg:max-w-[23.5rem]">
        <div className="relative">
          <div aria-hidden className="arch absolute inset-0 hidden -translate-x-[8%] translate-y-[6%] border border-sand/35 sm:block" />
          <div className="arch relative overflow-hidden" style={{ backgroundColor: photo.tone }}>
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              sizes="(min-width: 1024px) 376px, 88vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
        <figcaption className="mt-4 text-[0.85rem] text-on-deep-muted">{photo.caption}, Dentarium</figcaption>
      </figure>
    </div>
  );
}
