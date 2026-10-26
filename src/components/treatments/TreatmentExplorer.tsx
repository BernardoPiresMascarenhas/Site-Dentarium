"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { type CategoryId, categories, treatments } from "@/data/treatments";
import { CategoryIcon } from "./CategoryIcon";
import { TreatmentCard } from "./TreatmentCard";

type Filter = CategoryId | "todos";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/** Navegação por categoria + busca simples. Todo cartão leva a uma página. */
export function TreatmentExplorer() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return treatments.filter((t) => {
      if (filter !== "todos" && t.category !== filter) return false;
      if (!q) return true;
      return normalize(`${t.name} ${t.alsoKnownAs ?? ""} ${t.summary}`).includes(q);
    });
  }, [filter, query]);

  const groups = categories
    .map((c) => ({ ...c, items: results.filter((t) => t.category === c.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="-mx-1 flex flex-wrap gap-2">
          <FilterChip active={filter === "todos"} onClick={() => setFilter("todos")}>
            Todos
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
              {c.name}
            </FilterChip>
          ))}
        </div>
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Buscar tratamento</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar tratamento"
            className="h-12 w-full rounded-full border border-line bg-paper pr-11 pl-11 text-[0.95rem] text-ink placeholder:text-stone focus:border-clay focus:outline-none focus-visible:outline-2 focus-visible:outline-clay [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-stone hover:text-ink"
            >
              <X aria-hidden className="size-4" />
              <span className="sr-only">Limpar busca</span>
            </button>
          )}
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {results.length} {results.length === 1 ? "tratamento encontrado" : "tratamentos encontrados"}
      </p>

      {groups.length === 0 ? (
        <div className="py-20 text-center">
          <p className="display-md">Nenhum tratamento encontrado para “{query}”.</p>
          <p className="prose-body mt-3">
            Tente outro termo ou{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("todos");
              }}
              className="link-underline font-semibold text-graphite"
            >
              veja todos os tratamentos
            </button>
            .
          </p>
        </div>
      ) : (
        <div className="mt-4">
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`cat-${g.id}`} className="grid gap-8 border-b border-line py-12 last:border-b-0 lg:grid-cols-[0.75fr_2fr] lg:gap-14">
              <div>
                <span aria-hidden className="grid size-11 place-items-center rounded-full bg-taupe-tint text-clay">
                  <CategoryIcon category={g.id} className="size-5" />
                </span>
                <h2 id={`cat-${g.id}`} className="display-md mt-5">
                  {g.name}
                </h2>
                <p className="mt-3 max-w-[18rem] text-[0.95rem] leading-relaxed text-stone">{g.description}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {g.items.map((t, i) => {
                  // Último item de uma linha ímpar ocupa a linha toda: sem célula vazia.
                  const wide = g.items.length % 2 === 1 && i === g.items.length - 1;
                  return (
                    <li key={t.slug} className={wide ? "sm:col-span-2" : ""}>
                      <TreatmentCard treatment={t} showCategory={false} wide={wide} position={{ index: i + 1, total: g.items.length }} />
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-10 rounded-full border px-4 text-sm font-medium transition-colors duration-300 ${
        active ? "border-clay bg-clay text-white" : "border-taupe-soft bg-paper text-ink hover:border-taupe-line hover:bg-taupe-tint"
      }`}
    >
      {children}
    </button>
  );
}
