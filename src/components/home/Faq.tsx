import Link from "next/link";

import { faq } from "@/data/content";
import { Accordion } from "@/components/ui/Accordion";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section border-t border-line">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="kicker">Perguntas frequentes</p>
          <h2 id="faq-title" className="display-lg mt-5 max-w-[22rem]">
            Antes de agendar.
          </h2>
          <p className="prose-body mt-6 max-w-[24rem]">
            Respostas gerais sobre o atendimento. Dúvidas sobre um caso específico são esclarecidas
            na avaliação.{" "}
            <Link href="/contato" className="link-underline font-semibold text-graphite">
              Fale com a clínica
            </Link>
          </p>
        </div>
        <Accordion items={faq} />
      </div>
    </section>
  );
}
