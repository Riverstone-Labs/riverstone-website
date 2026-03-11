'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Error in ${this.props.sectionName || 'component'}:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h2>
            {this.props.sectionName && (
              <p className="text-sm text-[#71717a] mb-4">
                Error in {this.props.sectionName}
              </p>
            )}
            
            {/* Description */}
            <p className="text-[#a1a1aa] mb-6">
              We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
            </p>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                onClick={this.handleReset}
                className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-full transition-all duration-300"
              >
                Refresh Page
              </Button>
            </div>
            
            {/* Error details (dev only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 p-4 bg-[#1a1a24] rounded-lg border border-red-500/20 text-left overflow-auto">
                <p className="text-xs text-red-400 font-mono mb-2">Error details (dev only):</p>
                <pre className="text-xs text-[#71717a] font-mono whitespace-pre-wrap">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
