import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getCategory, type Treatment } from "@/data/treatments";
import { CategoryIcon } from "./CategoryIcon";

type TreatmentCardProps = {
  treatment: Treatment;
  headingLevel?: "h2" | "h3";
  /** Mostra a área do tratamento (útil fora da listagem por categoria). */
  showCategory?: boolean;
  /** Card largo, para fechar uma linha com número ímpar de itens. */
  wide?: boolean;
  /** Posição na área (ex.: 1 de 3), exibida quando a área já está no título da seção. */
  position?: { index: number; total: number };
};

/**
 * Card tipográfico. No hover/foco: o fundo ganha um tom bege-acinzentado, o
 * ícone preenche com a argila da marca, uma linha de argila cresce na base e
 * a seta se desloca. Nada se move mais que alguns pixels.
 */
export function TreatmentCard({ treatment, headingLevel = "h3", showCategory = true, wide = false, position }: TreatmentCardProps) {
  const Heading = headingLevel;
  const category = getCategory(treatment.category);
  return (
    <Link
      href={`/tratamentos/${treatment.slug}`}
      className={`group relative flex h-full flex-col gap-8 overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper p-7 transition-[background-color,border-color,box-shadow] duration-500 ease-soft hover:border-taupe-soft hover:bg-taupe-tint hover:shadow-[0_24px_48px_-36px_rgba(107,93,85,0.6)] focus-visible:border-taupe-soft focus-visible:bg-taupe-tint sm:p-8 ${
        wide ? "sm:flex-row sm:items-end sm:justify-between" : "justify-between"
      }`}
    >
      <div className={wide ? "sm:max-w-[30rem]" : ""}>
        <div className="flex items-center justify-between gap-4">
          <span className="grid size-10 place-items-center rounded-full border border-taupe-soft text-taupe transition-[background-color,border-color,color] duration-500 group-hover:border-clay group-hover:bg-clay group-hover:text-ivory group-focus-visible:border-clay group-focus-visible:bg-clay group-focus-visible:text-ivory">
            <CategoryIcon category={treatment.category} />
          </span>
          {showCategory && <span className="text-[0.78rem] font-semibold text-taupe">{category.name}</span>}
          {!showCategory && position && (
            <span className="font-serif text-[0.95rem] text-taupe tabular-nums" aria-hidden>
              {String(position.index).padStart(2, "0")} / {String(position.total).padStart(2, "0")}
            </span>
          )}
        </div>
        <Heading className="display-md mt-7">{treatment.name}</Heading>
        {treatment.alsoKnownAs && (
          <p className="mt-1.5 text-[0.82rem] font-semibold text-clay">{treatment.alsoKnownAs}</p>
        )}
        <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{treatment.summary}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-ink">
        Saiba mais
        <ArrowUpRight
          aria-hidden
          className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span className="sr-only"> sobre {treatment.name}</span>
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-clay transition-transform duration-700 ease-soft group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}
