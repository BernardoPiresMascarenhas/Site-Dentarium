/**
 * Imagem de pré-visualização do link (WhatsApp, redes sociais, mensagens).
 *
 * Composição empilhada a partir da logomarca oficial (logo-dentarium-2.png):
 * símbolo em cima, nome em destaque e assinatura menor embaixo, cada parte
 * ampliada sem deformar (Lanczos, sem filtro de nitidez), tudo dentro do
 * quadrado central de 630 × 630 px (área segura para o recorte quadrado do
 * WhatsApp). Ao trocar a imagem, use um nome de arquivo novo (-v4, -v5…) para
 * escapar do cache de prévias do WhatsApp.
 */
export const shareImage = {
  url: "/og/dentarium-compartilhamento-v3.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Logomarca da Clínica Dentarium, odontologia funcional e estética.",
} as const;
