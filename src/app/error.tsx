"use client";

import { ButtonLink, buttonClass } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section">
      <div className="container-site max-w-[44rem]">
        <p className="kicker">Algo deu errado</p>
        <h1 className="display-lg mt-6">Não foi possível carregar esta página.</h1>
        <p className="lede mt-5">
          Tente carregar novamente. Se o problema continuar, volte ao início ou entre em contato por
          telefone.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className={buttonClass("primary")}>
            Tentar novamente
          </button>
          <ButtonLink href="/" variant="secondary">
            Voltar ao início
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
