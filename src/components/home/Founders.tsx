import { history } from "@/data/content";
import { images } from "@/data/images";
import { founders } from "@/data/team";
import { ArchImage } from "@/components/ui/ArchImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Fundadores. Na home, composição só tipográfica (a foto já está no hero);
 * em /a-clinica, com o retrato. A foto coletiva nunca é usada para
 * identificar quem é quem.
 */
export function Founders({ withPhoto = false }: { withPhoto?: boolean }) {
  return (
    <section aria-labelledby="fundadores-title" className="section overflow-x-clip bg-mist">
      <div
        className={`container-site grid items-center gap-14 lg:gap-20 ${
          withPhoto ? "md:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
        }`}
      >
        {withPhoto ? (
          <Reveal className="mx-auto w-full max-w-[24rem] md:mx-0">
            <ArchImage image={images.fundadores} sizes="(min-width: 768px) 384px, 90vw" echo />
          </Reveal>
        ) : (
          <div className="max-w-[28rem]">
            <FoundersIntro />
          </div>
        )}

        <div className={withPhoto ? "max-w-[36rem]" : ""}>
          {withPhoto && <FoundersIntro withHistory />}
          <ul className={`grid gap-4 sm:grid-cols-2 ${withPhoto ? "mt-9" : ""}`}>
            {founders.map((m) => (
              <li
                key={m.name}
                className="relative overflow-hidden rounded-[var(--radius-md)] border border-taupe-soft/70 bg-ivory/70 p-7 sm:p-8"
              >
                <FounderMotif />
                {m.role && <p className="text-[0.8rem] font-semibold text-clay">{m.role}</p>}
                <p className="mt-4 font-serif text-[1.65rem] leading-[1.15] text-balance text-ink sm:text-[1.8rem]">
                  {m.name}
                </p>
                <ul className="mt-5 space-y-1 text-[0.88rem] leading-snug text-stone">
                  {m.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-taupe-soft pt-4 text-sm text-stone tabular-nums">
                  CRO {m.cro}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FoundersIntro({ withHistory = false }: { withHistory?: boolean }) {
  return (
    <>
      <p className="kicker">{withHistory ? "Nossa história" : "Fundadores"}</p>
      <h2 id="fundadores-title" className="display-lg mt-5">
        {withHistory ? history.title : "Quem fundou a Dentarium."}
      </h2>
      {withHistory ? (
        <div className="prose-body mt-6 space-y-4">
          {history.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ) : (
        <p className="prose-body mt-6">
          A Dentarium nasceu da união profissional de dois cirurgiões-dentistas, com a inovação como
          um dos pilares da clínica.
        </p>
      )}
      <ButtonLink href="/equipe" variant="ghost" className="mt-7">
        Conheça a equipe
      </ButtonLink>
    </>
  );
}

/** Dois arcos translúcidos sobrepostos — o mesmo princípio de transparência do símbolo. */
function FounderMotif() {
  return (
    <span aria-hidden className="absolute top-7 right-7 block h-9 w-6 sm:top-8 sm:right-8">
      <span className="arch absolute inset-0 -translate-x-2.5 bg-clay/[0.22] mix-blend-multiply" />
      <span className="arch absolute inset-0 bg-brand-graphite/[0.16] mix-blend-multiply" />
    </span>
  );
}
