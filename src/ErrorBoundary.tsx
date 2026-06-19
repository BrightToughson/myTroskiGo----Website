import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // You can also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          backgroundColor: '#030712',
          color: '#F9FAFB',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px'
          }}>
            😅
          </div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#FBBF24'
          }}>
            Oops! Something went wrong
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#9CA3AF',
            marginBottom: '32px',
            maxWidth: '500px',
            lineHeight: '1.6'
          }}>
            We encountered an unexpected error. Don't worry, this isn't your fault. 
            Please try refreshing the page or come back later.
          </p>
          
          {this.state.error && (
            <details style={{
              marginBottom: '24px',
              textAlign: 'left',
              backgroundColor: '#1F2937',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #374151',
              maxWidth: '600px',
              width: '100%'
            }}>
              <summary style={{
                cursor: 'pointer',
                color: '#FBBF24',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Error Details (for developers)
              </summary>
              <pre style={{
                fontSize: '0.85rem',
                color: '#E5E7EB',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
                fontFamily: 'monospace'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          
          <button
            onClick={this.handleReset}
            style={{
              backgroundColor: '#FBBF24',
              color: '#111827',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '32px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              marginRight: '12px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: 'transparent',
              color: '#FBBF24',
              border: '2px solid #FBBF24',
              padding: '14px 32px',
              borderRadius: '32px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(251, 191, 36, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Go Home
          </button>
          
          <p style={{
            marginTop: '32px',
            fontSize: '0.9rem',
            color: '#6B7280'
          }}>
            If this problem persists, please contact us at{' '}
            <a 
              href="mailto:support@mytroski-go.online" 
              style={{ color: '#FBBF24', textDecoration: 'none' }}
            >
              support@mytroski-go.online
            </a>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;