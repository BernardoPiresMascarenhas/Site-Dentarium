import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  cadcamMaterials,
  sterilization,
  technologies,
  technologyFaq,
  technologyNote,
} from "@/data/content";
import { type ClinicImage, images } from "@/data/images";
import { Accordion } from "@/components/ui/Accordion";
import { ArchImage } from "@/components/ui/ArchImage";
import { PageHero } from "@/components/ui/PageHero";
import { CadcamSteps } from "@/components/clinic/CadcamSteps";
import { CtaBand } from "@/components/clinic/CtaBand";

export const metadata: Metadata = {
  title: "Tecnologia",
  description:
    "Radiografia e tomografia, planejamento digital do sorriso, CAD/CAM, laboratório de prótese, anestesia computadorizada, laser e biossegurança na Clínica Dentarium, em Belo Horizonte.",
};

const groups: { title: string; text: string; ids: string[]; photo?: ClinicImage }[] = [
  {
    title: "Enxergar",
    text: "Exames que complementam o exame clínico.",
    ids: ["imagem"],
    photo: images.tomografia,
  },
  {
    title: "Planejar",
    text: "Decisões tomadas em conjunto, antes de começar.",
    ids: ["multidisciplinar", "planejamento-digital"],
    photo: images.consultorioVidro,
  },
  {
    title: "Confeccionar",
    text: "Peças produzidas a partir do planejamento de cada sorriso.",
    ids: ["cadcam", "laboratorio"],
  },
  {
    title: "Executar com conforto",
    text: "Recursos usados durante o atendimento, quando indicados.",
    ids: ["anestesia", "laser", "endodontia"],
    photo: images.atendimentoProcedimento,
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/tecnologia", label: "Tecnologia" }]}
        title="Tecnologia como apoio, nunca como promessa."
        lede="Equipamentos ajudam a ver melhor, planejar com mais precisão e tornar o atendimento mais confortável. A inovação é um dos pilares da Dentarium, e a decisão sobre o que usar em cada caso é sempre clínica."
        aside={
          <figure>
            <ArchImage image={images.salaApoio} priority echo sizes="(min-width: 1024px) 384px, 90vw" />
            <figcaption className="mt-4 text-sm text-stone">{images.salaApoio.caption} da Dentarium</figcaption>
          </figure>
        }
      />

      <section aria-label="Recursos" className="section">
        <div className="container-site space-y-20">
          {groups.map((g, gi) => (
            <div key={g.title} className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
                <p className="font-serif text-lg text-clay tabular-nums">{gi + 1} de {groups.length}</p>
                <h2 className="display-lg mt-2">{g.title}</h2>
                <p className="prose-body mt-3 max-w-[18rem]">{g.text}</p>
                {g.photo && <SmallPhoto image={g.photo} />}
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {g.ids.map((id) => {
                  const t = technologies.find((x) => x.id === id)!;
                  return (
                    <li key={t.id} className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:gap-10">
                      <h3 className="display-md">{t.name}</h3>
                      <div>
                        <p className="prose-body">{t.text}</p>
                        {t.href && (
                          <Link href={t.href} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-graphite">
                            <span className="link-underline">Saiba mais</span>
                            <span className="sr-only"> sobre {t.name}</span>
                            <ArrowUpRight aria-hidden className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="cad-cam" aria-labelledby="cadcam-title" className="section border-y border-line bg-mist">
        <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
          <div>
            <p className="kicker">Odontologia digital</p>
            <h2 id="cadcam-title" className="display-lg mt-5 max-w-[26rem]">
              CAD/CAM em três etapas.
            </h2>
            <div className="prose-body mt-6 max-w-[28rem] space-y-4">
              <p>
                CAD/CAM é a sigla de <span lang="en">Computer Aided Design / Computer Aided Manufacturing</span>:
                desenho e fabricação assistidos por computador. Na reabilitação oral e nas próteses, o
                sistema leva o planejamento do sorriso do escaneamento à peça pronta.
              </p>
              <p>
                As etapas acontecem na própria clínica, junto ao laboratório de prótese, o que ajuda a
                otimizar o tempo do paciente.
              </p>
            </div>
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
      </section>

      <section id="biosseguranca" aria-labelledby="bio-title" className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <div>
            <p className="kicker">Biossegurança</p>
            <h2 id="bio-title" className="display-lg mt-5 max-w-[20rem]">
              Esterilização e cuidado com cada ambiente.
            </h2>
          </div>
          <ol className="grid gap-x-12 sm:grid-cols-2">
            {sterilization.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7">
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

      <section aria-labelledby="tec-faq-title" className="section border-t border-line">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="kicker">Perguntas frequentes</p>
            <h2 id="tec-faq-title" className="display-lg mt-5 max-w-[22rem]">
              Dúvidas sobre os recursos.
            </h2>
            <div className="mt-8 rounded-[var(--radius-md)] border border-taupe-soft bg-taupe-tint p-6">
              <p className="text-[0.95rem] leading-relaxed text-stone">
                {technologyNote} Nenhum recurso garante resultado ou substitui a avaliação do
                cirurgião-dentista.
              </p>
            </div>
          </div>
          <Accordion items={technologyFaq} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/** Fotos de 300 × 240 px: exibidas no tamanho original, nunca ampliadas. */
function SmallPhoto({ image }: { image: ClinicImage }) {
  return (
    <figure className="mt-8 w-full" style={{ maxWidth: image.src.width }}>
      <div className="overflow-hidden rounded-[var(--radius-md)]" style={{ backgroundColor: image.tone }}>
        <Image
          src={image.src}
          alt={image.alt}
          placeholder="blur"
          sizes={`(min-width: 1024px) ${Math.min(image.src.width, 340)}px, ${image.src.width}px`}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="mt-3 text-sm text-stone">{image.caption}, Dentarium</figcaption>
    </figure>
  );
}
