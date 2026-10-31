"use client";

import { useRef, useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

import { SCHEDULE_SUBJECT, clinic, mailtoHref, whatsappHref } from "@/data/clinic";
import { categories, treatmentsByCategory } from "@/data/treatments";
import { buttonClass } from "@/components/ui/Button";

const GENERAL = "Avaliação geral (ainda não sei)";
const MESSAGE_MAX = 400;

type Channel = "whatsapp" | "email";
type Errors = Partial<Record<"nome" | "whatsapp", string>>;

/** Mantém só os dígitos do número brasileiro, sem o código do país. */
function phoneDigits(value: string) {
  const d = value.replace(/\D/g, "");
  return d.length > 11 && d.startsWith("55") ? d.slice(2) : d;
}

/** Formata enquanto o visitante digita: (31) 99999-9999. */
function formatPhone(value: string) {
  const d = phoneDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const local = d.slice(2);
  const split = local.length > 8 ? 5 : 4;
  return `(${d.slice(0, 2)}) ${local.slice(0, split)}${local.length > split ? `-${local.slice(split)}` : ""}`;
}

function validate(name: string, phone: string): Errors {
  const errors: Errors = {};
  if (name.length < 3) errors.nome = "Informe seu nome completo.";
  const digits = phoneDigits(phone);
  if (!digits) errors.whatsapp = "Informe um número de WhatsApp para a recepção responder.";
  else if (digits.length < 10 || digits.length > 11)
    errors.whatsapp = "Confira o número: use o DDD e o telefone, como (31) 99999-9999.";
  return errors;
}

/**
 * Monta a solicitação de avaliação no WhatsApp ou no aplicativo de e-mail do
 * próprio visitante. Nada é enviado nem armazenado por este site, e não há
 * campos de saúde, documentos ou CPF.
 */
export function ScheduleForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState<Channel | null>(null);
  const [phone, setPhone] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("nome") ?? "").trim().replace(/\s+/g, " ");
    const treatment = String(data.get("tratamento") ?? GENERAL);
    const message = String(data.get("mensagem") ?? "").trim();

    const found = validate(name, phone);
    setErrors(found);
    if (Object.keys(found).length) {
      setOpened(null);
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";
    const body = [
      "Olá! Gostaria de solicitar uma avaliação na Clínica Dentarium.",
      "",
      `Nome: ${name}`,
      `WhatsApp: ${formatPhone(phone)}`,
      `Tratamento de interesse: ${treatment}`,
      ...(message ? ["", `Mensagem: ${message}`] : []),
    ].join("\n");
    // Abre o WhatsApp ou o e-mail do visitante. Nada é enviado por este site.
    if (channel === "whatsapp") {
      window.open(whatsappHref(body), "_blank", "noopener,noreferrer");
    } else {
      const link = document.createElement("a");
      link.href = mailtoHref(SCHEDULE_SUBJECT, body);
      link.click();
    }
    setOpened(channel);
  };

  const clearError = (field: keyof Errors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby="form-aviso">
      <Field label="Nome completo" htmlFor="nome" error={errors.nome}>
        <input
          id="nome"
          name="nome"
          required
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          maxLength={80}
          aria-invalid={errors.nome ? true : undefined}
          aria-describedby={errors.nome ? "nome-erro" : undefined}
          onChange={() => clearError("nome")}
          className={inputClass(!!errors.nome)}
        />
      </Field>

      <Field label="WhatsApp" htmlFor="whatsapp" error={errors.whatsapp} hint="Com DDD. A recepção responde por esse número.">
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel-national"
          enterKeyHint="next"
          placeholder="(31) 99999-9999"
          value={phone}
          onChange={(e) => {
            setPhone(formatPhone(e.target.value));
            clearError("whatsapp");
          }}
          aria-invalid={errors.whatsapp ? true : undefined}
          aria-describedby={errors.whatsapp ? "whatsapp-erro whatsapp-dica" : "whatsapp-dica"}
          className={`${inputClass(!!errors.whatsapp)} tabular-nums`}
        />
      </Field>

      <Field label="Tratamento de interesse" htmlFor="tratamento">
        <div className="relative">
          <select id="tratamento" name="tratamento" defaultValue={GENERAL} className={`${inputClass(false)} appearance-none pr-11`}>
            <option value={GENERAL}>{GENERAL}</option>
            {categories.map((c) => (
              <optgroup key={c.id} label={c.name}>
                {treatmentsByCategory(c.id).map((t) => (
                  <option key={t.slug} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            strokeWidth={1.75}
            className="pointer-events-none absolute top-1/2 right-4 mt-1 size-4 -translate-y-1/2 text-clay"
          />
        </div>
      </Field>

      <Field label="Mensagem" optional htmlFor="mensagem">
        <textarea
          id="mensagem"
          name="mensagem"
          rows={3}
          maxLength={MESSAGE_MAX}
          enterKeyHint="enter"
          placeholder="Melhor período para contato, dúvidas sobre a primeira consulta…"
          aria-describedby="mensagem-contador"
          onChange={(e) => setMessageLength(e.target.value.length)}
          className={`${inputClass(false)} block h-auto min-h-[6.5rem] resize-y py-3 leading-relaxed`}
        />
        <p id="mensagem-contador" className="mt-1.5 text-right text-xs text-stone tabular-nums">
          {messageLength}/{MESSAGE_MAX}
        </p>
      </Field>

      <p id="form-aviso" className="border-l-2 border-taupe-soft pl-4 text-[0.85rem] leading-relaxed text-stone">
        Seus dados não são enviados nem guardados por este site: eles só preenchem a mensagem que
        abre no seu WhatsApp, e você revisa antes de enviar. Não inclua informações de saúde.
      </p>

      <div className="space-y-3">
        <button type="submit" name="canal" value="whatsapp" className={buttonClass("primary", "w-full")}>
          <MessageCircle aria-hidden strokeWidth={1.75} className="size-[1.1rem]" />
          Continuar pelo WhatsApp
          <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
        </button>
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-sm text-stone">
          Prefere e-mail?
          <button
            type="submit"
            name="canal"
            value="email"
            className="link-underline inline-flex min-h-11 items-center font-semibold text-graphite"
          >
            Enviar pelo seu e-mail
          </button>
        </p>
      </div>

      {opened && (
        <div role="status" className="rounded-[var(--radius-sm)] border border-taupe-soft bg-taupe-tint px-4 py-3 text-sm leading-relaxed text-stone">
          <p className="font-semibold text-ink">
            {opened === "whatsapp"
              ? "Mensagem pronta no WhatsApp."
              : "Mensagem pronta no seu aplicativo de e-mail."}
          </p>
          <p className="mt-1">
            Ela só chega à recepção depois que você enviar por lá, e o horário só fica marcado quando
            a recepção responder. Se nada abriu, escreva para o WhatsApp{" "}
            {clinic.whatsapp.value.display}, para{" "}
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

function inputClass(invalid: boolean) {
  return `mt-2 h-[3.25rem] w-full scroll-mt-32 rounded-[var(--radius-sm)] border bg-ivory px-4 text-[1rem] text-ink transition-[border-color,background-color,box-shadow] duration-300 ease-soft placeholder:text-stone/60 hover:border-taupe-line focus:border-clay focus:bg-paper focus:shadow-[0_0_0_4px_var(--taupe-tint)] focus:outline-none ${
    invalid ? "border-danger focus:border-danger" : "border-taupe-soft"
  }`;
}

function Field({
  label,
  htmlFor,
  optional,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-stone">opcional</span>}
      </label>
      {children}
      {hint && (
        <p id={`${htmlFor}-dica`} className="mt-1.5 text-xs text-stone">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-erro`} className="mt-1.5 text-[0.85rem] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
