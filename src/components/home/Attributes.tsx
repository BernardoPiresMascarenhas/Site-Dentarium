import { attributes } from "@/data/content";

export function Attributes() {
  return (
    <section aria-label="Sobre o atendimento" className="border-y border-line bg-paper/60">
      <ul className="container-site grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {attributes.map((item, i) => (
          <li
            key={item.title}
            className={`py-7 sm:px-6 sm:py-9 ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${
              i >= 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""
            } ${i > 0 ? "lg:border-l lg:border-line" : ""} lg:first:pl-0`}
          >
            <h2 className="font-serif text-[1.25rem] leading-tight">{item.title}</h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-stone">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
