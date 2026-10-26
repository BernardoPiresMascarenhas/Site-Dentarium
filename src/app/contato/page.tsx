import type { Metadata } from "next";
import Image from "next/image";

import {
  SCHEDULE_SUBJECT,
  clinic,
  fullAddress,
  mailtoHref,
  mapsUrl,
  telHref,
  whatsappHref,
} from "@/data/clinic";
import { images } from "@/data/images";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonAnchor } from "@/components/ui/Button";
import { ScheduleForm } from "@/components/clinic/ScheduleForm";

export const metadata: Metadata = {
  title: "Contato",
  description: `Endereço, telefones e e-mail da Clínica Dentarium: ${fullAddress()}.`,
};

export default function ContactPage() {
  const whatsapp = whatsappHref();
  const fachada = images.fachada;
  const address = clinic.address.value;

  return (
    <>
      <PageHero
        crumbs={[{ href: "/contato", label: "Contato" }]}
        title="Fale com a Dentarium."
        lede="Ligue para a recepção ou envie um e-mail para agendar sua avaliação. Ficamos na Rua do Ouro, no bairro Serra."
        aside={
          <figure>
            <div className="arch overflow-hidden" style={{ backgroundColor: fachada.tone }}>
              <Image
                src={fachada.src}
                alt={fachada.alt}
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 384px, 90vw"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-sm text-stone">{fachada.caption}</figcaption>
          </figure>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor href={telHref(clinic.phones.value[0])}>
            Ligar {clinic.phones.value[0].display}
          </ButtonAnchor>
          <ButtonAnchor href={mailtoHref(SCHEDULE_SUBJECT)} variant="secondary">
            Enviar e-mail
          </ButtonAnchor>
        </div>
      </PageHero>

      <section aria-label="Informações de contato" className="section">
        <div className="container-site grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <dl className="divide-y divide-line border-y border-line">
              <InfoRow term="Endereço">
                <p>
                  {address.street}
                  <br />
                  {address.neighborhood}, {address.city}/{address.state}
                </p>
                <a
                  href={mapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-2 inline-block text-sm font-semibold text-graphite"
                >
                  Ver rotas no Google Maps
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </InfoRow>
              <InfoRow term="Telefones">
                <ul className="space-y-1">
                  {clinic.phones.value.map((p) => (
                    <li key={p.e164}>
                      <a href={telHref(p)} className="link-underline">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoRow>
              <InfoRow term="E-mail">
                <a href={mailtoHref(SCHEDULE_SUBJECT)} className="link-underline break-all">
                  {clinic.email.value}
                </a>
              </InfoRow>
              <InfoRow term="Horário">
                {clinic.hours.value}
              </InfoRow>
              <InfoRow term="WhatsApp">
                {whatsapp ? (
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link-underline">
                    Conversar pelo WhatsApp
                  </a>
                ) : (
                  <span className="text-stone">
                    Em breve. O número oficial está sendo confirmado — por enquanto, use telefone ou
                    e-mail.
                  </span>
                )}
              </InfoRow>
            </dl>

          </div>

          <div id="agendar" className="scroll-mt-28">
            <div className="rounded-[var(--radius-md)] border border-line bg-paper p-7 sm:p-10">
              <h2 className="display-md">Pedir um horário por e-mail</h2>
              <p className="prose-body mt-3 text-[0.95rem]">
                Preencha o básico e a mensagem de agendamento fica pronta no seu e-mail. A recepção
                responde para combinar o horário.
              </p>
              <div className="mt-8">
                <ScheduleForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
      <dt className="text-sm font-semibold text-graphite">{term}</dt>
      <dd className="text-[1.02rem] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}
