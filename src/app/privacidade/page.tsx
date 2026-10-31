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
      "Esta demonstração não possui banco de dados, cadastro ou área restrita. O código do site não envia o conteúdo do formulário para um servidor nem o grava no navegador.",
      "O servidor que hospedar o site pode registrar dados técnicos de acesso, como endereço IP e páginas visitadas, conforme o provedor de hospedagem escolhido. Esses registros dependem da publicação e devem ser descritos no aviso oficial.",
    ],
  },
  {
    title: "Formulário de solicitação de avaliação",
    body: [
      "O formulário da página Contato pede nome, WhatsApp, tratamento de interesse e, se você quiser, uma mensagem. Com essas informações, ele monta um texto para você revisar.",
      "Ao escolher continuar pelo WhatsApp, o WhatsApp abre com a mensagem pronta para o número da clínica. Ao escolher o e-mail, abre o aplicativo de e-mail do seu dispositivo, já endereçado à clínica. Nos dois casos, nada é enviado até você confirmar o envio no próprio aplicativo.",
      "Abrir a mensagem não agenda uma consulta nem confirma que a clínica a recebeu: o horário só é combinado quando a recepção responder. Depois que você envia, as informações passam a ser tratadas pela clínica e pelo serviço usado (WhatsApp ou e-mail), conforme as políticas de cada um.",
    ],
  },
  {
    title: "Cookies e medição de audiência",
    body: [
      "Esta versão não utiliza cookies de rastreamento, pixels de publicidade ou ferramentas de análise de terceiros. O mapa do Google, se você optar por carregá-lo, pode usar cookies próprios, como descrito a seguir.",
    ],
  },
  {
    title: "Serviços externos",
    body: [
      "O mapa da página Contato é do Google Maps e só é carregado quando você clica em “Mostrar mapa interativo”. Antes disso, a página não faz nenhuma conexão com o Google por causa do mapa. Depois do clique, o Google pode receber dados técnicos do seu navegador, como o endereço IP, e usar cookies, conforme a política de privacidade do Google.",
      "Os links de rotas, de avaliações no Google e do WhatsApp abrem serviços de terceiros, que têm as próprias políticas de privacidade. Telefones e e-mails abrem aplicativos do seu dispositivo.",
    ],
  },
  {
    title: "Dados de saúde",
    body: [
      "Informações de saúde são dados pessoais sensíveis segundo a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Por isso, o formulário não pede relato clínico, exames, documentos ou CPF, e orienta a não incluir informações de saúde na mensagem.",
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
