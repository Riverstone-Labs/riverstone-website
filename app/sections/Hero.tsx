"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, ArrowRight } from "lucide-react";

// Hook to detect reduced motion preference without causing setState in effect
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false // Server fallback
  );
}

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {prefersReducedMotion ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster="/images/hero-poster.jpg"
              preload="none"
              className="w-full h-full object-cover hidden md:block"
            >
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            
            {/* Fallback static image for mobile */}
            <div 
              className="md:hidden absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-poster.jpg')" }}
            />
          </>
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Pause/Play Control - visible on hover/focus */}
      {!prefersReducedMotion && (
        <button
          onClick={togglePlay}
          className="absolute bottom-24 right-4 md:right-8 z-20 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">
            AI That Works.
            <br />
            <span className="text-[#3b82f6]">Results That Scale.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            We implement AI that delivers real ROI — strategy, build, and handover. For businesses ready to actually use AI to grow.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold px-10 py-6 text-base rounded-sm transition-all duration-300"
            >
              Book Your AI Strategy Call
            </Button>
            
            <button
              onClick={() => scrollToSection("proof")}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium underline underline-offset-4 flex items-center gap-2"
            >
              See Our Work
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
