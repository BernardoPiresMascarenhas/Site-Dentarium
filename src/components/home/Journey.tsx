"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { journey } from "@/data/content";

/**
 * Linha do tempo do atendimento. A linha vertical acompanha o scroll
 * (sem prender a rolagem); cada etapa acende ao entrar na tela.
 */
export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section aria-labelledby="jornada-title" className="section">
      <div className="container-site grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <p className="kicker">Como funciona</p>
          <h2 id="jornada-title" className="display-lg mt-5 max-w-[26rem]">
            Do primeiro contato ao acompanhamento.
          </h2>
          <p className="prose-body mt-6 max-w-[26rem]">
            Cada tratamento é decidido com você, depois de uma avaliação. Nenhuma etapa é pulada.
          </p>
        </div>

        <ol ref={ref} className="relative">
          <span aria-hidden className="absolute top-2 bottom-2 left-[1.375rem] w-px bg-line" />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.375rem] w-px origin-top bg-clay"
            style={{ scaleY: progress }}
          />
          {journey.map((step, i) => (
            <motion.li
              key={step.title}
              className="relative grid grid-cols-[2.75rem_1fr] gap-6 pb-14 last:pb-0"
              initial={{ opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              // A margem superior de 100% conta como "vista" a etapa que já ficou
              // acima da tela: numa rolagem rápida, nenhuma etapa fica apagada.
              viewport={{ margin: "100% 0px -35% 0px", once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10 grid size-11 place-items-center rounded-full border border-rose bg-ivory font-serif text-lg text-clay">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="display-md">{step.title}</h3>
                <p className="prose-body mt-3 max-w-[32rem]">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
