import type { Metadata } from "next";
import Image from "next/image";

import { images } from "@/data/images";
import { type TeamMember, team } from "@/data/team";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/clinic/CtaBand";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Profissionais da Clínica Dentarium, em Belo Horizonte.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/equipe", label: "Equipe" }]}
        title="Profissionais da Dentarium."
        lede="Os profissionais apresentados pela clínica, com seus registros no conselho de odontologia."
      />

      <section aria-label="Profissionais" className="pt-6 pb-20 md:pb-28">
        <div className="container-site">
          <ul className="border-t border-taupe-soft">
            {team.map((m) => (
              <li key={m.name} className="border-b border-taupe-soft">
                {m.photo ? <MemberWithPhoto member={m} /> : <MemberTypographic member={m} />}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[40rem] text-sm leading-relaxed text-stone">
            Nomes e registros conforme divulgados pela clínica. Fotografias individuais são
            publicadas apenas quando a pessoa retratada está identificada.
          </p>
        </div>
      </section>

      <CtaBand title="Quer conhecer a equipe pessoalmente?" text="Agende uma avaliação e converse com calma sobre o seu caso." />
    </>
  );
}

/** Nome e função — a mesma hierarquia em todas as variações. */
function MemberText({ member }: { member: TeamMember }) {
  return (
    <div>
      {member.role && <p className="text-[0.82rem] font-semibold text-clay">{member.role}</p>}
      <h2 className="mt-3 font-serif text-[clamp(1.9rem,1.4rem+2vw,3rem)] leading-[1.05] tracking-[-0.015em] text-balance text-ink">
        {member.name}
      </h2>
    </div>
  );
}

function MemberRegistry({ member }: { member: TeamMember }) {
  return (
    <dl className="flex items-baseline gap-3 text-sm md:justify-end">
      <dt className="text-taupe">Registro profissional</dt>
      <dd className="font-semibold text-ink tabular-nums">CRO {member.cro}</dd>
    </dl>
  );
}

/** Sem fotografia: composição tipográfica, sem iniciais nem retrato inventado. */
function MemberTypographic({ member }: { member: TeamMember }) {
  return (
    <div className="grid gap-x-10 gap-y-4 py-9 transition-colors duration-500 hover:bg-taupe-tint/60 md:grid-cols-[1fr_auto] md:items-end md:px-4 lg:py-11">
      <MemberText member={member} />
      <MemberRegistry member={member} />
    </div>
  );
}

/** Com fotografia individual identificada: retrato ao lado do texto. */
function MemberWithPhoto({ member }: { member: TeamMember }) {
  const photo = images[member.photo!];
  return (
    <div className="grid gap-x-10 gap-y-6 py-9 transition-colors duration-500 hover:bg-taupe-tint/60 sm:grid-cols-[13rem_1fr] sm:items-end md:grid-cols-[15rem_1fr_auto] md:px-4 lg:grid-cols-[19rem_1fr_auto] lg:gap-x-14 lg:py-12">
      <figure className="relative w-full max-w-[19rem]">
        <span aria-hidden className="frame-portrait absolute inset-0 -translate-x-2.5 -translate-y-2.5 bg-clay/[0.14]" />
        <div
          className="frame-portrait relative overflow-hidden"
          style={{ backgroundColor: photo.tone, aspectRatio: `${photo.src.width} / ${photo.src.height}` }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 304px, (min-width: 640px) 240px, 70vw"
            className="object-cover"
            style={{ objectPosition: photo.focus }}
          />
        </div>
      </figure>
      <div>
        <MemberText member={member} />
        <div className="mt-5 md:hidden">
          <MemberRegistry member={member} />
        </div>
      </div>
      <div className="hidden md:block">
        <MemberRegistry member={member} />
      </div>
    </div>
  );
}
