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

describe('Hero', () => {
  it('renders the hero section with new headline', () => {
    render(<Hero />);
    
    expect(screen.getByText("We don't do pilots.")).toBeInTheDocument();
    expect(screen.getByText("We do transformation.")).toBeInTheDocument();
  });

  it('renders the subheadline about boutique service', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Boutique AI implementation for enterprises ready to move beyond experiments/i)).toBeInTheDocument();
    expect(screen.getByText(/Only 10 clients per year/i)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Hero />);
    
    expect(screen.getByRole('button', { name: /Book a Consultation/i })).toBeInTheDocument();
  });
});
