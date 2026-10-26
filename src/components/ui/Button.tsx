import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-soft active:translate-y-px";

/**
 * Hierarquia:
 * - primary: ação principal (agendar) — grafite, hover na argila da marca.
 * - secondary: ações de apoio — contorno taupe, hover bege-acinzentado.
 * - ghost: links de texto — argila com sublinhado.
 * - light / outline-light: equivalentes sobre seções escuras.
 */
const variants: Record<Variant, string> = {
  primary:
    "bg-graphite text-ivory shadow-[0_12px_24px_-16px_rgba(63,66,63,0.8)] hover:bg-graphite-hover hover:shadow-[0_14px_28px_-16px_rgba(122,92,79,0.85)]",
  secondary: "border border-taupe-soft bg-paper/50 text-ink hover:border-taupe-line hover:bg-taupe-tint",
  ghost: "min-h-0! px-0! text-clay underline decoration-taupe-soft underline-offset-[6px] hover:decoration-clay",
  light: "bg-on-deep text-deep hover:bg-white",
  "outline-light": "border border-white/30 text-on-deep hover:border-on-deep hover:bg-white/5",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

type ExternalButtonProps = ComponentProps<"a"> & { variant?: Variant };

/** Para `tel:`, `mailto:` e links externos. */
export function ButtonAnchor({ variant = "primary", className = "", ...props }: ExternalButtonProps) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
