import Link from "next/link";

import {
  clinic,
  demoNotice,
  fullAddress,
  mailtoHref,
  mapsUrl,
  telHref,
} from "@/data/clinic";
import { legalNav, mainNav, scheduleCta } from "@/data/navigation";
import { featuredTreatments } from "@/data/treatments";
import { Logo } from "@/components/ui/Logo";

/** Rodapé claro: a logomarca oficial tem símbolo semitransparente e só funciona sobre fundo claro. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-mist text-ink">
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="Dentarium — página inicial" className="-ml-1 inline-block rounded-sm">
              <Logo className="h-12 sm:h-14" />
            </Link>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-stone">
              Odontologia funcional e estética no bairro Serra, em Belo Horizonte.
            </p>
            <Link
              href={scheduleCta.href}
              className="link-underline mt-6 inline-block text-sm font-semibold text-graphite"
            >
              {scheduleCta.label}
            </Link>
          </div>

          <FooterColumn title="Navegação">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Tratamentos">
            {featuredTreatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/tratamentos/${t.slug}`} className="footer-link">
                  {t.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tratamentos" className="footer-link font-semibold text-ink">
                Todos os tratamentos
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Contato">
            <li>
              <a href={mapsUrl()} target="_blank" rel="noopener noreferrer" className="footer-link">
                {fullAddress()}
              </a>
            </li>
            {clinic.phones.value.map((p) => (
              <li key={p.e164}>
                <a href={telHref(p)} className="footer-link">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={mailtoHref()} className="footer-link break-all">
                {clinic.email.value}
              </a>
            </li>
            <li className="text-stone">
              {clinic.hours.value}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-[0.8rem] text-stone md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">{demoNotice} Fotografias e marca pertencem aos seus titulares.</p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.8rem] font-semibold text-clay">{title}</h2>
      <ul className="mt-5 space-y-3 text-[0.95rem]">{children}</ul>
    </div>
  );
}
