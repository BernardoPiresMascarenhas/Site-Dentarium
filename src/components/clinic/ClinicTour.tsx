"use client";

import { motion } from "motion/react";

import { tourChapters, tourImages } from "@/data/images";
import { PhotoTile, useLightbox } from "./Lightbox";

/**
 * Tour pela clínica em capítulos. Cada capítulo tem uma composição própria
 * (fotos de proporções diferentes, alinhamentos alternados) — não uma grade
 * de cards iguais. Um único lightbox percorre todas as fotos na ordem do tour.
 */
export function ClinicTour() {
  const { openAt, lightbox } = useLightbox(tourImages);
  const count = tourImages.length;
  const indexOf = (id: string) => tourImages.findIndex((img) => img.id === id);

  return (
    <>
      <ol className="space-y-16 md:space-y-20">
        {tourChapters.map((chapter, ci) => {
          const [main, second] = chapter.photos;
          const flip = ci % 2 === 1;
          return (
            <motion.li
              key={chapter.id}
              id={`tour-${chapter.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-end gap-8 md:grid-cols-12 md:gap-10"
            >
              {/* Texto do capítulo — sequência real, por isso numerado. */}
              <div
                className={`md:self-center ${
                  second ? `md:col-span-4 ${flip ? "md:order-2 md:col-start-9" : ""}` : "md:order-2 md:col-span-5 md:col-start-8"
                }`}
              >
                <p className="font-serif text-lg text-clay tabular-nums">
                  {String(ci + 1).padStart(2, "0")}
                  <span className="text-taupe"> / {String(tourChapters.length).padStart(2, "0")}</span>
                </p>
                <h3 className="display-md mt-3">{chapter.title}</h3>
                <p className="prose-body mt-3 max-w-[22rem]">{chapter.text}</p>
              </div>

              <div
                className={`grid gap-5 ${
                  second ? `md:col-span-8 ${flip ? "md:order-1" : ""} grid-cols-[1.35fr_1fr] items-end` : "md:order-1 md:col-span-6 md:col-start-1 md:justify-items-end"
                }`}
              >
                <PhotoTile
                  img={main}
                  index={indexOf(main.id)}
                  count={count}
                  onOpen={openAt}
                  arch={ci % 2 === 0}
                  sizes="(min-width: 768px) 460px, 56vw"
                  className={second ? "" : "max-w-[27rem]"}
                />
                {second && (
                  <PhotoTile
                    img={second}
                    index={indexOf(second.id)}
                    count={count}
                    onOpen={openAt}
                    sizes="(min-width: 768px) 340px, 40vw"
                    className="mb-8 md:mb-16"
                  />
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
      {lightbox}
    </>
  );
}
