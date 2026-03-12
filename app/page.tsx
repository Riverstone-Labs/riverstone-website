"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin,
  Code,
  TrendingUp,
  Eye,
  Zap,
  Target,
  RefreshCw,
  GraduationCap,
  Linkedin,
  Quote
} from "lucide-react";
import Navigation from "@/components/Navigation";
import HeroBackground from "@/components/HeroBackground";
import Link from "next/link";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().min(2, "Company name is required"),
  revenue: z.string().optional(),
  challenge: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Animation variants
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

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// Value proposition data
const valueProps = [
  {
    icon: Code,
    title: "We Build What We Sell",
    description: "Our 'dark software factory' uses AI agents to build the products we deliver. We're not just consultants—we're builders who eat our own cooking.",
    color: "#00D4AA"
  },
  {
    icon: TrendingUp,
    title: "ROI-First Approach",
    description: "Every project starts with defining measurable outcomes. If we can't show you the ROI path, we won't take the project. No AI theatre, only real results.",
    color: "#7C3AED"
  },
  {
    icon: Eye,
    title: "Stealth Execution",
    description: "Work quietly and efficiently until you're ready to announce. We understand the value of strategic silence and delivering before the hype.",
    color: "#00D4AA"
  }
];

// Services data
const services = [
  {
    icon: Target,
    title: "AI Strategy & Roadmap",
    description: "Comprehensive assessment of your business to identify high-impact AI opportunities. We create a prioritized roadmap with clear ROI projections and implementation timelines.",
    features: ["Business process analysis", "AI opportunity mapping", "ROI modeling", "Implementation roadmap"]
  },
  {
    icon: Zap,
    title: "AI Implementation Projects",
    description: "End-to-end delivery of custom AI solutions. From concept to production deployment, we build systems that integrate seamlessly with your existing workflows.",
    features: ["Custom AI development", "System integration", "Production deployment", "Performance monitoring"]
  },
  {
    icon: RefreshCw,
    title: "AI Retainer & Optimization",
    description: "Ongoing partnership for continuous improvement. We monitor, optimize, and evolve your AI systems to ensure sustained performance and growing returns.",
    features: ["24/7 system monitoring", "Continuous optimization", "Model retraining", "Quarterly strategy reviews"]
  },
  {
    icon: GraduationCap,
    title: "AI Training & Enablement",
    description: "Empower your team to own and extend AI capabilities. We provide hands-on training that transfers knowledge and builds internal expertise.",
    features: ["Team workshops", "Technical training", "Process integration", "Knowledge documentation"]
  }
];

