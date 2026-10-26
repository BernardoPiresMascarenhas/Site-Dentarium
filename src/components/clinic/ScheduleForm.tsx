"use client";

import { useState } from "react";

import { SCHEDULE_SUBJECT, clinic, mailtoHref } from "@/data/clinic";
import { buttonClass } from "@/components/ui/Button";

const periods = ["Manhã", "Tarde", "Qualquer horário"] as const;

/**
 * Monta um e-mail no aplicativo do próprio visitante. Nada é enviado nem
 * armazenado por este site, e não há campos de saúde, documentos ou CPF.
 */
export function ScheduleForm() {
  const [opened, setOpened] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nome") ?? "").trim();
    const contact = String(data.get("retorno") ?? "").trim();
    const period = String(data.get("periodo") ?? "");
    const body = [
      "Olá! Gostaria de agendar uma avaliação.",
      "",
      `Nome: ${name}`,
      `Contato para retorno: ${contact}`,
      `Período de preferência: ${period}`,
    ].join("\n");
    // Abre o aplicativo de e-mail do visitante. Nada é enviado por este site.
    const link = document.createElement("a");
    link.href = mailtoHref(SCHEDULE_SUBJECT, body);
    link.click();
    setOpened(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-describedby="form-aviso">
      <Field label="Seu nome" htmlFor="nome">
        <input id="nome" name="nome" required autoComplete="name" className={inputClass} />
      </Field>
      <Field label="Telefone ou e-mail para retorno" htmlFor="retorno">
        <input id="retorno" name="retorno" required autoComplete="tel" className={inputClass} />
      </Field>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Período de preferência</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {periods.map((p, i) => (
            <label key={p} className="cursor-pointer">
              <input type="radio" name="periodo" value={p} defaultChecked={i === 2} className="peer sr-only" />
              <span className="inline-flex min-h-10 items-center rounded-full border border-taupe-soft bg-paper px-4 text-sm font-medium transition-colors hover:bg-taupe-tint peer-checked:border-clay peer-checked:bg-clay peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay">
                {p}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <p id="form-aviso" className="rounded-[var(--radius-sm)] bg-mist px-4 py-3 text-[0.85rem] leading-relaxed text-stone">
        Ao continuar, seu aplicativo de e-mail abre com a mensagem pronta para{" "}
        {clinic.email.value}. Nada é enviado por este site. Não inclua informações de saúde.
      </p>

      <button
        type="submit"
        className={buttonClass("primary", "w-full sm:w-auto")}
      >
        Abrir e-mail de agendamento
      </button>

      {opened && (
        <div role="status" className="rounded-[var(--radius-sm)] border border-taupe-soft bg-taupe-tint px-4 py-3 text-sm leading-relaxed text-stone">
          <p className="font-semibold text-ink">Mensagem pronta no seu aplicativo de e-mail.</p>
          <p className="mt-1">
            Revise e envie por lá. O horário só fica marcado quando a recepção responder. Se o
            aplicativo não abriu, escreva para{" "}
            <a href={mailtoHref(SCHEDULE_SUBJECT)} className="link-underline font-semibold text-ink">
              {clinic.email.value}
            </a>{" "}
            ou ligue para a recepção.
          </p>
        </div>
      )}
    </form>
  );
}

const inputClass =
  "mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-line bg-paper px-4 text-[1rem] text-ink transition-colors focus:border-clay focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-clay";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
