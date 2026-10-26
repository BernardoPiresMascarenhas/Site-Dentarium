import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCategory, getTreatment, treatments } from "@/data/treatments";
import { scheduleCta } from "@/data/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/clinic/CtaBand";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tratamentos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "Tratamento não encontrado" };
  return { title: treatment.name, description: treatment.summary };
}

export default async function TreatmentPage({ params }: PageProps<"/tratamentos/[slug]">) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const category = getCategory(treatment.category);
  const related = treatment.related
    .map((s) => getTreatment(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <>
      <PageHero
        crumbs={[
          { href: "/tratamentos", label: "Tratamentos" },
          { href: `/tratamentos/${treatment.slug}`, label: treatment.name },
        ]}
        title={treatment.name}
        lede={treatment.summary}
        aside={
          <dl className="space-y-5 border-l border-graphite pl-6 text-[0.95rem]">
            <div>
              <dt className="text-sm font-semibold text-graphite">Área</dt>
              <dd className="mt-1 text-ink">{category.name}</dd>
            </div>
            {treatment.alsoKnownAs && (
              <div>
                <dt className="text-sm font-semibold text-graphite">Também conhecido como</dt>
                <dd className="mt-1 text-ink">{treatment.alsoKnownAs}</dd>
              </div>
            )}
            <div>
              <dt className="text-sm font-semibold text-graphite">Indicação</dt>
              <dd className="mt-1 text-stone">Depende de avaliação individual.</dd>
            </div>
          </dl>
        }
      >
        <ButtonLink href={scheduleCta.href}>{scheduleCta.label}</ButtonLink>
      </PageHero>

      <article className="section">
        <div className="container-site grid gap-16 lg:grid-cols-[1fr_20rem] lg:gap-24">
          <div className="max-w-[44rem]">
            <p className="font-serif text-[1.35rem] leading-[1.6] text-ink sm:text-[1.5rem]">
              {treatment.intro}
            </p>

            <section aria-labelledby="quando-title" className="mt-16">
              <h2 id="quando-title" className="display-md">
                Quando conversar com o dentista sobre esta opção
              </h2>
              <ul className="mt-6 space-y-4">
                {treatment.whenToTalk.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-4 leading-relaxed text-stone">
                    <span aria-hidden className="arch mt-1 h-4 w-3 border border-clay/60" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-stone">
                Esses sinais não indicam, por si só, a necessidade do tratamento. Eles são um bom
                motivo para uma avaliação.
              </p>
            </section>

            <section aria-labelledby="como-title" className="mt-16">
              <h2 id="como-title" className="display-md">
                Como o tratamento costuma ser conduzido
              </h2>
              <ol className="mt-8 border-t border-line">
                {treatment.overview.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6">
                    <span className="font-serif text-xl text-clay tabular-nums">{i + 1}</span>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold text-ink">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-stone">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-stone">
                Visão geral. Etapas, técnicas e materiais são definidos para cada paciente.
              </p>
            </section>

            <section aria-labelledby="duvidas-title" className="mt-16">
              <h2 id="duvidas-title" className="display-md">
                Dúvidas comuns
              </h2>
              <div className="mt-6">
                <Accordion items={treatment.faq} />
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <div className="rounded-[var(--radius-md)] border border-line bg-paper p-7">
              <p className="font-serif text-[1.35rem] leading-snug">
                A indicação depende de avaliação individual com cirurgião-dentista.
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-stone">
                Este conteúdo é informativo e não substitui a consulta.
              </p>
              <ButtonLink href={scheduleCta.href} className="mt-6 w-full">
                {scheduleCta.label}
              </ButtonLink>
            </div>
            <nav aria-label="Outros tratamentos da área" className="mt-8">
              <p className="text-sm font-semibold text-clay">{category.name}</p>
              <ul className="mt-3 space-y-2">
                {treatments
                  .filter((t) => t.category === treatment.category)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/tratamentos/${t.slug}`}
                        aria-current={t.slug === treatment.slug ? "page" : undefined}
                        className={`text-[0.95rem] transition-colors ${
                          t.slug === treatment.slug ? "font-semibold text-graphite" : "text-ink/80 hover:text-clay"
                        }`}
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <Link href="/tratamentos" className="link-underline mt-5 inline-block text-sm font-semibold text-graphite">
                Todos os tratamentos
              </Link>
            </nav>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="border-t border-line bg-mist py-20">
          <div className="container-site">
            <h2 id="relacionados-title" className="display-md">
              Tratamentos relacionados
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <li key={t.slug}>
                  <TreatmentCard treatment={t} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
