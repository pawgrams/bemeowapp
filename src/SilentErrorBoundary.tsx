import React, { ReactNode } from 'react';

class SilentErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by SilentErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
export default SilentErrorBoundary;
