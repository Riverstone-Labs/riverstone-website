import { Navigation } from "../components/Navigation";
import { Footer } from "../sections/Footer";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lightbulb, 
  Wrench, 
  GraduationCap, 
  LineChart, 
  ArrowRight,
  CheckCircle,
  Search,
  FileText,
  Code,
  Users,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Lightbulb,
    title: "AI Strategy & Roadmap",
    description: "We audit your business, identify high-impact AI opportunities, and create a clear implementation roadmap with ROI projections.",
    features: [
      "Business process audit and analysis",
      "AI opportunity identification",
      "ROI projection and business case development",
      "Implementation roadmap with timelines",
      "Technology stack recommendations",
    ],
    deliverables: [
      "Comprehensive AI Strategy Document",
      "Prioritized Opportunity Roadmap",
      "ROI Projection Models",
      "Implementation Timeline",
    ],
  },
  {
    icon: Wrench,
    title: "AI Implementation & Integration",
    description: "We build and integrate AI systems into your existing workflows. No theoretical solutions — just working systems that deliver results.",
    features: [
      "Custom AI solution development",
      "Integration with existing systems",
      "Data pipeline and infrastructure setup",
      "Testing and quality assurance",
      "Production deployment and monitoring",
    ],
    deliverables: [
      "Working AI System",
      "System Integration Documentation",
      "Data Pipeline Architecture",
      "Production Monitoring Dashboard",
    ],
  },
  {
    icon: GraduationCap,
    title: "AI Training & Handover",
    description: "We train your team to use AI effectively, then hand over complete documentation and control. You own the capability.",
    features: [
      "Custom training programs for your team",
      "Hands-on workshops and sessions",
      "Documentation and knowledge transfer",
      "Ongoing support during transition",
      "Best practices and governance frameworks",
    ],
    deliverables: [
      "Training Materials and Documentation",
      "Team Certification",
      "Operations Manual",
      "Knowledge Base Access",
    ],
  },
  {
    icon: LineChart,
    title: "Ongoing AI Optimization",
    description: "We continuously monitor, optimize, and evolve your AI systems to maximize returns and adapt to your changing needs.",
    features: [
      "Performance monitoring and reporting",
      "Model retraining and improvement",
      "Feature enhancements and updates",
      "Cost optimization",
      "Strategic AI roadmap evolution",
    ],
    deliverables: [
      "Monthly Performance Reports",
      "Optimization Recommendations",
      "Updated Models and Systems",
      "Strategic Quarterly Reviews",
    ],
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Audit",
    description: "Deep dive into your business processes and identify AI opportunities.",
  },
  {
    icon: FileText,
    title: "Strategy",
    description: "Develop a tailored AI roadmap with clear ROI projections.",
  },
  {
    icon: Code,
    title: "Build",
    description: "Implement AI systems that integrate with your existing workflows.",
  },
  {
    icon: Users,
    title: "Train",
    description: "Upskill your team and hand over complete documentation.",
  },
  {
    icon: RefreshCw,
    title: "Optimize",
    description: "Continuously improve and evolve your AI systems.",
  },
];

export const metadata = {
  title: "Services | Riverstone Labs",
  description: "AI strategy, implementation, training, and ongoing optimization services for Australian businesses.",
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Services
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                End-to-End AI Implementation
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                From strategy to working systems — we deliver AI that drives real business results.
              </p>
              <div className="bg-[#111111] rounded-lg p-6 border border-gray-800 inline-block">
                <p className="text-gray-400 text-sm mb-2">Engagement Model</p>
                <p className="text-white text-lg font-semibold">
                  $10k+/month retainer + implementation project fees
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="bg-[#0a0a0a] border-gray-800 h-full">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center mb-6">
                        <service.icon className="w-6 h-6 text-[#3b82f6]" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {service.title}
                      </h2>
                      <p className="text-gray-400 mb-6">
                        {service.description}
                      </p>
                      
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-white mb-3">What&apos;s Included:</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-white mb-3">Deliverables:</h3>
                        <ul className="space-y-1">
                          {service.deliverables.map((deliverable, idx) => (
                            <li key={idx} className="text-sm text-gray-500">
                              • {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                How We Work
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                A proven process that takes you from initial audit to working AI systems.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#3b82f6]/50 to-transparent" />
                  )}
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Implement AI in Your Business?
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                Book a free strategy call to discuss your AI opportunities and see how we can help.
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
