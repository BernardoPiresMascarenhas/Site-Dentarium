import { Star } from "lucide-react";

/**
 * Classificação em estrelas. Não renderiza nada quando a nota não foi
 * confirmada na avaliação original — nunca exibe uma nota presumida.
 */
export function Stars({ rating }: { rating: number | null }) {
  if (rating === null) return null;
  const value = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Nota ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          strokeWidth={1.5}
          className={`size-3.5 ${i < value ? "fill-clay/80 text-clay/80" : "text-taupe-soft"}`}
        />
      ))}
    </span>
  );
}
