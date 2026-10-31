import Image from "next/image";
import { CalendarDays, Phone } from "lucide-react";

import { clinic, telHref } from "@/data/clinic";
import { images } from "@/data/images";
import { scheduleCta } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";

const portrait = images.heroEquipe;

export function Hero() {
  const address = clinic.address.value;
  const phone = clinic.phones.value[0];
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-site grid items-center gap-12 pt-6 pb-20 md:pt-10 lg:min-h-[min(calc(100svh-var(--header-h)),44rem)] lg:grid-cols-[1fr_1.08fr] lg:gap-12 xl:gap-16 lg:pt-2 lg:pb-14">
        <div className="relative z-10 max-w-[34rem]">
          <p className="kicker intro-rise" style={{ "--i": 0 } as React.CSSProperties}>
            Clínica odontológica em Belo Horizonte
          </p>
          <h1 id="hero-title" className="hero-title intro-rise mt-5" style={{ "--i": 1 } as React.CSSProperties}>
            Cuidado especializado, em cada detalhe.
          </h1>
          <p className="lede intro-rise mt-5 max-w-[30rem]" style={{ "--i": 2 } as React.CSSProperties}>
            Diferentes áreas da odontologia trabalhando juntas, do diagnóstico ao acompanhamento, em
            um espaço planejado para que você se sinta à vontade.
          </p>
          <div
            className="intro-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <ButtonLink href={scheduleCta.href} className="min-h-14 px-7 text-base whitespace-nowrap">
              <CalendarDays aria-hidden className="size-[1.1rem] opacity-80" />
              {scheduleCta.label}
            </ButtonLink>
            <ButtonLink href="/a-clinica" variant="secondary" className="min-h-14 px-7 whitespace-nowrap">
              Conheça a Dentarium
            </ButtonLink>
          </div>
          <p className="intro-rise mt-5 flex items-center gap-2 text-sm text-stone" style={{ "--i": 4 } as React.CSSProperties}>
            <Phone aria-hidden className="size-3.5 text-clay" />
            Prefere ligar?
            <a href={telHref(phone)} className="link-underline font-semibold text-ink">
              {phone.display}
            </a>
          </p>
          <p
            className="intro-rise mt-9 hidden items-center gap-4 text-sm text-stone lg:flex"
            style={{ "--i": 5 } as React.CSSProperties}
          >
            <span aria-hidden className="h-px w-10 bg-taupe-line" />
            {address.street}, {address.neighborhood}, {address.region}
          </p>
        </div>

        <HeroPortrait />
      </div>
    </section>
  );
}

/**
 * Retrato principal em moldura assimétrica: só o canto superior esquerdo
 * recebe a curva ampla (o arco do site), onde a foto mostra apenas parede —
 * rostos e a marca ao fundo ficam inteiros.
 */
function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,30rem)] sm:max-w-[32rem] lg:mr-0 lg:max-w-[36rem]">
      {/*
        Duas formas translúcidas que se sobrepõem, como as duas peças do
        símbolo da Dentarium: a interseção escurece por transparência.
      */}
      <div aria-hidden className="intro-settle absolute inset-0">
        <div className="frame-hero absolute inset-0 -translate-x-[6%] -translate-y-[5%] bg-clay/[0.15] mix-blend-multiply" />
        <div className="frame-hero absolute inset-0 translate-x-[1.5%] -translate-y-[8%] bg-brand-graphite/[0.1] mix-blend-multiply" />
      </div>

      <figure
        className="frame-hero intro-settle relative overflow-hidden shadow-[0_40px_80px_-48px_rgba(46,48,46,0.55)]"
        // O arquivo tem uma coluna escura de 1 px na borda direita (artefato de exportação):
        // a moldura é 2 px mais estreita e a imagem fica ancorada à esquerda, sem alterar o original.
        style={{ backgroundColor: portrait.tone, aspectRatio: `${portrait.src.width - 2} / ${portrait.src.height}` }}
      >
        <Image
          src={portrait.src}
          alt={portrait.alt}
          priority
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 576px, (min-width: 640px) 512px, 92vw"
          className="object-cover"
          style={{ objectPosition: portrait.focus }}
        />
        <figcaption className="sr-only">{portrait.caption}</figcaption>
      </figure>

      <Seal />

      <div
        className="intro-rise absolute -bottom-7 left-4 max-w-[15rem] rounded-[var(--radius-sm)] bg-paper px-5 py-4 shadow-[0_18px_40px_-24px_rgba(46,48,46,0.45)] sm:-left-8"
        style={{ "--i": 6 } as React.CSSProperties}
      >
        <p className="font-serif text-[1.1rem] leading-snug text-balance text-ink">
          Odontologia funcional e estética
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-[0.8rem] text-stone">
          <span aria-hidden className="size-1.5 rounded-full bg-clay" />
          Fundadores da Dentarium
        </p>
      </div>
    </div>
  );
}

/** Selo circular estático com a localização. */
function Seal() {
  const text = "Belo Horizonte · Serra · Belo Horizonte · Serra ·";
  return (
    <div
      aria-hidden
      className="intro-rise absolute -top-8 -left-3 size-[5.75rem] rounded-full bg-ivory/95 backdrop-blur-sm sm:-left-9 sm:size-[6.75rem]"
      style={{ "--i": 7 } as React.CSSProperties}
    >
      <svg viewBox="0 0 120 120" className="seal-spin size-full">
        <defs>
          <path id="seal-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="var(--taupe-soft)" />
        <text className="fill-taupe text-[8.4px] font-semibold">
          {/* textLength distribui as letras exatamente pela circunferência (2π·44 ≈ 276). */}
          <textPath href="#seal-circle" textLength="272" lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-clay" />
    </div>
  );
}
