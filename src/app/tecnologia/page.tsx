import type { Metadata } from "next";

import { technologies, technologyNote } from "@/data/content";
import { images } from "@/data/images";
import { ArchImage } from "@/components/ui/ArchImage";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/clinic/CtaBand";

export const metadata: Metadata = {
  title: "Tecnologia",
  description:
    "Como recursos de diagnóstico e planejamento apoiam o cuidado na Clínica Dentarium: exames de imagem, CAD/CAM, anestesia computadorizada, laser e planejamento multidisciplinar.",
};

const groups = [
  {
    title: "Enxergar",
    text: "Exames que complementam o exame clínico.",
    ids: ["imagem"],
  },
  {
    title: "Planejar",
    text: "Decisões tomadas em conjunto, antes de começar.",
    ids: ["planejamento", "cadcam"],
  },
  {
    title: "Executar com conforto",
    text: "Recursos usados durante o atendimento, quando indicados.",
    ids: ["anestesia", "laser"],
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/tecnologia", label: "Tecnologia" }]}
        title="Tecnologia como apoio, nunca como promessa."
        lede="Equipamentos ajudam a ver melhor, planejar com mais precisão e tornar o atendimento mais confortável. A decisão sobre o que usar em cada caso é sempre clínica."
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
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {g.ids.map((id) => {
                  const t = technologies.find((x) => x.id === id)!;
                  return (
                    <li key={t.id} className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:gap-10">
                      <h3 className="display-md">{t.name}</h3>
                      <p className="prose-body">{t.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="rounded-[var(--radius-md)] border border-taupe-soft bg-taupe-tint p-7 sm:p-9">
            <h2 className="font-serif text-[1.35rem]">Sobre os recursos</h2>
            <p className="prose-body mt-3 max-w-[48rem]">
              {technologyNote} Nenhum recurso garante resultado ou substitui a avaliação do
              cirurgião-dentista.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
