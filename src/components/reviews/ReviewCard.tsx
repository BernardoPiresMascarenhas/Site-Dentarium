"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { Review } from "@/data/reviews";
import { Stars } from "./Stars";

const MAX_LINES = 5;

type ReviewCardProps = {
  review: Review;
  position: number;
  total: number;
  expanded: boolean;
  onToggle: () => void;
  ref?: React.Ref<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
  onFocus?: React.FocusEventHandler<HTMLElement>;
};

/**
 * Depoimento com altura inicial padronizada: até 5 linhas visíveis. O botão
 * "Ler mais" só aparece quando o texto realmente ultrapassa esse limite
 * (medido no navegador) e expande o próprio card — sem modal e sem rolagem
 * interna.
 */
export function ReviewCard({ review, position, total, expanded, onToggle, ref, className = "", style, onFocus }: ReviewCardProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [clampPx, setClampPx] = useState<number | null>(null);
  const [fullPx, setFullPx] = useState<number | null>(null);
  const textId = useId();
  const titleId = useId();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const measure = () => {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      setClampPx(Math.round(lineHeight * MAX_LINES));
      setFullPx(el.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const overflows = clampPx !== null && fullPx !== null && fullPx > clampPx + 2;
  const maxHeight = !overflows ? undefined : expanded ? fullPx! : clampPx!;

  return (
    <article
      ref={ref}
      tabIndex={0}
      aria-roledescription="depoimento"
      aria-labelledby={titleId}
      aria-describedby={textId}
      onFocus={onFocus}
      style={style}
      className={`group/card flex flex-col rounded-[var(--radius-md)] border border-taupe-soft/80 bg-ivory p-6 shadow-[0_18px_40px_-34px_rgba(107,93,85,0.55)] transition-[border-color,box-shadow,background-color] duration-500 ease-soft hover:border-taupe-line/60 hover:bg-paper hover:shadow-[0_24px_48px_-32px_rgba(107,93,85,0.6)] focus-visible:outline-offset-4 sm:p-7 ${className}`}
    >
      {/* Altura mínima de 2 linhas: nomes longos não desalinham os cards. */}
      <header className="flex min-h-[3.3rem] items-start justify-between gap-4">
        <h3 id={titleId} className="font-serif text-[1.2rem] leading-snug text-balance text-ink">
          <span className="sr-only">Avaliação de </span>
          {review.author}
        </h3>
        {/* Aspas como detalhe gráfico em taupe — decorativas. */}
        <span aria-hidden className="mt-0.5 font-serif text-[2.4rem] leading-[0.6] text-taupe-line/70">
          “
        </span>
      </header>

      <div
        className="relative mt-4 overflow-hidden transition-[max-height] duration-500 ease-soft"
        style={{ maxHeight, minHeight: `${1.7 * MAX_LINES}em` }}
      >
        <p
          ref={textRef}
          id={textId}
          className="text-[1rem] leading-[1.7] whitespace-pre-line text-stone"
          style={clampPx === null ? { maxHeight: `${1.7 * MAX_LINES}em`, overflow: "hidden" } : undefined}
        >
          {review.text}
        </p>
        {overflows && !expanded && (
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-ivory to-transparent group-hover/card:from-paper" />
        )}
      </div>

      {/* Linha reservada: a altura dos cards não muda quando não há botão. */}
      <div className="mt-3 h-7">
        {overflows && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={textId}
            className="text-sm font-semibold text-clay underline decoration-taupe-soft underline-offset-[5px] transition-colors hover:decoration-clay"
          >
            {expanded ? "Ler menos" : "Ler mais"}
            <span className="sr-only"> — avaliação de {review.author}</span>
          </button>
        )}
      </div>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-taupe-soft/70 pt-4 text-[0.8rem] text-taupe">
        <span className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-clay/70" />
          Avaliação no Google
        </span>
        <Stars rating={review.rating} />
        <span className="sr-only">
          Depoimento {position} de {total}
        </span>
      </footer>
    </article>
  );
}
