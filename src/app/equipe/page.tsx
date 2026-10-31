import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { images } from "@/data/images";
import { type TeamMember, team } from "@/data/team";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/clinic/CtaBand";

export const metadata: Metadata = {
  title: "Equipe",
  description:
    "Conheça os profissionais da Clínica Dentarium, em Belo Horizonte: Dr. Gabriel Faria Aiala e Dra. Denise Ligório Fialho Aiala, fundadores, e Dra. Fernanda de Paula T. Bastos, odontopediatria.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/equipe", label: "Equipe" }]}
        title="Profissionais da Dentarium."
        lede="Conheça quem cuida do seu sorriso: os fundadores da clínica e a odontopediatra do Dentarium Kids, com seus registros no conselho e as formações divulgadas."
      />

      <section aria-label="Profissionais" className="pt-6 pb-20 md:pb-28">
        <div className="container-site">
          <ul>
            {team.map((m, i) => (
              <li key={m.id} id={m.id} className="scroll-mt-[calc(var(--header-h)+1.5rem)] border-b border-taupe-soft last:border-b-0">
                <Member member={m} flip={i % 2 === 1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Quer conhecer a equipe pessoalmente?" text="Agende uma avaliação e converse com calma sobre o seu caso." />
    </>
  );
}

/**
 * Retrato e ficha profissional lado a lado, alternando o lado no desktop.
 * Os retratos têm 512 px: a moldura fica limitada a 20rem para não esticar.
 */
function Member({ member, flip }: { member: TeamMember; flip: boolean }) {
  const photo = images[member.photo];
  return (
    <article
      aria-labelledby={`${member.id}-nome`}
      className="grid items-center gap-x-16 gap-y-10 py-14 md:grid-cols-12 lg:py-20"
    >
      <Reveal as="figure" className={`relative mx-auto w-full max-w-[20rem] md:col-span-5 md:mx-0 ${flip ? "md:order-2 md:col-start-8 md:justify-self-end" : ""}`}>
        <span aria-hidden className={`frame-portrait absolute inset-0 -translate-y-3 bg-clay/[0.12] ${flip ? "-translate-x-3" : "translate-x-3"}`} />
        <div className="frame-portrait relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: photo.tone }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 320px, 80vw"
            className="object-cover"
            style={{ objectPosition: photo.focus }}
          />
        </div>
      </Reveal>

      <Reveal delay={0.08} className={`md:col-span-7 ${flip ? "md:order-1 md:col-start-1" : ""}`}>
        <p className="kicker">{member.role ? `${member.role} da Dentarium` : "Equipe clínica"}</p>
        <h2
          id={`${member.id}-nome`}
          className="mt-5 font-serif text-[clamp(2rem,1.4rem+2.2vw,3.2rem)] leading-[1.05] tracking-[-0.015em] text-balance text-ink"
        >
          <span className="text-taupe">{member.title}</span> {member.name}
        </h2>

        <dl className="mt-9 grid max-w-[34rem] gap-y-7 border-t border-taupe-soft pt-7 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-semibold text-graphite">Registro</dt>
          <dd className="text-ink tabular-nums">CRO {member.cro}</dd>

          <dt className="text-sm font-semibold text-graphite">
            {member.credentials.length > 1 ? "Formação" : "Área"}
          </dt>
          <dd>
            <ul className="space-y-2.5">
              {member.credentials.map((c) => (
                <li key={c} className="grid grid-cols-[1.25rem_1fr] gap-3 text-[1.02rem] leading-snug text-ink">
                  <span aria-hidden className="arch mt-0.5 h-4 w-3 border border-clay/60" />
                  {c}
                </li>
              ))}
            </ul>
          </dd>
        </dl>

        {member.area && (
          <Link
            href={`/tratamentos/${member.area.slug}`}
            className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-graphite"
          >
            <span className="link-underline">Saiba mais sobre {member.area.label.toLowerCase()}</span>
            <ArrowUpRight aria-hidden className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </Reveal>
    </article>
  );
}
