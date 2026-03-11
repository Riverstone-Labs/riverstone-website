"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number;
}

interface ParticleNetworkProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRepulsionDistance?: number;
}

export function ParticleNetwork({
  particleCount: maxParticleCount = 80,
  connectionDistance = 120,
  mouseRepulsionDistance = 100,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const initParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(maxParticleCount, Math.floor((width * height) / 15000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        connections: 0,
      });
    }

    particlesRef.current = particles;
  }, [maxParticleCount]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((particle) => {
      // Mouse repulsion
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseRepulsionDistance) {
        const force = (100 - dist) / 100;
        particle.vx += (dx / dist) * force * 0.5;
        particle.vy += (dy / dist) * force * 0.5;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Keep in bounds
      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));

      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Reset connections
      particle.connections = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance && particles[i].connections < 3 && particles[j].connections < 3) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - dist / connectionDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          particles[i].connections++;
          particles[j].connections++;
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [connectionDistance, mouseRepulsionDistance]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [initParticles, animate, prefersReducedMotion]);

  // Render static particles for reduced motion
  useEffect(() => {
    if (!prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Draw static particles without animation
    initParticles(width, height);
    const particles = particlesRef.current;

    ctx.clearRect(0, 0, width, height);

    // Draw static particles
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 212, 255, 0.6)";
      ctx.fill();
    });

    // Draw static connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - dist / connectionDistance)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }, [prefersReducedMotion, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent", willChange: "transform" }}
      aria-label="Decorative particle animation"
      role="img"
    />
  );
}
