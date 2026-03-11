import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-[#1a1a24] border border-white/10 flex items-center justify-center mx-auto mb-8">
          <Search className="w-10 h-10 text-[#00d4ff]" />
        </div>
        
        {/* Title */}
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        
        {/* Description */}
        <p className="text-[#a1a1aa] mb-8 leading-relaxed">
          Sorry, we could not find the page you are looking for. It might have been moved, deleted, or never existed.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button
              className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] font-semibold px-8 py-6 rounded-full glow-blue transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/#cta">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full transition-all duration-300"
            >
              Contact Us
            </Button>
          </Link>
        </div>
        
        {/* Help text */}
        <p className="text-sm text-[#71717a] mt-8">
          If you believe this is an error, please{' '}
          <Link href="/#cta" className="text-[#00d4ff] hover:underline">
            contact our team
          </Link>.
        </p>
      </div>
    </div>
  );
}
