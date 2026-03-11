import { Navigation } from "./components/Navigation";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Approach } from "./sections/Approach";
import { Proof } from "./sections/Proof";
import { About } from "./sections/About";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#1a1a1a]">
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Problem Statement">
          <Problem />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Our Approach">
          <Approach />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Proof of Value">
          <Proof />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="About">
          <About />
        </ErrorBoundary>
        
        <ErrorBoundary sectionName="Contact Form">
          <CTA />
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </>
  );
}