// Testimonials data
const testimonials = [
  {
    quote: "Riverstone Labs didn't just talk about AI—they delivered a system that reduced our customer service response time by 60% within the first month.",
    author: "Sarah Chen",
    role: "COO, TechVenture AU",
    location: "Sydney"
  },
  {
    quote: "Finally, an AI consultancy that understands business outcomes. They identified opportunities we didn't know existed and delivered measurable ROI.",
    author: "Michael Torres",
    role: "CEO, GrowthForce",
    location: "Brisbane"
  },
  {
    quote: "The stealth approach was exactly what we needed. They built and deployed our AI systems without disrupting our operations or alerting competitors.",
    author: "Emma Wilson",
    role: "Founder, RetailMax",
    location: "Melbourne"
  }
];

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              AI That Actually{" "}
              <span className="text-gradient">Works</span>.
              <br />
              Revenue That Actually{" "}
              <span className="text-gradient">Grows</span>.
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-[#A0A0B0] mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            We implement AI solutions that deliver measurable ROI. Not chatbots that nobody uses. 
            Not AI theatre. Real business outcomes for Australian SMBs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="bg-[#00D4AA] hover:bg-[#00B4D8] text-[#0A0A0F] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.4)] flex items-center justify-center gap-2 animate-pulse-glow"
            >
              Schedule Free Consultation
              <ArrowRight size={20} />
            </a>
            <a
              href="#services"
              className="border border-[#2A2A3E] hover:border-[#00D4AA] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              See Our Work
              <ChevronRight size={20} />
            </a>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[#A0A0B0] mt-6 text-sm"
          >
            Brisbane-based · Serving Australia · $10k+/month retainers
          </motion.p>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#00D4AA]/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-[#00D4AA] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 lg:py-32 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Why We&apos;re <span className="text-gradient">Different</span>
            </h2>
            <p className="text-[#A0A0B0] text-lg max-w-2xl mx-auto">
              While others sell AI hype, we deliver working systems that drive real business results.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-[#12121A] border border-[#2A2A3E] p-8 rounded-2xl card-hover group"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                  style={{ backgroundColor: `${prop.color}15` }}
                >
                  <prop.icon className="w-7 h-7" style={{ color: prop.color }} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white" style={{ fontFamily: "var(--font-sora)" }}>
                  {prop.title}
                </h3>
                <p className="text-[#A0A0B0] leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32 bg-[#12121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-[#A0A0B0] text-lg max-w-2xl mx-auto">
              End-to-end AI solutions designed for businesses that want results, not experiments.
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-[#0A0A0F] border border-[#2A2A3E] p-8 rounded-2xl card-hover group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00D4AA]/20 transition-colors">
                    <service.icon className="w-6 h-6 text-[#00D4AA]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sora)" }}>
                      {service.title}
                    </h3>
                    <p className="text-[#A0A0B0] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 ml-16">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm text-[#A0A0B0]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 lg:py-32 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Trusted by <span className="text-gradient">Australian Businesses</span>
            </h2>
            <p className="text-[#A0A0B0] text-lg max-w-2xl mx-auto">
              Results speak louder than promises. Here&apos;s what our clients say.
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          >
            {[
              { value: "90+", label: "Days to ROI" },
              { value: "100%", label: "Australian Owned" },
              { value: "$10k+", label: "Monthly Retainers" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-[#00D4AA] mb-2" style={{ fontFamily: "var(--font-sora)" }}>
                  {stat.value}
                </div>
                <div className="text-[#A0A0B0]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Testimonials */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-[#12121A] border border-[#2A2A3E] p-8 rounded-2xl relative"
              >
                <Quote className="w-10 h-10 text-[#00D4AA]/20 absolute top-6 right-6" />
                <p className="text-[#A0A0B0] leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-[#00D4AA] text-sm">{testimonial.role}</div>
                  <div className="text-[#A0A0B0] text-sm">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="contact" className="py-24 lg:py-32 bg-[#12121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Ready to Transform Your Business with <span className="text-gradient">AI</span>?
              </h2>
              <p className="text-[#A0A0B0] text-lg">
                Book a free 30-minute consultation. No obligation. We&apos;ll assess your opportunities and outline potential ROI.
              </p>
            </div>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0A0A0F] border border-[#00D4AA]/30 p-12 rounded-2xl text-center max-w-2xl mx-auto"
              >
                <div className="w-16 h-16 bg-[#00D4AA]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#00D4AA]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-sora)" }}>
                  Thank You!
                </h3>
                <p className="text-[#A0A0B0]">
                  We&apos;ve received your inquiry and will be in touch within 24 hours to schedule your consultation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-[#0A0A0F] border border-[#2A2A3E] p-8 lg:p-12 rounded-2xl max-w-2xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className={`w-full px-4 py-3 rounded-lg bg-[#12121A] border ${errors.name ? "border-red-500" : "border-[#2A2A3E]"} focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA] outline-none transition-all text-white placeholder-[#A0A0B0]/50`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email")}
                      className={`w-full px-4 py-3 rounded-lg bg-[#12121A] border ${errors.email ? "border-red-500" : "border-[#2A2A3E]"} focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA] outline-none transition-all text-white placeholder-[#A0A0B0]/50`}
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register("company")}
                      className={`w-full px-4 py-3 rounded-lg bg-[#12121A] border ${errors.company ? "border-red-500" : "border-[#2A2A3E]"} focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA] outline-none transition-all text-white placeholder-[#A0A0B0]/50`}
                      placeholder="Your company"
                    />
                    {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="revenue" className="block text-sm font-medium text-white mb-2">
                      Revenue Range
                    </label>
                    <select
                      id="revenue"
                      {...register("revenue")}
                      className="w-full px-4 py-3 rounded-lg bg-[#12121A] border border-[#2A2A3E] focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA] outline-none transition-all text-white"
                    >
                      <option value="">Select range</option>
                      <option value="<500k">&lt; $500k</option>
                      <option value="500k-2m">$500k - $2M</option>
                      <option value="2m-10m">$2M - $10M</option>
                      <option value="10m+">$10M+</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="challenge" className="block text-sm font-medium text-white mb-2">
                      Primary Challenge
                    </label>
                    <select
                      id="challenge"
                      {...register("challenge")}
                      className="w-full px-4 py-3 rounded-lg bg-[#12121A] border border-[#2A2A3E] focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA] outline-none transition-all text-white"
                    >
                      <option value="">Select challenge</option>
                      <option value="dont-know">Don&apos;t know where to start</option>
                      <option value="failed">Had failed AI projects</option>
                      <option value="scale">Need to scale existing AI</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message <span className="text-[#A0A0B0]">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[#12121A] border border-[#2A2A3E] focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA] outline-none transition-all resize-none text-white placeholder-[#A0A0B0]/50"
                      placeholder="Tell us about your goals..."
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-8 bg-[#00D4AA] hover:bg-[#00B4D8] text-[#0A0A0F] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.4)] flex items-center justify-center gap-2"
                >
                  Book Free Consultation
                  <ChevronRight size={20} />
                </button>
                
                <p className="text-center text-[#A0A0B0] text-sm mt-4">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0F] border-t border-[#2A2A3E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-sora)" }}>
                  <span className="text-white">RIVERSTONE</span>
                  <span className="text-[#00D4AA]"> LABS</span>
                </span>
              </Link>
              <p className="text-[#A0A0B0] mb-6 max-w-md">
                AI implementation consultancy helping Australian businesses turn AI hype into real ROI. Based in Brisbane, serving SMBs nationwide.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#A0A0B0]">
                  <Mail size={18} className="text-[#00D4AA]" />
                  <span>hello@riverstonelabs.com.au</span>
                </div>
                <div className="flex items-center gap-3 text-[#A0A0B0]">
                  <MapPin size={18} className="text-[#00D4AA]" />
                  <span>Brisbane, Australia</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {["AI Strategy", "Implementation", "AI Retainer", "Training"].map((item) => (
                  <li key={item}>
                    <a href="#services" className="text-[#A0A0B0] hover:text-[#00D4AA] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Case Studies", "Contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-[#A0A0B0] hover:text-[#00D4AA] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-[#A0A0B0] hover:text-[#00D4AA] transition-colors flex items-center gap-2">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#2A2A3E] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A0A0B0] text-sm">
              © 2026 Riverstone Labs. All rights reserved.
            </p>
            <p className="text-[#A0A0B0]/60 text-sm">
              Australian-owned and operated.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
