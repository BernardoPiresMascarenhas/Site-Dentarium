import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

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
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealImage } from "@/components/ui/Reveal";

/** Encerramento com endereço, fachada e formas de contato verificadas como publicadas. */
export function ContactBlock({ withPageLink = true }: { withPageLink?: boolean }) {
  const fachada = images.fachada;
  return (
    <section aria-labelledby="contato-title" className="section bg-paper">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal>
          <p className="kicker">Contato</p>
          <h2 id="contato-title" className="display-lg mt-5 max-w-[32rem]">
            Agende uma avaliação.
          </h2>
          <p className="prose-body mt-6 max-w-[30rem]">
            Escreva pelo WhatsApp, ligue para a recepção ou envie um e-mail. Vamos combinar o melhor
            horário para a sua primeira consulta.
          </p>

          <ul className="mt-10 space-y-6">
            <ContactRow icon={<MapPin className="size-[1.1rem]" />} title="Endereço">
              <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="link-underline">
                {fullAddress()}
              </a>
            </ContactRow>
            <ContactRow icon={<MessageCircle className="size-[1.1rem]" />} title="WhatsApp">
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-underline">
                {clinic.whatsapp.value.display}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-[1.1rem]" />} title="Telefones">
              <span className="flex flex-wrap gap-x-5 gap-y-1">
                {clinic.phones.value.map((p) => (
                  <a key={p.e164} href={telHref(p)} className="link-underline">
                    {p.display}
                  </a>
                ))}
              </span>
            </ContactRow>
            <ContactRow icon={<Mail className="size-[1.1rem]" />} title="E-mail">
              <a href={mailtoHref(SCHEDULE_SUBJECT)} className="link-underline break-all">
                {clinic.email.value}
              </a>
            </ContactRow>
          </ul>
          <p className="mt-6 text-sm text-stone">
            {clinic.hours.value}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {withPageLink ? (
              <ButtonLink href="/contato#agendar">Agendar avaliação</ButtonLink>
            ) : (
              <ButtonAnchor href={mailtoHref(SCHEDULE_SUBJECT)}>Enviar e-mail</ButtonAnchor>
            )}
            <ButtonAnchor href={mapsUrl()} target="_blank" rel="noopener noreferrer" variant="secondary">
              Ver rotas
            </ButtonAnchor>
          </div>
        </Reveal>

        <figure className="relative mx-auto w-full max-w-[28rem] lg:mr-0">
          <div className="arch overflow-hidden" style={{ backgroundColor: fachada.tone }}>
            <RevealImage>
              <Image
                src={fachada.src}
                alt={fachada.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 448px, 90vw"
                className="block h-auto w-full"
              />
            </RevealImage>
          </div>
          <figcaption className="mt-4 text-sm text-stone">{fachada.caption}, bairro Serra.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] items-start gap-4">
      <span aria-hidden className="grid size-10 place-items-center rounded-full bg-taupe-tint text-clay">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-graphite">{title}</p>
        <div className="mt-1 text-[1.02rem] text-ink">{children}</div>
      </div>
    </li>
  );
}
