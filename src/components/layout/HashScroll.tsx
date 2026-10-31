"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Links para uma seção de outra página (ex.: /contato#agendar): a nova página
 * abre no topo e rola suavemente até a seção, como as âncoras da mesma página
 * (essas já rolam suave pelo `scroll-behavior` do CSS). Links para a própria
 * página voltam ao topo, também com suavidade.
 */
export function HashScroll() {
  const router = useRouter();
  const pathname = usePathname();
  const pending = useRef<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin) return;
      // Link para a própria página (ex.: logo ou "Início" na home): volta ao
      // topo com suavidade. O <Link> segue normal, para fechar o menu mobile.
      if (!url.hash && url.pathname === location.pathname && url.search === location.search) {
        requestAnimationFrame(() => window.scrollTo({ top: 0 }));
        return;
      }
      if (!url.hash || url.pathname === location.pathname) return;
      // Captura antes do <Link>: navega sem o salto automático e rola depois.
      e.preventDefault();
      pending.current = decodeURIComponent(url.hash.slice(1));
      router.push(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const id = pending.current;
    if (!id) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let tries = 0;
    const go = () => {
      const target = document.getElementById(id);
      if (!target && tries++ < 30) {
        frame = requestAnimationFrame(go);
        return;
      }
      pending.current = null;
      target?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
    };
    // Dois quadros: a página nova pinta no topo antes de a rolagem começar.
    frame = requestAnimationFrame(() => (frame = requestAnimationFrame(go)));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
