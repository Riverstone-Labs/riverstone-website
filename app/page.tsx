import { Navigation } from "./components/Navigation";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { CaseStudies } from "./sections/CaseStudies";
import { About } from "./sections/About";
import { Pricing } from "./sections/Pricing";
import { CTA } from "./sections/CTA";
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
        
        <ErrorBoundary sectionName="Services">
          <Services />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Case Studies">
          <CaseStudies />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="About">
          <About />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Pricing">
          <Pricing />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Contact">
          <CTA />
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </>
  );
}
