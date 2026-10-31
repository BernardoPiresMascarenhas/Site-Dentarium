import Link from "next/link";

export type Crumb = { href: string; label: string };

/** Trilha de navegação das páginas internas, sempre a partir do início. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-stone">
        <li>
          <Link href="/" className="transition-colors hover:text-clay">
            Início
          </Link>
        </li>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              <span aria-hidden className="text-line">/</span>
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="transition-colors hover:text-clay">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
