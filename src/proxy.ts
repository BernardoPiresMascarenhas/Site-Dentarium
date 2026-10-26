import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { treatments } from "@/data/treatments";

const known = new Set(treatments.map((t) => t.slug));

/**
 * Com Cache Components o shell da rota é transmitido antes de os params
 * serem lidos, então `notFound()` em /tratamentos/[slug] renderizaria a
 * página 404 com status 200. Aqui o slug desconhecido é desviado antes da
 * renderização para uma rota inexistente, que responde 404 de verdade.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/pagina-nao-encontrada", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/tratamentos/:slug",
};
