import { Navigation } from "./components/Navigation";
import { Hero } from "./sections/Hero";
import { Problem } from "./sections/Problem";
import { Approach } from "./sections/Approach";
import { Services } from "./sections/Services";
import { SocialProof } from "./sections/SocialProof";
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
        
        <ErrorBoundary sectionName="CTA">
          <CTA />
        </ErrorBoundary>
      </main>
      
      <ErrorBoundary sectionName="Footer">
        <Footer />
      </ErrorBoundary>
    </>
  );
}
