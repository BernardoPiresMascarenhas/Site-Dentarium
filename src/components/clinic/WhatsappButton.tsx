import { MessageCircle } from "lucide-react";

import { WHATSAPP_GENERAL_MESSAGE, whatsappHref } from "@/data/clinic";
import { ButtonAnchor } from "@/components/ui/Button";

type Variant = "primary" | "secondary" | "light" | "outline-light";

/**
 * Abre uma conversa no WhatsApp com a mensagem já escrita. O visitante revisa
 * e envia pelo próprio aplicativo: nada é agendado ou enviado por este site.
 */
export function WhatsappButton({
  message = WHATSAPP_GENERAL_MESSAGE,
  variant = "secondary",
  className = "",
  children = "Conversar pelo WhatsApp",
}: {
  message?: string;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ButtonAnchor
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={className}
    >
      <MessageCircle aria-hidden strokeWidth={1.75} className="size-[1.1rem]" />
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </ButtonAnchor>
  );
}
