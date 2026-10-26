import {
  AlignHorizontalDistributeCenter,
  Baby,
  Layers,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import type { CategoryId } from "@/data/treatments";

/** Um ícone linear por área — diferencia os cards sem ilustrações de dentes. */
const icons: Record<CategoryId, LucideIcon> = {
  prevencao: ShieldCheck,
  estetica: Sparkles,
  reabilitacao: Layers,
  funcao: AlignHorizontalDistributeCenter,
  clinica: Stethoscope,
  criancas: Baby,
};

export function CategoryIcon({ category, className = "size-[1.15rem]" }: { category: CategoryId; className?: string }) {
  const Icon = icons[category];
  return <Icon aria-hidden strokeWidth={1.5} className={className} />;
}
