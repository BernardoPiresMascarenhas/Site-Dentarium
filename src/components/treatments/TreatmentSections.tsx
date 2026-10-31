import Link from "next/link";
import { ArrowRight, ArrowUpRight, RotateCcw } from "lucide-react";

import type { Treatment, TreatmentDetail, TreatmentFeature, TreatmentLink } from "@/data/treatments";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ToothDiagram } from "./ToothDiagram";
import { ClinicPhotoFigure, TreatmentMediaFigure } from "./TreatmentMediaFigure";

/*
 * Blocos das páginas de tratamento. Cada página combina estes blocos conforme
 * `layout` e `feature` do tratamento, para que as páginas não tenham todas a
 * mesma composição — mantendo tipografia, cores e navegação iguais.
 */

const anchorOffset = "scroll-mt-[calc(var(--header-h)+1.5rem)]";

function ArchBullet() {
  return <span aria-hidden className="arch mt-1 h-4 w-3 border border-clay/60" />;
}

function InlineLink({ link }: { link: TreatmentLink }) {
  return (
    <Link href={link.href} className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite">
      <span className="link-underline">{link.label}</span>
      <ArrowUpRight
        aria-hidden
        className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Abertura: introdução + quando avaliar                               */
/* ------------------------------------------------------------------ */

export function IntroSection({ treatment }: { treatment: Treatment }) {
  const heading = treatment.headings?.when ?? "Quando conversar com o dentista";
  const cards = treatment.layout?.when === "cards";
  const note = (
    <p className="mt-6 text-sm leading-relaxed text-stone">
      Esses sinais não indicam, por si só, a necessidade do tratamento. São um bom motivo para uma
      avaliação.
    </p>
  );

  if (cards) {
    return (
      <section id="indicacoes" aria-labelledby="indicacoes-title" className={`py-16 md:py-24 ${anchorOffset}`}>
        <div className="container-site">
          <p className="max-w-[46rem] font-serif text-[1.3rem] leading-[1.6] text-ink text-pretty sm:text-[1.5rem]">
            {treatment.intro}
          </p>
          <h2 id="indicacoes-title" className="display-md mt-14 max-w-[34rem]">
            {heading}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {treatment.whenToTalk.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 0.06} className="rounded-[var(--radius-md)] border border-line bg-paper p-6">
                <span aria-hidden className="arch block h-6 w-4.5 border border-clay/60" />
                <p className="mt-5 leading-relaxed text-ink">{item}</p>
              </Reveal>
            ))}
          </ul>
          {note}
        </div>
      </section>
    );
  }

  return (
    <section id="indicacoes" aria-labelledby="indicacoes-title" className={`py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <p className="font-serif text-[1.3rem] leading-[1.6] text-ink text-pretty sm:text-[1.5rem]">{treatment.intro}</p>
        <div className="lg:border-l lg:border-line lg:pl-12">
          <h2 id="indicacoes-title" className="display-md">
            {heading}
          </h2>
          <ul className="mt-6 space-y-4">
            {treatment.whenToTalk.map((item) => (
              <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-4 leading-relaxed text-ink/90">
                <ArchBullet />
                {item}
              </li>
            ))}
          </ul>
          {note}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bloco editorial próprio do tratamento                               */
/* ------------------------------------------------------------------ */

export function FeatureSection({ feature }: { feature: TreatmentFeature }) {
  switch (feature.style) {
    case "flow":
      return <FlowFeature feature={feature} />;
    case "facts":
      return <FactsFeature feature={feature} />;
    case "stages":
      return <StagesFeature feature={feature} />;
    default:
      return <SplitFeature feature={feature} />;
  }
}

function FeatureHeading({ feature, compact = false }: { feature: TreatmentFeature; compact?: boolean }) {
  return (
    <div>
      <p className="kicker">{feature.kicker}</p>
      <h2
        id={`${feature.id}-title`}
        className={`mt-5 max-w-[30rem] ${compact ? "display-lg text-[clamp(2rem,1.5rem+1.5vw,2.8rem)]!" : "display-lg"}`}
      >
        {feature.title}
      </h2>
      {feature.paragraphs && (
        <div className="prose-body mt-6 max-w-[34rem] space-y-4">
          {feature.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function SplitFeature({ feature }: { feature: TreatmentFeature }) {
  const visual = feature.media ? (
    <TreatmentMediaFigure media={feature.media} />
  ) : feature.clinicImage ? (
    <ClinicPhotoFigure image={feature.clinicImage} />
  ) : feature.diagram ? (
    <figure className="mx-auto w-full max-w-[26rem] rounded-[var(--radius-md)] border border-line bg-ivory p-6 sm:p-8">
      <ToothDiagram variant={feature.diagram} />
      <figcaption className="mt-4 text-center text-sm text-stone">Diagrama ilustrativo, fora de escala.</figcaption>
    </figure>
  ) : null;
  // Fotografias à esquerda, diagramas à direita: varia o ritmo entre as páginas.
  const visualFirst = !feature.diagram;

  return (
    <section id={feature.id} aria-labelledby={`${feature.id}-title`} className={`border-y border-line bg-paper py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <Reveal
          className={`lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start ${visualFirst ? "" : "lg:order-2"}`}
        >
          {visual}
        </Reveal>
        <div>
          <FeatureHeading feature={feature} compact />
          {feature.parts && (
            <ol className="mt-8 max-w-[34rem] border-t border-line">
              {feature.parts.map((part, i) => (
                <li key={part.label} className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-line py-5">
                  <span
                    aria-hidden={!feature.diagram}
                    className={
                      feature.diagram
                        ? "grid size-7 place-items-center rounded-full bg-clay text-[0.8rem] font-semibold text-white tabular-nums"
                        : "font-serif text-lg text-clay tabular-nums"
                    }
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{part.label}</h3>
                    <p className="mt-1 leading-relaxed text-stone">{part.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {feature.note && (
            <aside aria-label={feature.note.title} className="mt-8 max-w-[34rem] rounded-[var(--radius-md)] border border-taupe-soft bg-taupe-tint p-6">
              <p className="font-serif text-[1.25rem] text-ink">{feature.note.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{feature.note.text}</p>
            </aside>
          )}
          {feature.link && <InlineLink link={feature.link} />}
        </div>
      </div>
    </section>
  );
}

function FlowFeature({ feature }: { feature: TreatmentFeature }) {
  const parts = feature.parts ?? [];
  return (
    <section id={feature.id} aria-labelledby={`${feature.id}-title`} className={`border-y border-line bg-mist py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site">
        <FeatureHeading feature={feature} />
        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-0">
          {parts.map((part, i) => (
            <Reveal as="li" key={part.label} delay={i * 0.08} className="relative md:pr-10">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-clay/40 bg-ivory font-serif text-lg text-clay tabular-nums">
                  {i + 1}
                </span>
                {i < parts.length - 1 && (
                  <span aria-hidden className="hidden h-px flex-1 bg-taupe-line/60 md:flex md:items-center md:justify-end">
                    <ArrowRight className="-mr-1 size-4 text-taupe-line" />
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-serif text-[1.45rem] leading-snug text-ink">{part.label}</h3>
              <p className="mt-2 max-w-[20rem] leading-relaxed text-stone">{part.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FactsFeature({ feature }: { feature: TreatmentFeature }) {
  return (
    <section id={feature.id} aria-labelledby={`${feature.id}-title`} className={`border-y border-line bg-paper py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <FeatureHeading feature={feature} />
        <ul className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {feature.parts?.map((part, i) => (
            <Reveal as="li" key={part.label} delay={i * 0.06} className="rounded-[var(--radius-md)] border border-line bg-ivory p-6">
              <span aria-hidden className="block h-px w-8 bg-clay" />
              <h3 className="mt-5 font-serif text-[1.4rem] leading-snug text-ink">{part.label}</h3>
              <p className="mt-2 leading-relaxed text-stone">{part.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Odontopediatria: fases da vida em arcos que crescem, numa composição mais leve. */
function StagesFeature({ feature }: { feature: TreatmentFeature }) {
  const heights = ["md:min-h-[17rem]", "md:min-h-[19.5rem]", "md:min-h-[22rem]"];
  return (
    <section id={feature.id} aria-labelledby={`${feature.id}-title`} className={`border-y border-line bg-taupe-tint py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site">
        <FeatureHeading feature={feature} />
        <ol className="mt-12 grid items-end gap-4 md:grid-cols-3">
          {feature.parts?.map((part, i) => (
            <Reveal as="li" key={part.label} delay={i * 0.08}>
              <a
                href={part.href}
                className={`arch group flex h-full flex-col justify-end border border-taupe-soft bg-ivory px-7 pt-14 pb-7 transition-[border-color,background-color] duration-500 ease-soft hover:border-clay/50 hover:bg-paper ${heights[i] ?? ""}`}
              >
                <span className="font-serif text-lg text-clay tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-[1.5rem] leading-snug text-ink">{part.label}</h3>
                <p className="mt-2 leading-relaxed text-stone">{part.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite">
                  <span className="link-underline">Ler mais</span>
                  <ArrowRight aria-hidden className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-y-0.5 group-hover:rotate-90" />
                </span>
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Etapas                                                              */
/* ------------------------------------------------------------------ */

const stepsFootnote = "Visão geral. Etapas, técnicas e materiais são definidos para cada paciente.";

export function StepsSection({ treatment }: { treatment: Treatment }) {
  const heading = treatment.headings?.steps ?? "Como o tratamento costuma ser conduzido";
  const style = treatment.layout?.steps ?? "list";
  const steps = treatment.overview;

  if (style === "list") {
    return (
      <section id="etapas" aria-labelledby="etapas-title" className={`py-16 md:py-24 ${anchorOffset}`}>
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <p className="kicker">Etapas</p>
            <h2 id="etapas-title" className="display-md mt-5 max-w-[22rem]">
              {heading}
            </h2>
            <p className="mt-4 max-w-[22rem] text-sm leading-relaxed text-stone">{stepsFootnote}</p>
          </div>
          <ol className="border-t border-line">
            {steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-6">
                <span className="font-serif text-xl text-clay tabular-nums">{i + 1}</span>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const cycle = style === "cycle";
  const cols = steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <section id="etapas" aria-labelledby="etapas-title" className={`border-y border-line bg-mist py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Etapas</p>
            <h2 id="etapas-title" className="display-md mt-5 max-w-[30rem]">
              {heading}
            </h2>
          </div>
          <p className="max-w-[22rem] text-sm leading-relaxed text-stone">{stepsFootnote}</p>
        </div>
        <ol className={`mt-12 grid gap-x-6 sm:grid-cols-2 ${cols}`}>
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.06}
              className="relative grid grid-cols-[3rem_1fr] gap-x-4 pb-10 sm:block sm:pb-0 sm:pt-0"
            >
              {/* Linha vertical no mobile, horizontal a partir de sm. */}
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute top-12 bottom-0 left-6 w-px bg-taupe-line/50 sm:hidden" />
              )}
              <span className="relative z-10 grid size-12 place-items-center rounded-full border border-clay/40 bg-ivory font-serif text-lg text-clay tabular-nums">
                {i + 1}
              </span>
              <div className="sm:mt-5 sm:border-t sm:border-taupe-soft sm:pt-5 sm:pb-8">
                <h3 className="text-[1.05rem] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-stone">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        {cycle && (
          <p className="mt-4 inline-flex items-center gap-3 rounded-full border border-taupe-soft bg-ivory px-5 py-3 text-sm font-medium text-ink sm:mt-2">
            <RotateCcw aria-hidden strokeWidth={1.75} className="size-4 text-clay" />
            E o ciclo recomeça na próxima revisão, no intervalo definido para você.
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Seções aprofundadas                                                 */
/* ------------------------------------------------------------------ */

function DetailBody({ detail }: { detail: TreatmentDetail }) {
  return (
    <>
      <div className="mt-3 space-y-3 leading-relaxed text-stone">
        {detail.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {detail.points && (
        <ul className="mt-5 space-y-2.5">
          {detail.points.map((item) => (
            <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3 leading-relaxed text-ink">
              <ArchBullet />
              {item}
            </li>
          ))}
        </ul>
      )}
      {detail.link && <InlineLink link={detail.link} />}
    </>
  );
}

export function DetailsSection({ treatment }: { treatment: Treatment }) {
  const details = treatment.details ?? [];
  if (details.length === 0) return null;
  const compare = treatment.layout?.details === "compare";
  const title = treatment.detailsTitle ?? "Em detalhe";

  if (compare) {
    return (
      <section
        id={treatment.detailsNav?.id}
        aria-labelledby="detalhes-title"
        className={`py-16 md:py-24 ${treatment.detailsNav ? anchorOffset : ""}`}
      >
        <div className="container-site">
          <h2 id="detalhes-title" className="display-lg max-w-[36rem]">
            {title}
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {details.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.06} className="rounded-[var(--radius-md)] border border-line bg-paper p-7 sm:p-9">
                <section id={d.id} aria-labelledby={`${d.id}-title`} className={anchorOffset}>
                  <span className="font-serif text-lg text-clay tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 id={`${d.id}-title`} className="mt-3 font-serif text-[1.6rem] leading-snug text-ink">
                    {d.title}
                  </h3>
                  <DetailBody detail={d} />
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  let mediaIndex = 0;
  return (
    <section aria-labelledby="detalhes-title" className="py-16 md:py-24">
      <div className="container-site">
        <h2 id="detalhes-title" className="display-lg max-w-[36rem]">
          {title}
        </h2>
        <div className="mt-10 border-t border-line">
          {details.map((d) => {
            if (d.media) {
              const flip = mediaIndex++ % 2 === 1;
              return (
                <section
                  key={d.id}
                  id={d.id}
                  aria-labelledby={`${d.id}-title`}
                  className={`grid items-center gap-10 border-b border-line py-12 md:grid-cols-2 md:gap-16 md:py-16 ${anchorOffset}`}
                >
                  <Reveal className={flip ? "md:order-2" : ""}>
                    <TreatmentMediaFigure media={d.media} />
                  </Reveal>
                  <div>
                    <h3 id={`${d.id}-title`} className="display-md">
                      {d.title}
                    </h3>
                    <DetailBody detail={d} />
                  </div>
                </section>
              );
            }
            return (
              <section
                key={d.id}
                id={d.id}
                aria-labelledby={`${d.id}-title`}
                className={`grid gap-4 border-b border-line py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-12 ${anchorOffset}`}
              >
                <h3 id={`${d.id}-title`} className="font-serif text-[1.6rem] leading-snug text-ink md:text-[1.75rem]">
                  {d.title}
                </h3>
                <div className="max-w-[40rem] md:-mt-3">
                  <DetailBody detail={d} />
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cuidados + dúvidas                                                  */
/* ------------------------------------------------------------------ */

export function CareAndFaqSection({ treatment }: { treatment: Treatment }) {
  const care = treatment.care ?? [];
  const faqTitle = treatment.headings?.faq ?? "Dúvidas comuns";
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className={`border-t border-line py-16 md:py-24 ${anchorOffset}`}>
      <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="kicker">Perguntas frequentes</p>
          <h2 id="duvidas-title" className="display-lg mt-5 max-w-[22rem]">
            {faqTitle}
          </h2>
          {care.length > 0 ? (
            <div className="mt-8 rounded-[var(--radius-md)] border border-taupe-soft bg-taupe-tint p-6 sm:p-7">
              <h3 className="font-serif text-[1.3rem] text-ink">
                {treatment.headings?.care ?? "Cuidados e informações importantes"}
              </h3>
              <ul className="mt-4 space-y-3">
                {care.map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3 text-[0.95rem] leading-relaxed text-stone">
                    <ArchBullet />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-6 max-w-[24rem] text-[0.95rem] leading-relaxed text-stone">
              Este conteúdo é informativo e não substitui a consulta com cirurgião-dentista.
            </p>
          )}
        </div>
        <Accordion items={treatment.faq} />
      </div>
    </section>
  );
}
