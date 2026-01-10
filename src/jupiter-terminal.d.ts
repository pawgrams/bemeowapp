declare global {
    interface Window {
        Jupiter: {
            init: (options: any) => void;
            syncProps?: (props: any) => void;
            close?: () => void;
            resume?: () => void;
        };
    }
}
export {};
