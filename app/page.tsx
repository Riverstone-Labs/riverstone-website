import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Approach } from "./sections/Approach";
import { Services } from "./sections/Services";
import { Proof } from "./sections/Proof";
import { About } from "./sections/About";
import { Content } from "./sections/Content";
import { CTA } from "./sections/CTA";
import { Footer } from "./sections/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <ErrorBoundary sectionName="Hero">
        <Hero />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Problem Statement">
        <Problem />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Our Approach">
        <Approach />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Services">
        <Services />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Proof of Value">
        <Proof />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="About">
        <About />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Content">
        <Content />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Contact Form">
        <CTA />
      </ErrorBoundary>
      
      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </main>
  );
}
