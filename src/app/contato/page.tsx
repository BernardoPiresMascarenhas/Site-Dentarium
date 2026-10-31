import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SCHEDULE_SUBJECT, clinic, fullAddress, mailtoHref, telHref, whatsappHref } from "@/data/clinic";
import { WhatsappButton } from "@/components/clinic/WhatsappButton";
import { ScheduleForm } from "@/components/clinic/ScheduleForm";
import { LocationSection } from "@/components/clinic/LocationSection";
import { HealthPlans } from "@/components/clinic/HealthPlans";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contato",
  description: `Solicite uma avaliação pelo WhatsApp, veja telefones, e-mail, horário e como chegar à Clínica Dentarium: ${fullAddress()}. Segunda a sexta, das 8h às 18h30.`,
};

export default function ContactPage() {
  const address = clinic.address.value;

  return (
    <>
      <section aria-labelledby="contato-title" className="border-b border-line">
        <div className="container-site grid gap-14 pt-10 pb-16 md:pt-14 lg:grid-cols-[1fr_minmax(0,31rem)] lg:gap-16 lg:pb-24 xl:gap-24">
          <div>
            <Breadcrumbs crumbs={[{ href: "/contato", label: "Contato" }]} />
            <h1
              id="contato-title"
              className="display-xl intro-rise mt-8 max-w-[34rem]"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              Vamos cuidar do seu sorriso?
            </h1>
            <p className="lede intro-rise mt-6 max-w-[34rem]" style={{ "--i": 1 } as React.CSSProperties}>
              Conte o que você procura e a recepção combina com você o melhor horário para a primeira
              avaliação. Se preferir, fale direto pelo WhatsApp ou por telefone.
            </p>

            <ul
              className="intro-rise mt-10 divide-y divide-line border-y border-line"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <InfoRow icon={<MapPin className="size-[1.1rem]" />} title="Endereço">
                <p>
                  {address.street} — {address.neighborhood}
                  <br />
                  {address.city}/{address.state}
                </p>
                <a href="#como-chegar" className="link-underline mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-graphite sm:min-h-0">
                  Ver mapa e como chegar
                </a>
              </InfoRow>
              <InfoRow icon={<MessageCircle className="size-[1.1rem]" />} title="WhatsApp">
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline tabular-nums"
                >
                  {clinic.whatsapp.value.display}
                  <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                </a>
              </InfoRow>
              <InfoRow icon={<Phone className="size-[1.1rem]" />} title="Telefones">
                <span className="flex flex-wrap gap-x-5 gap-y-1">
                  {clinic.phones.value.map((p) => (
                    <a key={p.e164} href={telHref(p)} className="link-underline tabular-nums">
                      {p.display}
                    </a>
                  ))}
                </span>
              </InfoRow>
              <InfoRow icon={<Mail className="size-[1.1rem]" />} title="E-mail">
                <a href={mailtoHref(SCHEDULE_SUBJECT)} className="link-underline break-all">
                  {clinic.email.value}
                </a>
              </InfoRow>
              <InfoRow icon={<Clock className="size-[1.1rem]" />} title="Horário">
                <ul className="space-y-1">
                  {clinic.schedule.map((s) => (
                    <li key={s.days} className="flex flex-wrap justify-between gap-x-6 sm:max-w-[20rem]">
                      <span>{s.days}</span>
                      <span className={`tabular-nums ${s.time === "Fechado" ? "text-stone" : ""}`}>{s.time}</span>
                    </li>
                  ))}
                </ul>
              </InfoRow>
            </ul>

            <div className="intro-rise mt-9" style={{ "--i": 3 } as React.CSSProperties}>
              <WhatsappButton variant="secondary" className="w-full sm:w-auto">
                Falar agora pelo WhatsApp
              </WhatsappButton>
            </div>
          </div>

          <div id="agendar" className="intro-settle lg:pt-16">
            <div className="rounded-[var(--radius-md)] border border-line bg-paper p-6 shadow-[0_30px_60px_-44px_rgba(63,66,63,0.45)] sm:p-9">
              <p className="kicker">Avaliação</p>
              <h2 className="display-md mt-4">Solicite sua avaliação</h2>
              <p className="prose-body mt-3 text-[0.95rem]">
                Preencha os campos e a mensagem fica pronta no WhatsApp. A recepção responde para
                combinar o horário.
              </p>
              <div className="mt-8">
                <ScheduleForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HealthPlans />
      <LocationSection />
    </>
  );
}

function InfoRow({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] items-start gap-4 py-5">
      <span aria-hidden className="grid size-10 place-items-center rounded-full bg-taupe-tint text-clay">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-graphite">{title}</p>
        <div className="mt-1 text-[1.02rem] leading-relaxed text-ink">{children}</div>
      </div>
    </li>
  );
}
