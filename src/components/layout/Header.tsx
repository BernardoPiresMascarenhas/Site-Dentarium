"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { mainNav, scheduleCta } from "@/data/navigation";
import { categories, treatmentsByCategory } from "@/data/treatments";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o painel ao trocar de rota (inclusive voltar/avançar do navegador).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
  }

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaRef.current?.querySelector<HTMLButtonElement>("button[aria-controls]")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [megaOpen]);

  const solid = scrolled || megaOpen;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-soft ${
        solid
          ? "border-b border-line bg-ivory/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" aria-label="Dentarium, página inicial" className="-ml-1 shrink-0 rounded-sm">
          <Logo className="h-11 sm:h-12 xl:h-[3.25rem]" priority />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.href === "/tratamentos") {
                return (
                  <li
                    key={item.href}
                    ref={megaRef}
                    className="relative flex items-center"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={navLinkClass(active)}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls="mega-tratamentos"
                      aria-label="Abrir lista de tratamentos"
                      onClick={() => setMegaOpen((o) => !o)}
                      className="-ml-2 grid size-8 place-items-center rounded-full text-stone transition-colors hover:text-clay"
                    >
                      <ChevronDown
                        aria-hidden
                        className={`size-4 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <MegaPanel open={megaOpen} onNavigate={() => setMegaOpen(false)} />
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={navLinkClass(active)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ButtonLink href={scheduleCta.href} className="min-h-11! px-5! text-sm whitespace-nowrap">
              {scheduleCta.label}
            </ButtonLink>
          </div>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function navLinkClass(active: boolean) {
  return `relative block rounded-full px-3.5 py-2 whitespace-nowrap text-[0.92rem] font-medium transition-colors duration-300 ${
    active ? "text-ink" : "text-ink/75 hover:text-ink"
  } after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:bg-clay after:transition-transform after:duration-500 ${
    active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
  }`;
}

function MegaPanel({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <div
      id="mega-tratamentos"
      hidden={!open}
      className="fixed inset-x-0 top-[var(--header-h)] border-y border-line bg-ivory shadow-[0_24px_48px_-32px_rgba(28,43,40,0.35)]"
    >
      <div className="container-site grid grid-cols-[1fr_2.6fr] gap-12 py-10">
        <div className="border-r border-line pr-10">
          <p className="display-md">Tratamentos</p>
          <p className="prose-body mt-3 text-[0.95rem]">
            Áreas atendidas pela clínica. A indicação de cada tratamento depende de avaliação
            individual.
          </p>
          <Link
            href="/tratamentos"
            onNavigate={onNavigate}
            className="link-underline mt-6 inline-block text-sm font-semibold text-graphite"
          >
            Ver todos os tratamentos
          </Link>
        </div>
        <ul className="grid grid-cols-3 gap-x-10 gap-y-8">
          {categories.map((cat) => (
            <li key={cat.id}>
              <p className="text-[0.8rem] font-semibold text-clay">{cat.name}</p>
              <ul className="mt-3 space-y-2">
                {treatmentsByCategory(cat.id).map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/tratamentos/${t.slug}`}
                      onNavigate={onNavigate}
                      className="text-[0.95rem] text-ink/85 transition-colors hover:text-clay"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
