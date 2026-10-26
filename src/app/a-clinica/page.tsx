import type { Metadata } from "next";
import Image from "next/image";

import { images } from "@/data/images";
import { PageHero } from "@/components/ui/PageHero";
import { ClinicTour } from "@/components/clinic/ClinicTour";
import { CtaBand } from "@/components/clinic/CtaBand";
import { Founders } from "@/components/home/Founders";

export const metadata: Metadata = {
  title: "A Clínica",
  description:
    "Conheça a Dentarium: odontologia funcional e estética no bairro Serra, em Belo Horizonte, com estrutura pensada para o conforto.",
};

const principles = [
  {
    title: "Avaliação antes de tudo",
    text: "Nenhum tratamento é proposto sem conversa e exame clínico. É a avaliação que define o que faz sentido.",
  },
  {
    title: "Áreas que conversam",
    text: "Prevenção, estética, reabilitação e ortodontia planejadas em conjunto quando o caso pede mais de uma especialidade.",
  },
  {
    title: "Explicação clara",
    text: "Você entende o que foi observado, quais são as alternativas e o que esperar de cada etapa.",
  },
];

export default function ClinicPage() {
  const parede = images.logoParede;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/a-clinica", label: "A Clínica" }]}
        title="Odontologia funcional e estética, no bairro Serra."
        lede="A Dentarium reúne diferentes áreas da odontologia em um mesmo endereço, na região Centro-Sul de Belo Horizonte. Um lugar para tratar a saúde da boca com calma e com planejamento."
        aside={
          <div className="overflow-hidden rounded-[var(--radius-md)]" style={{ backgroundColor: parede.tone }}>
            <Image
              src={parede.src}
              alt={parede.alt}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 384px, 90vw"
              className="block h-auto w-full"
            />
          </div>
        }
      />

      <section aria-labelledby="abordagem-title" className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="kicker">Abordagem</p>
            <h2 id="abordagem-title" className="display-lg mt-5 max-w-[28rem]">
              Função e estética caminham juntas.
            </h2>
            <p className="prose-body mt-6 max-w-[30rem]">
              Odontologia funcional e estética significa olhar para a mastigação, a mordida e a saúde
              dos tecidos com o mesmo cuidado dado à aparência do sorriso. Um resultado estético só
              se sustenta sobre uma base saudável.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line">
            {principles.map((p) => (
              <li key={p.title} className="bg-ivory p-7 sm:p-8">
                <h3 className="display-md">{p.title}</h3>
                <p className="prose-body mt-3">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Founders withPhoto />

      <section id="ambientes" aria-labelledby="ambientes-title" className="section">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="kicker">Ambientes</p>
              <h2 id="ambientes-title" className="display-lg mt-5 max-w-[28rem]">
                Um tour pela Dentarium.
              </h2>
            </div>
            <p className="prose-body max-w-[28rem] lg:justify-self-end">
              Da chegada ao consultório, a estrutura foi pensada para facilitar a sua visita.
              Selecione uma foto para ampliar.
            </p>
          </div>
          <div className="mt-14 md:mt-20">
            <ClinicTour />
          </div>
        </div>
      </section>

      <CtaBand title="Venha conhecer a clínica." text="Agende uma avaliação e conheça pessoalmente a equipe e os ambientes da Dentarium." />
    </>
  );
}
