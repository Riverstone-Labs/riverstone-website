import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Approach } from "./sections/Approach";
import { Services } from "./sections/Services";
import { Proof } from "./sections/Proof";
import { About } from "./sections/About";
import { Content } from "./sections/Content";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Hero />
      <Problem />
      <Approach />
      <Services />
      <Proof />
      <About />
      <Content />
      <CTA />
      <Footer />
    </main>
  );
}
