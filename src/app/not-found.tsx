import Link from "next/link";

import { featuredTreatments } from "@/data/treatments";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="kicker">Erro 404</p>
          <h1 className="display-xl mt-6 max-w-[36rem]">Esta página não existe ou mudou de endereço.</h1>
          <p className="lede mt-6 max-w-[32rem]">
            Confira o endereço digitado ou siga por um dos caminhos abaixo.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Voltar ao início</ButtonLink>
            <ButtonLink href="/tratamentos" variant="secondary">
              Ver tratamentos
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Tratamentos principais" className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          <p className="text-sm font-semibold text-clay">Tratamentos principais</p>
          <ul className="mt-4 space-y-3">
            {featuredTreatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/tratamentos/${t.slug}`} className="font-serif text-xl transition-colors hover:text-clay">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
