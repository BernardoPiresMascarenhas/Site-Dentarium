import { ArrowUpRight } from "lucide-react";

import { googleReviewLinks, publishedReviews } from "@/data/reviews";
import { buttonClass } from "@/components/ui/Button";
import { ReviewsCarousel } from "@/components/reviews/ReviewsCarousel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Depoimentos reais do Google (somente textos integrais). Links para o
 * Google só aparecem quando o endereço oficial estiver configurado em
 * src/data/reviews.ts — nunca um link presumido.
 */
export function Reviews() {
  const { reviewsUrl, writeReviewUrl } = googleReviewLinks;
  if (publishedReviews.length === 0) return null;

  return (
    <section aria-labelledby="avaliacoes-title" className="section overflow-x-clip bg-mist">
      <div className="container-site">
        <Reveal className="grid gap-5 lg:grid-cols-[1.45fr_0.75fr] lg:items-end lg:gap-12">
          <div>
            <p className="kicker">O que dizem nossos pacientes</p>
            <h2
              id="avaliacoes-title"
              className="mt-5 font-serif text-[clamp(2rem,1.45rem+1.7vw,2.9rem)] leading-[1.08] tracking-[-0.015em] text-balance text-ink"
            >
              Histórias de confiança e cuidado.
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pb-1">
            <p className="prose-body max-w-[26rem]">
              Conheça experiências compartilhadas por quem escolheu a Dentarium.
            </p>
            {reviewsUrl && (
              <a
                href={reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink"
              >
                Ver avaliações no Google
                <ArrowUpRight aria-hidden className="size-4 text-clay" />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            )}
          </div>
        </Reveal>

        <div className="mt-10 md:mt-12">
          <ReviewsCarousel items={publishedReviews} />
        </div>

        <aside
          aria-labelledby="avaliar-title"
          className="mt-12 flex flex-col gap-5 border-t border-taupe-soft pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 id="avaliar-title" className="font-serif text-[1.35rem] text-ink">
              Já é paciente da Dentarium?
            </h3>
            <p className="mt-1.5 max-w-[34rem] text-[0.95rem] leading-relaxed text-stone">
              Compartilhe sua experiência e ajude outras pessoas a conhecerem nossa clínica.
            </p>
          </div>
          {writeReviewUrl && (
            <a
              href={writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("secondary", "shrink-0 self-start md:self-auto")}
            >
              Deixar avaliação no Google
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}
