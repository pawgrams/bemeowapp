import { useEffect } from 'react';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useMobileHover = () => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        try{
            const hoverElements = document.querySelectorAll('*');
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            hoverElements.forEach(element => {
                const hoverStyle = window.getComputedStyle(element, ':hover');
                if (hoverStyle && hoverStyle.length > 0) {
                    try{
                        element.addEventListener('touchstart', () => {
                            element.classList.add('js-hover');
                            setTimeout(() => {
                                element.classList.remove('js-hover');
                            }, 20);
                        });
                    } catch(e){}
                }
            });
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            return () => {
                //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                hoverElements.forEach(element => {
                    try{
                        element.removeEventListener('touchstart', () => {
                            element.classList.add('js-hover');
                            setTimeout(() => {
                                element.classList.remove('js-hover');
                            }, 20);
                        });
                    } catch(e){}
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                });
            };
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        } catch(e){}
    }, []);
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
};
