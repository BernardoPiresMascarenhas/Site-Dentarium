import { Accessibility, ArrowUpRight, Car } from "lucide-react";

import { clinic, directionsUrl, googleMaps } from "@/data/clinic";
import { ButtonAnchor } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LocationMap } from "./LocationMap";

/** Localização com mapa do Google, depois do formulário da página de contato. */
export function LocationSection() {
  const a = clinic.address.value;
  const address = `${a.street} — ${a.neighborhood}, ${a.city}/${a.state}`;
  const parking = clinic.facilities.value.find((f) => f.label === "Estacionamento próprio");
  const access = clinic.facilities.value.find((f) => f.label === "Plataforma elevatória");

  return (
    <section id="como-chegar" aria-labelledby="localizacao-title" className="bg-paper py-16 md:py-24">
      <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch lg:gap-16">
        <Reveal className="flex flex-col">
          <p className="kicker">Como chegar</p>
          <h2 id="localizacao-title" className="display-lg mt-5 text-[clamp(2.1rem,1.5rem+1.6vw,2.9rem)]!">
            Como chegar à Dentarium
          </h2>
          <address className="mt-6 not-italic">
            <p className="text-[1.1rem] leading-relaxed text-ink">{address}</p>
            <p className="mt-1 text-sm text-stone">
              CEP {googleMaps.postalCode} · {a.region}
            </p>
          </address>

          <ul className="mt-8 space-y-4 border-t border-line pt-6">
            {parking && (
              <li className="grid grid-cols-[2.25rem_1fr] items-start gap-3">
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-taupe-tint text-clay">
                  <Car strokeWidth={1.75} className="size-4" />
                </span>
                <p className="text-[0.95rem] leading-relaxed text-stone">
                  <span className="font-semibold text-ink">{parking.label}.</span> {parking.text}
                </p>
              </li>
            )}
            {access && (
              <li className="grid grid-cols-[2.25rem_1fr] items-start gap-3">
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-taupe-tint text-clay">
                  <Accessibility strokeWidth={1.75} className="size-4" />
                </span>
                <p className="text-[0.95rem] leading-relaxed text-stone">
                  <span className="font-semibold text-ink">{access.label}.</span> {access.text}
                </p>
              </li>
            )}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 lg:mt-auto lg:flex-col lg:items-start lg:gap-3 lg:pt-8 xl:flex-row xl:items-center xl:gap-6">
            <ButtonAnchor href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap">
              Ver rotas no Google Maps
              <span className="sr-only"> (abre em nova aba)</span>
            </ButtonAnchor>
            <a
              href={googleMaps.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-graphite sm:self-auto"
            >
              <span className="link-underline whitespace-nowrap">Abrir a ficha no Google Maps</span>
              <ArrowUpRight
                aria-hidden
                className="size-4 text-clay transition-transform duration-500 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:h-full">
          <LocationMap address={address} />
        </Reveal>
      </div>
    </section>
  );
}
