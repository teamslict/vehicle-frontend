'use client';

import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('English');

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' },
        { code: 'es', label: 'Español' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <Globe size={18} />
                <span className="text-sm font-medium hidden md:inline">{currentLang}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setCurrentLang(lang.label);
                                    setIsOpen(false);
                                    // Here we would implement the actual locale switch logic via next-intl router
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
