"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #0d1b2a 100%)'
      }}
    >
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      {/* Animated background grid */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-sm font-medium">Now Accepting New Clients</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight" style={{ color: '#ffffff' }}>
            AI That Works.
            <br />
            <span style={{ color: '#3b82f6' }}>Results That Scale.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: '#a1a1aa' }}>
            We implement AI that delivers real ROI — strategy, build, and handover. For businesses ready to actually use AI to grow.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-6 text-base rounded-lg transition-all duration-300"
            >
              Book Your AI Strategy Call
            </Button>
            
            <button
              onClick={() => scrollToSection("social-proof")}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium underline underline-offset-4 flex items-center gap-2"
            >
              See Our Work
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient for section transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)'
        }}
      />
    </section>
  );
}
