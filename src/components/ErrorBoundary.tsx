import React from 'react';
import { Link } from 'react-router-dom';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to console for now — could be replaced with remote logging
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
          <h2 className="text-2xl font-extrabold mb-2 text-[#1c1d1f]">Something went wrong</h2>
          <p className="text-[#6a6f73] mb-6">An unexpected error occurred. Try reloading the page or go back home.</p>
          <div className="flex gap-3">
            <button onClick={() => window.location.reload()} className="btn-primary">Reload</button>
            <Link to="/" className="btn-secondary">Go home</Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
