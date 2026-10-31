import type { Metadata } from "next";

import { treatments } from "@/data/treatments";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/clinic/CtaBand";
import { TreatmentExplorer } from "@/components/treatments/TreatmentExplorer";

export const metadata: Metadata = {
  title: "Tratamentos",
  description:
    "Implantes, próteses, enxertos, ortodontia, clareamento, facetas, planejamento digital do sorriso, tratamento de canal, laserterapia, odontopediatria e outros tratamentos da Clínica Dentarium, em Belo Horizonte.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/tratamentos", label: "Tratamentos" }]}
        title="Tratamentos para cada fase do cuidado."
        lede={
          <>
            Da prevenção à reabilitação, {treatments.length} tratamentos organizados por área. Cada
            página explica, em linguagem simples, como o tratamento costuma funcionar.
          </>
        }
        aside={
          <p className="border-l border-graphite pl-6 text-[0.95rem] leading-relaxed text-stone">
            A indicação de qualquer tratamento depende de avaliação individual com
            cirurgião-dentista. As informações aqui são gerais e não substituem a consulta.
          </p>
        }
      />
      <section aria-label="Lista de tratamentos" className="pt-10 pb-24">
        <div className="container-site">
          <TreatmentExplorer />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
