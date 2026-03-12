import { Navigation } from "../components/Navigation";
import { Footer } from "../sections/Footer";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  Users, 
  MapPin, 
  Award,
  Briefcase,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const credentials = [
  {
    icon: Briefcase,
    title: "15+ Years Experience",
    description: "Building software and AI systems at scale",
  },
  {
    icon: Users,
    title: "Team Leadership",
    description: "Led engineering teams from startups to 50+ people",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Delivered AI implementations across multiple industries",
  },
  {
    icon: Award,
    title: "CTO Background",
    description: "Former CTO with hands-on technical expertise",
  },
];

const differentiators = [
  {
    icon: Target,
    title: "We Build, Not Just Advise",
    description: "Most consultants give you a PDF and leave. We stay until AI is actually working in your business, measuring results in revenue, efficiency, and growth.",
  },
  {
    icon: TrendingUp,
    title: "Results-Focused, Not Just Tech-Focused",
    description: "We measure ROI in actual business outcomes — revenue generated, costs reduced, time saved. Not just technical metrics that don't translate to your bottom line.",
  },
  {
    icon: MapPin,
    title: "Brisbane-Based, Australia-Wide",
    description: "Local expertise with national reach. We understand the Australian business landscape, regulations, and market conditions that affect your AI strategy.",
  },
];

export const metadata = {
  title: "About | Riverstone Labs",
  description: "Learn about Riverstone Labs — an AI consultancy founded by Warwick McIntosh to help Australian businesses implement AI that delivers real ROI.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <ScrollReveal>
                <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                  About Us
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  We Deliver What Others Promise
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                  Riverstone Labs was founded on a simple belief: AI should drive real business results, not just impressive demos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-8 py-6 text-base rounded-sm transition-all duration-300"
                    >
                      Work With Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-gray-700 text-white hover:bg-gray-800 px-8 py-6 text-base rounded-sm transition-all duration-300"
                    >
                      View Services
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <div className="relative">
                  <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-[#111111] border border-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-40 h-40 rounded-full bg-[#3b82f6]/20 mx-auto mb-6 flex items-center justify-center border border-[#3b82f6]/30">
                          <span className="text-5xl font-bold text-[#3b82f6]">WM</span>
                        </div>
                        <p className="text-white font-medium text-xl mb-2">Warwick McIntosh</p>
                        <p className="text-[#3b82f6] font-medium mb-1">Founder & CEO</p>
                        <p className="text-gray-500 text-sm">Riverstone Labs</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#3b82f6]/30 rounded-lg -z-10" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="max-w-3xl mx-auto">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Founder Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                From CTO to AI Implementation Partner
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-400 leading-relaxed mb-6">
                  After 15 years in technology leadership roles — building engineering teams, implementing AI systems, and leading digital transformation — I saw a consistent pattern. Companies were investing heavily in AI strategy and consulting, but very few were seeing actual results.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  The problem wasn't a lack of AI knowledge. It was a gap between strategy and implementation. Consultants would deliver impressive PowerPoints and theoretical frameworks, but when it came time to actually build and deploy working AI systems, the execution fell short.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  I founded Riverstone Labs to fill that gap. We're not here to give you advice and leave. We're here to build working AI systems that drive real ROI — and stay until your team can run them independently.
                </p>
                <blockquote className="border-l-4 border-[#3b82f6] pl-6 my-8">
                  <p className="text-white italic text-xl leading-relaxed">
                    "Most AI consultancies don't actually build anything. We're here to change that — one working system at a time."
                  </p>
                  <footer className="text-[#3b82f6] mt-2 not-italic">
                    — Warwick McIntosh, Founder
                  </footer>
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Experience
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Built on Real-World Expertise
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {credentials.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-[#111111] rounded-lg p-8 border border-gray-800 text-center h-full">
                    <div className="w-14 h-14 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Riverstone */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Why Riverstone Labs?
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentiators.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-[#0a0a0a] rounded-lg p-8 border border-gray-800 h-full">
                    <div className="w-12 h-12 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center mb-6">
                      <item.icon className="w-6 h-6 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Vision
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                AI for Every Australian Business
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                We believe every Australian business deserves access to AI that actually works. Not buzzwords, not theoretical frameworks — just working systems that drive revenue, reduce costs, and create competitive advantage.
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Our goal is simple: help Australian businesses leverage AI for real ROI. No fluff, no complexity — just results.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can help you implement AI that delivers real results for your business.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-10 py-6 text-base rounded-sm transition-all duration-300"
                >
                  Book Your AI Strategy Call
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
