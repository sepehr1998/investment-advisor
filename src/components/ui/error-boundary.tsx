import { Component, type ReactNode } from 'react';
import { ErrorState } from './error-state';
import { RELOAD_PAGE_BUTTON } from '../../lib/constants';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { hasError: true, errorMessage: message };
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          message={this.state.errorMessage}
          onRetry={() => window.location.reload()}
          retryLabel={RELOAD_PAGE_BUTTON}
        />
      );
    }
    return this.props.children;
  }
}
