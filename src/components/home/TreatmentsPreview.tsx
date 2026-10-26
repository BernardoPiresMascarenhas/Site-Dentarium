import { featuredTreatments } from "@/data/treatments";
import { ButtonLink } from "@/components/ui/Button";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";

export function TreatmentsPreview() {
  return (
    <section aria-labelledby="tratamentos-title" className="section bg-mist">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[36rem]">
            <p className="kicker">Tratamentos</p>
            <h2 id="tratamentos-title" className="display-lg mt-5">
              Precisão técnica e atenção em cada etapa.
            </h2>
          </div>
          <p className="prose-body max-w-[24rem] md:pb-2">
            Os principais tratamentos da clínica. Cada um começa por uma avaliação individual — é
            ela que indica o caminho mais adequado.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTreatments.map((t) => (
            <li key={t.slug}>
              <TreatmentCard treatment={t} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/tratamentos" variant="secondary">
            Ver todos os tratamentos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
