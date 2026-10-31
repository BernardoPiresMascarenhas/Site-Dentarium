import type { Metadata } from "next";
import Image from "next/image";

import { clinic } from "@/data/clinic";
import { values } from "@/data/content";
import { images } from "@/data/images";
import { PageHero } from "@/components/ui/PageHero";
import { ClinicTour } from "@/components/clinic/ClinicTour";
import { CtaBand } from "@/components/clinic/CtaBand";
import { Founders } from "@/components/home/Founders";
import { Reveal, RevealImage, Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "A Clínica",
  description:
    "Conheça a história, os valores e a estrutura da Dentarium: odontologia funcional e estética no bairro Serra, em Belo Horizonte, com estacionamento próprio e acessibilidade.",
};

const principles = [
  {
    title: "Avaliação antes de tudo",
    text: "Nenhum tratamento é proposto sem conversa e exame clínico. É a avaliação que define o que faz sentido.",
  },
  {
    title: "Áreas que conversam",
    text: "Depois da primeira consulta, os profissionais analisam o caso em conjunto, cada um em sua especialidade, para chegar a um diagnóstico multidisciplinar.",
  },
  {
    title: "Explicação clara",
    text: "Você entende o que foi observado, quais são as alternativas e o que esperar de cada etapa.",
  },
];

export default function ClinicPage() {
  const parede = images.logoParede;
  const atendimento = images.consultorioAtendimento;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/a-clinica", label: "A Clínica" }]}
        title="Odontologia funcional e estética, no bairro Serra."
        lede="Diferentes áreas da odontologia reunidas em um mesmo endereço, na região Centro-Sul de Belo Horizonte."
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
          <Stagger className="grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line">
            {principles.map((p) => (
              <StaggerItem key={p.title} className="bg-ivory p-7 sm:p-8">
                <h3 className="display-md">{p.title}</h3>
                <p className="prose-body mt-3">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Founders withPhoto />

      <section aria-labelledby="valores-title" className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <p className="kicker">Valores</p>
            <h2 id="valores-title" className="display-lg mt-5 max-w-[24rem]">
              Ir além do esperado.
            </h2>
            <p className="prose-body mt-6 max-w-[26rem]">
              Os princípios que orientam o trabalho da Dentarium, consulta a consulta.
            </p>
          </div>
          <ul className="grid gap-x-12 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal as="li" key={v.name} delay={(i % 2) * 0.06} className="border-t border-taupe-soft py-7">
                <h3 className="font-serif text-[clamp(1.6rem,1.3rem+1vw,2.1rem)] leading-tight text-ink">{v.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="estrutura" aria-labelledby="estrutura-title" className="section border-y border-line bg-paper">
        <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="kicker">Estrutura</p>
            <h2 id="estrutura-title" className="display-lg mt-5 max-w-[24rem]">
              Pensada para a sua visita.
            </h2>
            <p className="prose-body mt-6 max-w-[26rem]">
              Consultórios, exames de imagem e laboratório no mesmo endereço, no bairro{" "}
              {clinic.address.value.neighborhood}.
            </p>
            {/* Foto de 300 px: exibida no tamanho original, sem ampliação. */}
            <figure className="mt-10 w-full" style={{ maxWidth: atendimento.src.width }}>
              <div className="overflow-hidden rounded-[var(--radius-md)]" style={{ backgroundColor: atendimento.tone }}>
                <RevealImage>
                  <Image
                    src={atendimento.src}
                    alt={atendimento.alt}
                    placeholder="blur"
                    sizes="300px"
                    className="block h-auto w-full"
                  />
                </RevealImage>
              </div>
              <figcaption className="mt-3 text-sm text-stone">{atendimento.caption}</figcaption>
            </figure>
          </div>
          <dl className="grid gap-x-12 sm:grid-cols-2">
            {clinic.facilities.value.map((f) => (
              <div key={f.label} className="border-t border-line py-6">
                <dt className="font-serif text-[1.3rem] leading-snug text-ink">{f.label}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-stone">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

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
              Da chegada ao consultório. Selecione uma foto para ampliar.
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
