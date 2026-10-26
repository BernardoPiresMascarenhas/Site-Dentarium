import type { Metadata } from "next";

import { clinic } from "@/data/clinic";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Aviso de privacidade (demonstrativo)",
  description: "Versão demonstrativa de aviso de privacidade, pendente de revisão jurídica.",
};

const sections = [
  {
    title: "O que este site coleta",
    body: [
      "Esta demonstração não possui banco de dados, formulário com envio, cadastro ou área restrita. Nenhuma informação digitada é armazenada ou transmitida por este site.",
      "O formulário de agendamento apenas monta uma mensagem no aplicativo de e-mail do próprio visitante. O envio, se acontecer, é feito pelo visitante, diretamente para o endereço da clínica.",
    ],
  },
  {
    title: "Cookies e medição de audiência",
    body: [
      "Esta versão não utiliza cookies de rastreamento, pixels de publicidade ou ferramentas de análise de terceiros.",
    ],
  },
  {
    title: "Links externos",
    body: [
      "Os links para mapas abrem serviços de terceiros, como o Google Maps, que têm as próprias políticas de privacidade. Telefones e e-mails abrem aplicativos do seu dispositivo.",
    ],
  },
  {
    title: "Dados de saúde",
    body: [
      "Informações de saúde são dados pessoais sensíveis segundo a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Por isso, este site não solicita relato clínico, exames, documentos ou CPF.",
    ],
  },
  {
    title: "Contato",
    body: [
      `Dúvidas sobre esta demonstração podem ser direcionadas aos responsáveis pelo projeto. Assuntos da clínica: ${clinic.email.value}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: "/privacidade", label: "Aviso de privacidade" }]}
        title="Aviso de privacidade."
        lede="Versão demonstrativa, escrita para este estudo de redesign."
      />
      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <div className="rounded-[var(--radius-md)] border border-dashed border-clay/50 bg-paper p-6">
              <p className="font-semibold text-clay">Documento demonstrativo</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-stone">
                Este texto não é a política oficial da Clínica Dentarium. Antes de qualquer
                publicação, deve ser substituído por um aviso revisado juridicamente e aprovado pelo
                controlador dos dados.
              </p>
            </div>
          </aside>
          <div className="max-w-[44rem] space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="display-md">{s.title}</h2>
                <div className="prose-body mt-4 space-y-4">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
