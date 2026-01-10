import { useEffect } from 'react';
import MobileDetect from 'mobile-detect';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

export const useStaticPeriphery = () => {
    useEffect(() => {
        try{
            const md = new MobileDetect(window.navigator.userAgent);
            if (md.mobile()) {
                ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT)
                    .then(() => { })
                    .catch(() => { });
                return () => {
                    ScreenOrientation.unlock();
                };
            }
        } catch(e){}
    }, []);
};
