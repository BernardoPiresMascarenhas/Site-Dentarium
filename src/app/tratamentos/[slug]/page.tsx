import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategory,
  getTreatment,
  treatmentWhatsappMessage,
  treatments,
  type Treatment,
} from "@/data/treatments";
import { treatmentMedia } from "@/data/treatmentMedia";
import { scheduleCta } from "@/data/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/clinic/CtaBand";
import { WhatsappButton } from "@/components/clinic/WhatsappButton";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import {
  CareAndFaqSection,
  DetailsSection,
  FeatureSection,
  IntroSection,
  StepsSection,
} from "@/components/treatments/TreatmentSections";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tratamentos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "Tratamento não encontrado" };
  const category = getCategory(treatment.category);
  const media = treatment.feature?.media ?? treatment.details?.find((d) => d.media)?.media;
  const description = `${treatment.summary} ${category.name} na Clínica Dentarium, bairro Serra. Indicação mediante avaliação individual.`;
  return {
    title: `${treatment.name} em Belo Horizonte`,
    description,
    alternates: { canonical: `/tratamentos/${treatment.slug}` },
    openGraph: {
      title: `${treatment.name} | Clínica Dentarium`,
      description,
      ...(media && { images: [{ url: treatmentMedia[media].src.src, alt: treatmentMedia[media].alt }] }),
    },
  };
}

/** Âncoras do índice "Nesta página", na ordem em que as seções aparecem. */
function pageAnchors(t: Treatment) {
  const details =
    t.layout?.details === "accordion" && t.details?.length
      ? [{ href: "#entenda-mais", label: "Entenda mais" }]
      : t.detailsNav
        ? [{ href: `#${t.detailsNav.id}`, label: t.detailsNav.label }]
        : (t.details ?? []).map((d) => ({ href: `#${d.id}`, label: d.title }));
  const feature = t.feature ? [{ href: `#${t.feature.id}`, label: t.feature.kicker }] : [];
  const steps = [{ href: "#etapas", label: "Etapas" }];
  const middle = t.layout?.detailsFirst ? [...details, ...feature, ...steps] : [...feature, ...steps, ...details];
  return [{ href: "#indicacoes", label: "Quando avaliar" }, ...middle, { href: "#duvidas", label: "Dúvidas" }];
}

export default async function TreatmentPage({ params }: PageProps<"/tratamentos/[slug]">) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const category = getCategory(treatment.category);
  const related = treatment.related
    .map((s) => getTreatment(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const siblings = treatments.filter((t) => t.category === treatment.category);
  const message = treatmentWhatsappMessage(treatment);
  const detailsFirst = treatment.layout?.detailsFirst;

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
          </dl>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={scheduleCta.href}>{scheduleCta.label}</ButtonLink>
          <WhatsappButton message={message}>Tirar dúvidas pelo WhatsApp</WhatsappButton>
        </div>
      </PageHero>

      <nav aria-label="Nesta página" className="border-b border-line bg-ivory">
        {/* No celular, uma faixa que rola na horizontal; a partir de sm, quebra em linhas. */}
        <div className="container-site flex items-center gap-2 overflow-x-auto py-4 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible">
          <span className="mr-2 shrink-0 text-sm font-semibold text-clay">Nesta página</span>
          {pageAnchors(treatment).map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="inline-flex min-h-9 shrink-0 items-center rounded-full border whitespace-nowrap border-taupe-soft px-3.5 text-[0.85rem] text-ink/85 transition-colors hover:border-clay/50 hover:bg-taupe-tint hover:text-ink"
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      <article aria-label={treatment.name}>
        <IntroSection treatment={treatment} />
        {detailsFirst && <DetailsSection treatment={treatment} />}
        {treatment.feature && <FeatureSection feature={treatment.feature} />}
        <StepsSection treatment={treatment} />
        {!detailsFirst && <DetailsSection treatment={treatment} />}
        <CareAndFaqSection treatment={treatment} />
      </article>

      <section aria-labelledby="relacionados-title" className="border-t border-line bg-mist py-16 md:py-20">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="relacionados-title" className="display-md">
              Tratamentos relacionados
            </h2>
            <Link href="/tratamentos" className="link-underline self-start text-sm font-semibold text-graphite lg:self-auto">
              Todos os tratamentos
            </Link>
          </div>
          {related.length > 0 && (
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <StaggerItem key={t.slug}>
                  <TreatmentCard treatment={t} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
          <nav aria-label="Outros tratamentos da área" className="mt-10 border-t border-taupe-soft pt-8">
            <p className="text-sm font-semibold text-clay">{category.name}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siblings.map((t) => {
                const current = t.slug === treatment.slug;
                return (
                  <li key={t.slug}>
                    <Link
                      href={`/tratamentos/${t.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition-colors ${
                        current
                          ? "border-graphite bg-graphite font-semibold text-ivory"
                          : "border-taupe-soft bg-ivory text-ink hover:border-clay/50 hover:bg-taupe-tint"
                      }`}
                    >
                      {t.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <CtaBand
        title="Quer saber se este tratamento é indicado para você?"
        text="A indicação depende de avaliação individual com cirurgião-dentista. Agende a sua ou envie suas dúvidas pelo WhatsApp."
        whatsappMessage={message}
      />
    </>
  );
}
