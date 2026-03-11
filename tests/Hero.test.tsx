import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../app/sections/Hero';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn(),
  }),
}));

// Mock ParticleNetwork
vi.mock('../app/components/ParticleNetwork', () => ({
  ParticleNetwork: () => <div data-testid="particle-network">Particle Network</div>,
}));

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);
    
    expect(screen.getByText('AI Implementation')).toBeInTheDocument();
    expect(screen.getByText('That Actually Works')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    
    expect(screen.getByRole('button', { name: /Book Free Assessment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /See Our Approach/i })).toBeInTheDocument();
  });

  it('renders stats', () => {
    render(<Hero />);
    
    expect(screen.getByText('50+')).toBeInTheDocument();
    expect(screen.getByText('AI Systems Deployed')).toBeInTheDocument();
  });
});
