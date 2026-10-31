import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Cpu,
  Info,
  Layers,
  MonitorSmartphone,
  Package,
  Ruler,
  Scan,
  Sparkles,
  SprayCan,
  Syringe,
  Users,
  Wrench,
} from "lucide-react";

import { cadcamMaterials, sterilization, technologies, technologyNote, type Technology } from "@/data/content";
import { type ClinicImage, images } from "@/data/images";
import { ArchImage } from "@/components/ui/ArchImage";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { CadcamSteps } from "@/components/clinic/CadcamSteps";
import { CtaBand } from "@/components/clinic/CtaBand";

export const metadata: Metadata = {
  title: "Tecnologia",
  description:
    "Radiografia e tomografia, planejamento digital do sorriso, CAD/CAM, laboratório de prótese, anestesia computadorizada, laser e biossegurança na Clínica Dentarium, em Belo Horizonte.",
};

const tech = (id: string) => technologies.find((t) => t.id === id)!;

/** Grade de recursos, na mesma ordem da narrativa da página: do diagnóstico ao tratamento. */
const overview: { tech: Technology; icon: LucideIcon }[] = [
  { tech: tech("imagem"), icon: Scan },
  { tech: tech("planejamento-digital"), icon: MonitorSmartphone },
  { tech: tech("multidisciplinar"), icon: Users },
  { tech: tech("cadcam"), icon: Cpu },
  { tech: tech("laboratorio"), icon: Layers },
  { tech: tech("anestesia"), icon: Syringe },
  { tech: tech("laser"), icon: Sparkles },
  { tech: tech("endodontia"), icon: Ruler },
];

const treatmentResources: { tech: Technology; icon: LucideIcon; link?: { href: string; label: string } }[] = [
  { tech: tech("anestesia"), icon: Syringe },
  { tech: tech("laser"), icon: Sparkles, link: { href: "/tratamentos/laserterapia", label: "Laserterapia" } },
  { tech: tech("endodontia"), icon: Ruler, link: { href: "/tratamentos/tratamento-de-canal", label: "Tratamento de canal" } },
];

const biosafetyIcons: LucideIcon[] = [SprayCan, Wrench, Package, Boxes];

const anchorOffset = "scroll-mt-[calc(var(--header-h)+1rem)]";

