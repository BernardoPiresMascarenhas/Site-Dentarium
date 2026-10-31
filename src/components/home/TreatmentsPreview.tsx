import { featuredTreatments } from "@/data/treatments";
import { ButtonLink } from "@/components/ui/Button";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function TreatmentsPreview() {
  return (
    <section aria-labelledby="tratamentos-title" className="section bg-mist">
      <div className="container-site">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[36rem]">
            <p className="kicker">Tratamentos</p>
            <h2 id="tratamentos-title" className="display-lg mt-5">
              Precisão técnica e atenção em cada etapa.
            </h2>
          </div>
          <p className="prose-body max-w-[24rem] md:pb-2">
            Os tratamentos mais procurados. Veja como cada um funciona e quando vale uma avaliação.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTreatments.map((t) => (
            <StaggerItem key={t.slug}>
              <TreatmentCard treatment={t} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/tratamentos" variant="secondary">
            Ver todos os tratamentos
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
