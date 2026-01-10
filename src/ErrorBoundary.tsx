import React, { ReactNode } from 'react';
import Slideshow from './components/Slideshow';

interface ErrorBoundaryProps {
    children: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) { 
        super(props);
        this.state = { hasError: false };  
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        //console.error("Error caught by Error Boundary:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h3 style={{width: '500px', left: '50px', right: '60%', marginTop: '50px', fontSize: '20px', position: 'absolute', color: '#white'}}>Meowch 😿 Something went wrong.</h3>
                    <button onClick={() => window.location.reload()} style={{width: '150px', height: '30px', left: '50px', right: '60%', marginTop: '90px', fontSize: '15px', position: 'absolute', backgroundColor: '#0B998B', color: 'white', fontWeight: '700', border: 'none'}}>Reload here</button>
                    <Slideshow />
                </div>
            );
        }
        return this.props.children; 
    }
}
export default ErrorBoundary;
