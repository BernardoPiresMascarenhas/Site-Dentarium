import Image from "next/image";

import { clinic, fullAddress } from "@/data/clinic";
import { images } from "@/data/images";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const sala = images.salaEspera;
  const parede = images.logoParede;
  return (
    <section aria-labelledby="sobre-title" className="section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative max-w-[32rem]">
            <div className="arch overflow-hidden" style={{ backgroundColor: sala.tone }}>
              <Image
                src={sala.src}
                alt={sala.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 512px, 92vw"
                className="block h-auto w-full"
              />
            </div>
            <div className="absolute -right-4 -bottom-10 w-[42%] overflow-hidden rounded-[var(--radius-sm)] border-[6px] border-ivory sm:-right-14">
              <Image
                src={parede.src}
                alt={parede.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 220px, 40vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </Reveal>

        <div className="order-1 max-w-[34rem] lg:order-2">
          <p className="kicker">A Dentarium</p>
          <h2 id="sobre-title" className="display-lg mt-5">
            Um espaço pensado para você, cuidado pensado em conjunto.
          </h2>
          <div className="prose-body mt-7 space-y-4">
            <p>
              A Dentarium reúne diferentes áreas da odontologia em um só endereço. Isso permite que
              prevenção, estética e reabilitação sejam planejadas juntas, com cada etapa considerando
              as outras.
            </p>
            <p>
              Da sala de espera aos consultórios, os ambientes são claros e organizados: um lugar
              para conversar com calma sobre o seu tratamento.
            </p>
          </div>
          <dl className="mt-9 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-graphite">Endereço</dt>
              <dd className="mt-1.5 text-[0.95rem] text-ink">{fullAddress()}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-graphite">Especialidade</dt>
              <dd className="mt-1.5 text-[0.95rem] text-ink">{clinic.tagline}</dd>
            </div>
          </dl>
          <ButtonLink href="/a-clinica" variant="secondary" className="mt-9">
            Conheça a clínica
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
