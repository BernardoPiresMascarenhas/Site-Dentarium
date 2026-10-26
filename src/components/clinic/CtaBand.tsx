import { SCHEDULE_SUBJECT, clinic, mailtoHref, telHref } from "@/data/clinic";
import { scheduleCta } from "@/data/navigation";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";

/** Faixa de encerramento das páginas internas. */
export function CtaBand({
  title = "Vamos conversar sobre o seu caso?",
  text = "A indicação de qualquer tratamento depende de avaliação individual com cirurgião-dentista. Agende a sua.",
}: {
  title?: string;
  text?: string;
}) {
  const phone = clinic.phones.value[0];
  return (
    <section aria-label="Agendar avaliação" className="on-deep border-b border-white/10 bg-deep text-on-deep">
      <div className="container-site grid items-end gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div>
          <h2 className="display-lg max-w-[34rem]">{title}</h2>
          <p className="mt-5 max-w-[32rem] leading-relaxed text-on-deep-muted">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href={scheduleCta.href} variant="light">
            {scheduleCta.label}
          </ButtonLink>
          <ButtonAnchor href={telHref(phone)} variant="outline-light">
            Ligar {phone.display}
          </ButtonAnchor>
        </div>
        <p className="text-sm text-on-deep-muted lg:col-span-2">
          Prefere escrever?{" "}
          <a href={mailtoHref(SCHEDULE_SUBJECT)} className="link-underline text-on-deep">
            {clinic.email.value}
          </a>
        </p>
      </div>
    </section>
  );
}
