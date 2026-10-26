import { ButtonLink } from "@/components/ui/Button";
import { TechShowcase } from "@/components/clinic/TechShowcase";

export function Technology() {
  return (
    <section aria-labelledby="tecnologia-title" className="on-deep section bg-deep text-on-deep">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div>
            <p className="kicker">Tecnologia</p>
            <h2 id="tecnologia-title" className="display-lg mt-5 max-w-[30rem]">
              Recursos a serviço do diagnóstico, não do espetáculo.
            </h2>
          </div>
          <p className="max-w-[28rem] text-[1.05rem] leading-relaxed text-on-deep-muted lg:pb-1">
            A tecnologia ajuda a enxergar melhor e a planejar com mais precisão. Quem decide o que
            faz sentido para você é sempre o profissional, depois da avaliação.
          </p>
        </div>

        <div className="mt-14">
          <TechShowcase />
        </div>

        <ButtonLink href="/tecnologia" variant="outline-light" className="mt-12">
          Como a tecnologia apoia cada etapa
        </ButtonLink>
      </div>
    </section>
  );
}
