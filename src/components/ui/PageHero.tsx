import Link from "next/link";

type Crumb = { href: string; label: string };

type PageHeroProps = {
  title: string;
  lede?: React.ReactNode;
  crumbs: Crumb[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
};

/** Abertura das páginas internas: breadcrumb, título e um elemento lateral opcional. */
export function PageHero({ title, lede, crumbs, aside, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className={`container-site grid gap-12 pt-10 pb-16 md:pt-14 lg:pb-20 ${
          aside ? "lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16" : ""
        }`}
      >
        <div className="max-w-[46rem]">
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
          <h1 className="display-xl intro-rise mt-8" style={{ "--i": 0 } as React.CSSProperties}>
            {title}
          </h1>
          {lede && (
            <div className="lede intro-rise mt-6 max-w-[38rem]" style={{ "--i": 1 } as React.CSSProperties}>
              {lede}
            </div>
          )}
          {children && (
            <div className="intro-rise mt-9" style={{ "--i": 2 } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="intro-settle w-full max-w-[24rem] lg:justify-self-end">{aside}</div>
        )}
      </div>
    </section>
  );
}
