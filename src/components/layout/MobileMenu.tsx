"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { clinic, telHref } from "@/data/clinic";
import { mainNav, scheduleCta } from "@/data/navigation";
import { buttonClass } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/**
 * Menu mobile em <dialog> modal: o navegador cuida do foco preso, do fundo
 * inerte e do Esc. Fecha ao navegar e ao trocar de rota.
 */
export function MobileMenu({ pathname }: { pathname: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Fecha ao trocar de rota (inclusive voltar/avançar do navegador).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Garante que o menu feche se a rota ficar oculta (Activity) com ele aberto.
  useLayoutEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const close = () => setOpen(false);
  const phone = clinic.phones.value[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-graphite hover:text-clay xl:hidden"
      >
        <Menu aria-hidden className="size-5" />
        <span className="sr-only">Abrir menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="mobile-menu m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-ivory p-0 text-ink backdrop:bg-deep/40 backdrop:backdrop-blur-[2px] xl:hidden"
      >
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <Logo className="-ml-1 h-10 sm:h-11" />
            <button
              type="button"
              onClick={close}
              autoFocus
              className="grid size-11 place-items-center rounded-full border border-ink/15 transition-colors hover:border-graphite hover:text-clay"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Fechar menu</span>
            </button>
          </div>

          <nav aria-label="Menu mobile" className="mt-6 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {mainNav.map((item, i) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.href} className="menu-item" style={{ "--i": i } as React.CSSProperties}>
                    <Link
                      href={item.href}
                      onNavigate={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-baseline justify-between border-b border-line py-4 font-serif text-[1.9rem] leading-none transition-colors ${
                        active ? "text-clay" : "text-ink hover:text-clay"
                      }`}
                    >
                      {item.label}
                      {active && <span className="font-sans text-xs font-semibold">Você está aqui</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8 space-y-3">
            <Link href={scheduleCta.href} onNavigate={close} className={buttonClass("primary", "w-full")}>
              {scheduleCta.label}
            </Link>
            <a href={telHref(phone)} className={buttonClass("secondary", "w-full")}>
              Ligar {phone.display}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
