import { Hero } from "@/components/home/Hero";
import { Attributes } from "@/components/home/Attributes";
import { About } from "@/components/home/About";
import { TreatmentsPreview } from "@/components/home/TreatmentsPreview";
import { Technology } from "@/components/home/Technology";
import { Spaces } from "@/components/home/Spaces";
import { Founders } from "@/components/home/Founders";
import { Journey } from "@/components/home/Journey";
import { Reviews } from "@/components/home/Reviews";
import { Faq } from "@/components/home/Faq";
import { ContactBlock } from "@/components/clinic/ContactBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Attributes />
      <About />
      <TreatmentsPreview />
      <Technology />
      <Spaces />
      <Founders />
      <Journey />
      <Reviews />
      <Faq />
      <ContactBlock />
    </>
  );
}
