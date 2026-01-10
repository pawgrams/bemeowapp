import { useEffect, useState } from 'react';

export const usePreventRefresh = (preventRefresh: boolean) => {
    useEffect(() => {
        try{
            const handleBeforeUnload = (event: BeforeUnloadEvent) => {
                if (preventRefresh) {
                    event.preventDefault();
                    event.returnValue = '';
                }
            };
            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        } catch(e){}
    }, [preventRefresh]);
};
