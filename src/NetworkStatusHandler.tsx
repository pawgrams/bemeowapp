import SilentErrorBoundary from './SilentErrorBoundary'; 
import React, { useState, useEffect } from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const NetworkStatusHandler = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showMessage, setShowMessage] = useState(false);
    const [countdown, setCountdown] = useState(5);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    const handleShowMessage = () => {
        try {
            setShowMessage(true);
            setCountdown(5);
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(countdownInterval);
                        window.location.reload();
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        } catch (e) {}
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    useEffect(() => {
        try {
            const handleOnline = () => {
                setIsOnline(true);
                handleShowMessage();
            };
            const handleOffline = () => {
                setIsOnline(false);
            };
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        } catch (e) {}
    }, []);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    try {
        return (
            <SilentErrorBoundary>
                <div>
                    {!isOnline && (
                        <div className="network-status-info">
                            <p>No internet connection</p>
                            <p>🐈 Using Offline-Meowdus. 🐈</p>
                        </div>
                    )}
                    {showMessage && (
                        <div className="back-online-notification">
                            <p>🐱 Back Online 🐱</p>
                            <p>Reloading page in {countdown} seconds</p>
                        </div>
                    )}
                </div>
            </SilentErrorBoundary>
        );
    } catch (e) {}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
export default NetworkStatusHandler;
