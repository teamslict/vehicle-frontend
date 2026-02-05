'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: any;
    }
}

export default function GoogleTranslate() {
    useEffect(() => {
        // Check if already initialized
        if (document.getElementById('google-translate-script')) {
            return;
        }

        // Config function called by Google script
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    autoDisplay: false,
                    includedLanguages: 'en,ja,es,fr,de,ru,zh-CN',
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        // Inject script
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div id="google_translate_element" style={{ position: 'absolute', top: -9999, left: -9999 }} />
    );
}

// Helper function to change language via cookie (more reliable)
export function changeLanguage(lang: string) {
    // Set the googtrans cookie
    const domain = window.location.hostname;

    if (lang === 'en') {
        // Clear translation by removing the cookie
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
    } else {
        // Set translation cookie
        document.cookie = `googtrans=/en/${lang}; path=/;`;
        document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
        document.cookie = `googtrans=/en/${lang}; path=/; domain=.${domain}`;
    }

    // Reload to apply translation
    window.location.reload();
}
