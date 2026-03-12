"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Zap, 
  RefreshCw, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle,
  Code,
  Database,
  LineChart,
  Users
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const services = [
  {
    id: "strategy",
    icon: Target,
    title: "AI Strategy & Roadmap",
    shortDesc: "Identify high-impact AI opportunities and create a clear path to ROI.",
    fullDescription: "We conduct a comprehensive assessment of your business processes, data infrastructure, and competitive landscape to identify where AI can deliver the highest returns. Our strategic roadmap prioritizes initiatives by impact and feasibility, giving you a clear 12-18 month plan.",
    deliverables: [
      "Business process analysis & AI opportunity mapping",
      "Data readiness assessment",
      "ROI modeling & business case development",
      "12-18 month implementation roadmap",
      "Technology stack recommendations",
      "Risk assessment & mitigation strategies"
    ],
    timeline: "4-6 weeks",
    investment: "From $15,000",
    color: "#00D4AA"
  },
  {
    id: "implementation",
    icon: Zap,
    title: "AI Implementation Projects",
    shortDesc: "End-to-end delivery of custom AI solutions from concept to production.",
    fullDescription: "We design, build, and deploy custom AI solutions tailored to your specific business needs. Our implementation process emphasizes rapid prototyping, continuous testing, and seamless integration with your existing systems to minimize disruption.",
    deliverables: [
      "Custom AI/ML model development",
      "System architecture & API design",
      "Integration with existing workflows",
      "Production deployment & monitoring setup",
      "Performance optimization",
      "Documentation & knowledge transfer"
    ],
    timeline: "8-16 weeks",
    investment: "From $50,000",
    color: "#7C3AED"
  },
  {
    id: "retainer",
    icon: RefreshCw,
    title: "AI Retainer & Optimization",
    shortDesc: "Ongoing partnership for continuous improvement and support.",
    fullDescription: "Transform AI from a one-time project into a competitive advantage. Our retainer service provides continuous monitoring, optimization, and evolution of your AI systems to ensure sustained performance and growing returns over time.",
    deliverables: [
      "24/7 system monitoring & alerting",
      "Monthly performance reports",
      "Continuous model improvement",
      "Quarterly strategy reviews",
      "Priority support & troubleshooting",
      "Access to new AI capabilities"
    ],
    timeline: "Ongoing",
    investment: "From $10,000/month",
    color: "#00D4AA"
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "AI Training & Enablement",
    shortDesc: "Empower your team to own and extend AI capabilities.",
    fullDescription: "Knowledge transfer is critical for long-term success. We provide hands-on training programs that build internal AI expertise within your team, from executive education on AI strategy to technical training for your developers.",
    deliverables: [
      "Executive AI strategy workshops",
      "Hands-on technical training",
      "Custom documentation & playbooks",
      "Process integration guidance",
      "Mentorship & ongoing support",
      "Team capability assessment"
    ],
    timeline: "2-8 weeks",
    investment: "From $8,000",
    color: "#7C3AED"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your business, processes, and data to understand your unique challenges and opportunities."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Develop a tailored AI roadmap with clear ROI projections and prioritized initiatives."
  },
  {
    number: "03",
    title: "Implementation",
    description: "Build and deploy solutions using agile methodologies with continuous feedback loops."
  },
  {
    number: "04",
    title: "Optimization",
    description: "Monitor performance, gather insights, and continuously improve system effectiveness."
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E]/50 to-[#0A0A0F]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-[#A0A0B0] text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              End-to-end AI solutions designed for businesses that want results, not experiments. 
              From strategy to implementation to ongoing optimization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon className="w-8 h-8" style={{ color: service.color }} />
                  </div>
                  <h2 
                    className="text-3xl lg:text-4xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[#A0A0B0] text-lg mb-8 leading-relaxed">
                    {service.fullDescription}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#12121A] border border-[#2A2A3E] p-4 rounded-xl">
                      <div className="text-[#A0A0B0] text-sm mb-1">Timeline</div>
                      <div className="text-white font-semibold">{service.timeline}</div>
                    </div>
                    <div className="bg-[#12121A] border border-[#2A2A3E] p-4 rounded-xl">
                      <div className="text-[#A0A0B0] text-sm mb-1">Investment</div>
                      <div className="text-white font-semibold">{service.investment}</div>
                    </div>
                  </div>
                  
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#00D4AA] hover:bg-[#00B4D8] text-[#0A0A0F] px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,212,170,0.4)]"
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-[#12121A] border border-[#2A2A3E] rounded-2xl p-8">
                    <h3 className="text-xl font-semibold mb-6 text-white">What&apos;s Included</h3>
                    <ul className="space-y-4">
                      {service.deliverables.map((deliverable, dIndex) => (
                        <li key={dIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                          <span className="text-[#A0A0B0]">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 lg:py-32 bg-[#12121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-[#A0A0B0] text-lg max-w-2xl mx-auto">
              A proven methodology that delivers results while minimizing risk.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                <div className="text-6xl font-bold text-[#2A2A3E] mb-4" style={{ fontFamily: "var(--font-sora)" }}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#A0A0B0]">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-[#2A2A3E] to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1A1A2E] to-[#12121A] border border-[#2A2A3E] rounded-3xl p-12 lg:p-16 text-center"
          >
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-[#A0A0B0] text-lg mb-8 max-w-2xl mx-auto">
              Book a free 30-minute consultation to discuss which services are right for your business.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#00D4AA] hover:bg-[#00B4D8] text-[#0A0A0F] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.4)]"
            >
              Schedule Free Consultation
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0F] border-t border-[#2A2A3E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-sora)" }}>
                <span className="text-white">RIVERSTONE</span>
                <span className="text-[#00D4AA]"> LABS</span>
              </span>
            </Link>
            <p className="text-[#A0A0B0] text-sm">
              © 2026 Riverstone Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
