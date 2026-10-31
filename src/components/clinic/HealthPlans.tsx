import Image from "next/image";

import { healthPlans } from "@/data/healthPlans";
import { Reveal } from "@/components/ui/Reveal";

/** Convênios atendidos, entre o formulário e o mapa da página de contato. */
export function HealthPlans() {
  return (
    <section aria-labelledby="convenios-title" className="border-b border-line py-14 md:py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="kicker">Planos e convênios</p>
          <h2 id="convenios-title" className="display-md mt-4">
            Convênios atendidos
          </h2>
          <p className="prose-body mt-3 max-w-[28rem] text-[0.95rem]">
            A Dentarium atende pelos convênios abaixo. Ao agendar, confirme com a recepção a cobertura
            do seu plano para o tratamento que você procura.
          </p>
        </Reveal>

        <ul className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {healthPlans.map((plan, i) => (
            <Reveal
              as="li"
              key={plan.name}
              delay={i * 0.06}
              className="rounded-[var(--radius-md)] border border-line bg-paper px-3 py-3 transition-colors sm:px-5 sm:py-4 duration-500 ease-soft hover:border-taupe-soft"
            >
              {/* A marca ocupa a faixa central do arquivo quadrado: o recorte 5:2 remove só o vazio. */}
              <div className="relative aspect-[5/2]">
                <Image
                  src={plan.logo}
                  alt={plan.alt}
                  fill
                  sizes="(min-width: 1024px) 200px, 30vw"
                  className="object-cover opacity-80"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
