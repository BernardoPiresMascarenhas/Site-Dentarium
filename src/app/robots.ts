import type { MetadataRoute } from "next";

/** Demonstração: nada deve ser indexado. Revisar ao publicar uma versão autorizada. */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
