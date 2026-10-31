"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import type { ClinicImage } from "@/data/images";

/**
 * Lightbox compartilhado: <dialog> modal (foco preso, Esc nativo), setas do
 * teclado, toque (arrastar), miniaturas e retorno do foco a quem abriu.
 */
export function useLightbox(items: ClinicImage[]) {
  const [index, setIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openAt = useCallback((i: number, opener: HTMLElement) => {
    openerRef.current = opener;
    setIndex(i);
  }, []);

  const lightbox = (
    <LightboxDialog
      items={items}
      index={index}
      setIndex={setIndex}
      onClosed={() => openerRef.current?.focus()}
    />
  );

  return { openAt, lightbox };
}

type DialogProps = {
  items: ClinicImage[];
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onClosed: () => void;
};

function LightboxDialog({ items, index, setIndex, onClosed }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null;
  const count = items.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)),
    [count, setIndex],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Fecha se a rota for ocultada (Activity) com o lightbox aberto.
  useLayoutEffect(() => {
    return () => {
      setIndex(null);
      document.documentElement.style.overflow = "";
    };
  }, [setIndex]);

  const onClose = () => {
    setIndex(null);
    document.documentElement.style.overflow = "";
    onClosed();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const current = index === null ? null : items[index];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      aria-label="Galeria de fotos da clínica"
      className="gallery-dialog m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-deep/[0.97]"
    >
      {current && index !== null && (
        <div
          className="flex h-dvh w-screen flex-col items-center justify-center gap-5 px-4 py-6 sm:px-8"
          onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex w-full max-w-[720px] items-center justify-between text-on-deep">
            <p className="text-sm" aria-live="polite">
              <span className="font-semibold">{current.caption}</span>
              <span className="ml-3 text-on-deep-muted tabular-nums">
                {index + 1} de {count}
              </span>
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              autoFocus
              className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Fechar galeria</span>
            </button>
          </div>

          <div className="relative flex w-full max-w-[720px] items-center justify-center">
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              sizes="720px"
              className="gallery-photo h-auto max-h-[68dvh] w-auto max-w-full rounded-[var(--radius-sm)]"
              style={{ maxWidth: `min(100%, ${current.src.width}px)` }}
            />
            {count > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </div>

          {count > 1 && (
            <ul className="flex flex-wrap justify-center gap-2.5" aria-label="Miniaturas">
              {items.map((img, i) => (
                <li key={img.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver ${img.caption}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`block size-12 overflow-hidden rounded-[4px] transition-opacity sm:size-14 ${
                      i === index ? "opacity-100 ring-2 ring-sand ring-offset-2 ring-offset-deep" : "opacity-50 hover:opacity-90"
                    }`}
                  >
                    <Image src={img.src} alt="" sizes="56px" className="size-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </dialog>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-deep/70 text-on-deep backdrop-blur transition-colors hover:bg-deep ${
        side === "left" ? "left-2 lg:-left-16" : "right-2 lg:-right-16"
      }`}
    >
      <Icon aria-hidden className="size-5" />
      <span className="sr-only">{side === "left" ? "Foto anterior" : "Próxima foto"}</span>
    </button>
  );
}

type PhotoTileProps = {
  img: ClinicImage;
  index: number;
  count: number;
  onOpen: (index: number, opener: HTMLElement) => void;
  sizes: string;
  className?: string;
  /** Altura fixa (carrossel): a largura acompanha a proporção. */
  fixedHeight?: boolean;
  /** Recorte controlado (ex.: "4 / 5"); por padrão, a proporção do arquivo. */
  aspect?: string;
  arch?: boolean;
};

/**
 * Miniatura ampliável. No hover/foco a foto aproxima levemente e a legenda
 * aparece. Sem filtros: as cores originais são preservadas.
 */
export function PhotoTile({
  img,
  index,
  count,
  onOpen,
  sizes,
  className = "",
  fixedHeight = false,
  aspect,
  arch = false,
}: PhotoTileProps) {
  const ratio = aspect ?? `${img.src.width} / ${img.src.height}`;
  return (
    <button
      type="button"
      onClick={(e) => onOpen(index, e.currentTarget)}
      className={`group relative block overflow-hidden text-left focus-visible:outline-offset-4 ${
        arch ? "arch" : "rounded-[var(--radius-md)]"
      } ${fixedHeight ? "" : "w-full"} ${className}`}
      // Nunca acima da largura do arquivo: fotos pequenas não são esticadas.
      style={{ backgroundColor: img.tone, aspectRatio: ratio, maxWidth: fixedHeight ? undefined : img.src.width }}
      aria-label={`Ampliar foto: ${img.caption}`}
    >
      <Image
        src={img.src}
        alt={img.alt}
        placeholder="blur"
        fill
        sizes={sizes}
        className={`transition-transform duration-[900ms] ease-soft group-hover:scale-[1.035] group-focus-visible:scale-[1.035] ${
          aspect ? "object-cover" : "object-contain"
        }`}
        style={{ objectPosition: img.focus }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-end gap-3 bg-gradient-to-t from-deep/50 to-transparent px-3 pt-10 pb-3 text-on-deep opacity-100 md:justify-between md:from-deep/70 md:via-deep/25 md:px-4 md:pt-14 md:pb-4 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
      >
        <span className="hidden text-sm font-semibold md:inline">{img.caption}</span>
        <span className="flex items-center gap-2 text-xs tabular-nums">
          {count > 1 && `${index + 1}/${count}`}
          <span className="grid size-8 place-items-center rounded-full bg-ivory/90 text-ink">
            <Maximize2 className="size-3.5" />
          </span>
        </span>
      </span>
    </button>
  );
}
