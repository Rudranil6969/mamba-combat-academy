import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { CTA, Hero, IntroVideo, LogoMarquee, Philosophy, Schedule, WhoWeServe } from "@/components/site/Sections";
import { Contact, Footer } from "@/components/site/Contact";
import hero from "@/assets/hero.webp";
import heroMobile from "@/assets/hero-mobile.webp";

const TITLE = "Mamba Combat Academy | Be Better Every Single Day";
const DESC =
  "Mamba Combat Academy in Bengaluru helps kids, students, adults and seniors build functional strength, learn martial arts and become better every single day.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroMobile, media: "(max-width: 640px)", fetchPriority: "high" },
      { rel: "preload", as: "image", href: hero, media: "(min-width: 641px)", fetchPriority: "high" },
    ],
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <IntroVideo />
        <Philosophy />
        <WhoWeServe />
        <Schedule />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
