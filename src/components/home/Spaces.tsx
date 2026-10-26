import Link from "next/link";

import { homeGallery } from "@/data/images";
import { Gallery } from "@/components/clinic/Gallery";

export function Spaces() {
  return (
    <section aria-labelledby="ambientes-title" className="section">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="kicker">Ambientes</p>
            <h2 id="ambientes-title" className="display-lg mt-5 max-w-[30rem]">
              Conheça a estrutura da Dentarium.
            </h2>
          </div>
          <p className="prose-body max-w-[28rem] lg:justify-self-end">
            Do jardim aos consultórios, espaços claros e organizados. Selecione uma foto para
            ampliar.{" "}
            <Link href="/a-clinica#ambientes" className="link-underline font-semibold text-ink">
              Fazer o tour completo
            </Link>
          </p>
        </div>
        <div className="mt-12 md:mt-20">
          <Gallery items={homeGallery} />
        </div>
      </div>
    </section>
  );
}
