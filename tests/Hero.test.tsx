import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../app/sections/Hero';

// Mock window.matchMedia
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.ComponentProps<'button'>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: function ImageMock({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe('Hero', () => {
  it('renders the hero section with headline', () => {
    render(<Hero />);
    
    expect(screen.getByText("We don't do pilots.")).toBeInTheDocument();
    expect(screen.getByText("We do transformation.")).toBeInTheDocument();
  });

  it('renders the subheadline', () => {
    render(<Hero />);
    
    expect(screen.getByText(/Riverstone Labs helps ambitious businesses implement AI that actually works/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero />);
    
    expect(screen.getByRole('button', { name: /Start a conversation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /See how we work/i })).toBeInTheDocument();
  });
});
