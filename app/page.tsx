import { Navigation } from "./components/Navigation";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Approach } from "./sections/Approach";
import { Services } from "./sections/Services";
import { SocialProof } from "./sections/SocialProof";
import { Pricing } from "./sections/Pricing";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0a0a0a]">
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Problem">
          <Problem />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Approach">
          <Approach />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Services">
          <Services />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Social Proof">
          <SocialProof />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Pricing">
          <Pricing />
        </ErrorBoundary>

        <ErrorBoundary sectionName="Contact">
          <Contact />
        </ErrorBoundary>
      </main>

      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </>
  );
}
