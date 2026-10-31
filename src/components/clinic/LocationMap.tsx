"use client";

import { useRef, useState } from "react";
import { MapPin } from "lucide-react";

import { googleMaps } from "@/data/clinic";

/**
 * Mapa do Google carregado só quando o visitante pede: antes do clique,
 * nenhuma requisição é feita ao Google (privacidade e desempenho). Depois,
 * entra a incorporação oficial da ficha da clínica, com zoom e navegação.
 * No celular, a incorporação do Google usa gestos com dois dedos, então a
 * rolagem da página continua livre.
 */
export function LocationMap({ address }: { address: string }) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-md)] border border-line bg-taupe-tint sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]">
      {loaded ? (
        <iframe
          ref={frameRef}
          src={googleMaps.embedSrc}
          title={`Mapa do Google com a localização da Clínica Dentarium, ${address}`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => frameRef.current?.focus()}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6">
          {/* Malha discreta que sugere ruas, sem imagem de terceiros. */}
          <span
            aria-hidden
            className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--taupe-soft)_1px,transparent_1px),linear-gradient(90deg,var(--taupe-soft)_1px,transparent_1px)] [background-size:56px_56px]"
          />
          <span aria-hidden className="absolute top-[38%] left-0 h-3 w-full -rotate-6 bg-ivory/80" />
          <span aria-hidden className="absolute top-0 left-[46%] h-full w-3 rotate-12 bg-ivory/80" />

          <div className="relative flex max-w-[22rem] flex-col items-center text-center">
            <span className="grid size-14 place-items-center rounded-full bg-clay text-white shadow-[0_10px_24px_-14px_rgba(122,92,79,0.9)]">
              <MapPin aria-hidden strokeWidth={1.75} className="size-6" />
            </span>
            <p className="mt-5 font-serif text-[1.35rem] leading-snug text-balance text-ink">{address}</p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="mt-6 inline-flex min-h-11 items-center rounded-full border border-taupe-soft bg-ivory px-5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-taupe-line hover:bg-paper"
            >
              Mostrar mapa interativo
            </button>
            <p className="mt-4 text-[0.8rem] leading-relaxed text-stone">
              O mapa é carregado do Google Maps somente depois do clique.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
