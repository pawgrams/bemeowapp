import { useEffect, RefObject } from 'react';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useInputCursor = (inputRef: RefObject<HTMLInputElement | null>) => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        try{
            const value = e.target.value;
            const dotIndex = value.indexOf('.');

            if (dotIndex > 0) {
                e.target.setSelectionRange(0, dotIndex);
            }
        } catch(e){}
    };
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const handleClick = (e: any) => {
        try{
            const value = e.target.value;
            e.currentTarget.setSelectionRange(0, value.length);
    } catch(e){}
    };
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        try{
            const input = inputRef.current;
            if (input) {
                input.addEventListener('click', handleClick);
            }
            return () => {
                if (input) {
                    input.removeEventListener('click', handleClick);
                }
            };
        } catch(e){}
    }, [inputRef]);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return {handleFocus,};
};