export default function TechnologyPage() {
  const planejamento = tech("planejamento-digital");
  const multidisciplinar = tech("multidisciplinar");

  return (
    <>
      <PageHero
        crumbs={[{ href: "/tecnologia", label: "Tecnologia" }]}
        title="Tecnologia e precisão em cada etapa do cuidado."
        lede="Recursos que apoiam o diagnóstico, o planejamento e a confecção das peças. O que usar em cada caso é sempre uma decisão clínica."
        aside={
          <figure>
            <ArchImage image={images.salaApoio} priority echo sizes="(min-width: 1024px) 384px, 90vw" />
            <figcaption className="mt-4 text-sm text-stone">{images.salaApoio.caption} da Dentarium</figcaption>
          </figure>
        }
      />

      {/* Visão geral: cada card resume um recurso e leva à seção que o aprofunda. */}
      <section aria-labelledby="recursos-title" className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
            <div>
              <p className="kicker">Recursos</p>
              <h2 id="recursos-title" className="display-lg mt-5 max-w-[30rem]">
                Tecnologia aplicada à odontologia.
              </h2>
            </div>
            <p className="prose-body max-w-[22rem] text-[0.95rem]">
              Do exame à confecção das peças. Selecione um recurso para ver como ele é usado.
            </p>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-4">
            {overview.map(({ tech: t, icon: Icon }, i) => (
              <Reveal as="li" key={t.id} delay={(i % 3) * 0.05}>
                <a
                  href={`#${t.anchor}`}
                  className="group grid h-full grid-cols-[2.5rem_1fr] gap-4 rounded-[var(--radius-md)] border border-line bg-paper px-4 py-4 transition-[border-color,box-shadow,transform] duration-500 ease-soft motion-safe:hover:-translate-y-0.5 hover:border-taupe-soft hover:shadow-[0_18px_36px_-30px_rgba(63,66,63,0.6)] sm:p-6"
                >
                  <span aria-hidden className="grid size-10 place-items-center rounded-full bg-taupe-tint text-clay">
                    <Icon strokeWidth={1.6} className="size-[1.1rem]" />
                  </span>
                  <span className="block">
                    {/* A etapa orienta a leitura da grade em colunas; no celular, em lista, fica de fora. */}
                    <span className="hidden text-[0.72rem] font-semibold tracking-[0.08em] text-clay uppercase sm:block">{t.stage}</span>
                    <span className="flex items-start justify-between gap-3 sm:mt-1">
                      <span className="font-serif text-[1.2rem] leading-snug text-ink sm:text-[1.3rem]">{t.name}</span>
                      <ArrowDown
                        aria-hidden
                        className="mt-1.5 size-4 shrink-0 text-taupe-line transition-[color,transform] duration-500 ease-soft group-hover:translate-y-0.5 group-hover:text-clay"
                      />
                    </span>
                    <span className="mt-1.5 block text-[0.9rem] leading-relaxed text-stone sm:mt-2 sm:text-[0.92rem]">{t.short}</span>
                  </span>
                </a>
              </Reveal>
            ))}
            <li className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-[var(--radius-md)] border border-dashed border-taupe-soft p-5 sm:col-span-2 sm:p-6 lg:col-span-1">
              <span aria-hidden className="grid size-10 place-items-center rounded-full border border-taupe-soft text-clay">
                <Info strokeWidth={1.6} className="size-[1.1rem]" />
              </span>
              <span className="block">
                <span className="block font-serif text-[1.3rem] leading-snug text-ink">Indicação individual</span>
                <span className="mt-2 block text-[0.92rem] leading-relaxed text-stone">
                  {technologyNote} Nenhum recurso garante resultado ou substitui a avaliação do cirurgião-dentista.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Diagnóstico e planejamento: as fotografias reais ganham protagonismo. */}
      <section
        id="diagnostico"
        aria-labelledby="diagnostico-title"
        className={`overflow-x-clip border-y border-line bg-paper py-16 md:py-24 ${anchorOffset}`}
      >
        <div className="container-site">
          <p className="kicker">Diagnóstico e planejamento</p>
          <h2 id="diagnostico-title" className="display-lg mt-5 max-w-[30rem]">
            Ver com clareza antes de decidir.
          </h2>

          <div className="mt-12 space-y-20 md:mt-16 md:space-y-28">
            <EditorialBlock
              kicker="Diagnóstico por imagem"
              title="Radiografia e tomografia na própria clínica."
              main={images.tomografia}
              inset={images.atendimentoProcedimento}
              caption="Sala de tomografia e radiografia no consultório, Dentarium"
            >
              <p className="prose-body mt-4">
                Os exames de imagem mostram o que o exame clínico não alcança, como raízes, osso e dentes inclusos.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Sala de exames ao lado dos consultórios.",
                  "Exame feito no mesmo local, com o acompanhamento do seu dentista.",
                  "Apoio ao planejamento de implantes, tratamentos de canal e extração de sisos.",
                ].map((item) => (
                  <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3 leading-relaxed text-ink">
                    <span aria-hidden className="arch mt-1 h-4 w-3 border border-clay/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </EditorialBlock>

            <EditorialBlock
              id="planejamento"
              kicker="Planejamento"
              title="O tratamento desenhado antes de começar."
              main={images.primeiraConsulta}
              inset={images.consultorioVidro}
              caption="Mesa de atendimento e consultório com monitores, Dentarium"
              flip
            >
              <p className="prose-body mt-4">
                No planejamento digital do sorriso, fotos e vídeos são analisados em software para redesenhar o
                sorriso e discutir a proposta com você antes do tratamento.
              </p>
              <div className="mt-6 grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line pt-6">
                <span aria-hidden className="grid size-10 place-items-center rounded-full bg-taupe-tint text-clay">
                  <Users strokeWidth={1.6} className="size-[1.1rem]" />
                </span>
                <div>
                  <h4 className="font-semibold text-ink">{multidisciplinar.name}</h4>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-stone">{multidisciplinar.text}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6">
                <InlineLink href={planejamento.href!} label={planejamento.name} />
                <InlineLink href={multidisciplinar.href!} label="Primeira consulta" />
              </div>
            </EditorialBlock>
          </div>
        </div>
      </section>

      {/* CAD/CAM: o componente interativo é a explicação principal; o laboratório completa. */}
      <section id="cad-cam" aria-labelledby="cadcam-title" className={`section bg-mist ${anchorOffset}`}>
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <p className="kicker">Odontologia digital</p>
              <h2 id="cadcam-title" className="display-lg mt-5 max-w-[26rem]">
                CAD/CAM em três etapas.
              </h2>
              <p className="prose-body mt-6 max-w-[28rem]">
                Sigla de <span lang="en">Computer Aided Design / Computer Aided Manufacturing</span>: desenho e
                fabricação assistidos por computador.
              </p>
              <div className="mt-8">
                <p className="text-sm font-semibold text-graphite">Materiais possíveis</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cadcamMaterials.map((m) => (
                    <li key={m} className="rounded-full border border-taupe-soft bg-ivory px-3.5 py-1.5 text-sm text-ink">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <CadcamSteps />
          </div>

          <div
            id="laboratorio"
            className="mt-12 grid scroll-mt-[calc(var(--header-h)+1.5rem)] grid-cols-[3rem_1fr] gap-x-4 gap-y-2 rounded-[var(--radius-md)] border border-taupe-soft bg-ivory p-5 sm:gap-x-5 sm:p-8 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-x-8 lg:mt-16"
          >
            <span aria-hidden className="grid size-12 place-items-center rounded-full bg-taupe-tint text-clay">
              <Layers strokeWidth={1.5} className="size-5" />
            </span>
            <div>
              <h3 className="font-serif text-[1.45rem] leading-snug text-ink">Laboratório de prótese na clínica</h3>
              <p className="mt-2 max-w-[40rem] leading-relaxed text-stone">
                As etapas do CAD/CAM acontecem junto ao laboratório da própria clínica, onde as próteses são
                confeccionadas considerando as características de cada arcada.
              </p>
            </div>
            <div className="col-start-2 md:col-start-auto">
              <InlineLink href="/tratamentos/proteses#laboratorio" label="Próteses" />
            </div>
          </div>
        </div>
      </section>

      {/* Recursos de tratamento e biossegurança, com a mesma linguagem visual da grade. */}
      <section id="conforto" aria-labelledby="conforto-title" className={`section ${anchorOffset}`}>
        <div className="container-site">
          <p className="kicker">Durante o tratamento</p>
          <h2 id="conforto-title" className="display-lg mt-5 max-w-[30rem]">
            Recursos de conforto e precisão.
          </h2>

          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
            {treatmentResources.map(({ tech: t, icon: Icon, link }, i) => (
              <Reveal
                as="li"
                key={t.id}
                delay={i * 0.06}
                className="flex flex-col rounded-[var(--radius-md)] border border-line bg-paper p-6 sm:p-7"
              >
                <span aria-hidden className="grid size-11 place-items-center rounded-full bg-taupe-tint text-clay">
                  <Icon strokeWidth={1.5} className="size-5" />
                </span>
                <h3 className="mt-5 font-serif text-[1.45rem] leading-snug text-ink">{t.name}</h3>
                <p className="mt-2 leading-relaxed text-stone">{t.text}</p>
                <div className="mt-auto pt-6">
                  <dl className="border-t border-line pt-4">
                    <dt className="text-[0.72rem] font-semibold tracking-[0.08em] text-clay uppercase">Quando é usado</dt>
                    <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink">{t.use}</dd>
                  </dl>
                  {/* Sem link, reserva a mesma altura: as linhas "Quando é usado" ficam alinhadas. */}
                  {link ? <InlineLink href={link.href} label={link.label} /> : <span aria-hidden className="mt-3 hidden min-h-11 md:block" />}
                </div>
              </Reveal>
            ))}
          </ul>

          <div
            id="biosseguranca"
            className="mt-20 grid scroll-mt-[calc(var(--header-h)+1.5rem)] gap-10 border-t border-line pt-16 lg:mt-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
          >
            <div>
              <p className="kicker">Biossegurança</p>
              <h2 className="display-md mt-5 max-w-[22rem]">Cuidado também nos detalhes.</h2>
              <p className="prose-body mt-5 max-w-[24rem]">A rotina de limpeza e esterilização faz parte de cada atendimento.</p>
            </div>
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {sterilization.map((step, i) => {
                const Icon = biosafetyIcons[i];
                return (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6">
                    <span aria-hidden className="grid size-10 place-items-center rounded-full border border-taupe-soft text-clay">
                      <Icon strokeWidth={1.6} className="size-[1.05rem]" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-stone">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function InlineLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-graphite">
      <span className="link-underline">{label}</span>
      <ArrowUpRight
        aria-hidden
        className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

/**
 * Bloco editorial: foto principal com uma segunda foto sobreposta no canto,
 * como na seção "A Dentarium" da home. As duas aparecem no máximo no tamanho
 * do arquivo; `flip` espelha a composição para alternar o ritmo.
 */
function EditorialBlock({
  id,
  kicker,
  title,
  main,
  inset,
  caption,
  flip = false,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  main: ClinicImage;
  inset: ClinicImage;
  caption: string;
  flip?: boolean;
  children: React.ReactNode;
}) {
  const mainWidth = Math.min(main.src.width, 460);
  return (
    <div id={id} className="grid scroll-mt-[calc(var(--header-h)+1.5rem)] items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <Reveal className={flip ? "md:order-2" : ""}>
        <figure className={`w-full ${flip ? "md:ml-auto" : ""}`} style={{ maxWidth: mainWidth }}>
          <div className="relative">
            <div className="overflow-hidden rounded-[var(--radius-md)]" style={{ backgroundColor: main.tone }}>
              <RevealImage>
                <Image
                  src={main.src}
                  alt={main.alt}
                  placeholder="blur"
                  sizes={`(min-width: 768px) ${mainWidth}px, 90vw`}
                  className="block h-auto w-full"
                />
              </RevealImage>
            </div>
            <div
              className={`absolute -bottom-8 w-[46%] overflow-hidden rounded-[var(--radius-sm)] border-[6px] border-paper shadow-[0_18px_36px_-24px_rgba(63,66,63,0.55)] ${
                flip ? "-left-3 sm:-left-8" : "-right-3 sm:-right-8"
              }`}
              style={{ maxWidth: inset.src.width, backgroundColor: inset.tone }}
            >
              <Image src={inset.src} alt={inset.alt} placeholder="blur" sizes="220px" className="block h-auto w-full" />
            </div>
          </div>
          <figcaption className={`mt-12 text-sm text-stone ${flip ? "md:text-right" : ""}`}>{caption}</figcaption>
        </figure>
      </Reveal>
      <div className="max-w-[32rem]">
        <p className="text-[0.72rem] font-semibold tracking-[0.08em] text-clay uppercase">{kicker}</p>
        <h3 className="display-md mt-3">{title}</h3>
        {children}
      </div>
    </div>
  );
}
