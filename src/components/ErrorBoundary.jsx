import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Widget ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[150px] flex flex-col items-center justify-center p-6 glass-card rounded-xl border border-red-500/30 bg-red-500/5">
          <span className="material-symbols-outlined text-red-500 text-3xl mb-2">error</span>
          <h3 className="text-red-400 font-bold mb-1 text-center">Widget Crashed</h3>
          <p className="text-slate-400 text-xs text-center max-w-[200px] truncate" title={this.state.error?.message}>
            {this.state.error?.message || "An unexpected rendering error occurred."}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold transition-colors border border-red-500/30"
          >
            Retry Render
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
