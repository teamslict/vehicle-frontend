import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
    currency: 'USD' | 'JPY';
    locale: 'en' | 'ja';
    rate: number; // 1 USD = X JPY
    setCurrency: (currency: 'USD' | 'JPY') => void;
    setLocale: (locale: 'en' | 'ja') => void;
    toggleCurrency: () => void;
    toggleLocale: () => void;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set) => ({
            currency: 'USD',
            locale: 'en',
            rate: 153.50, // Approximation, could be fetched from an API in a real app
            setCurrency: (currency) => set({ currency }),
            setLocale: (locale) => {
                set({ locale });
                document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
                window.location.reload(); // Reload to apply server-side changes
            },
            toggleCurrency: () => set((state) => ({
                currency: state.currency === 'USD' ? 'JPY' : 'USD'
            })),
            toggleLocale: () => {
                const newLocale = set((state) => {
                    const next = state.locale === 'en' ? 'ja' : 'en';
                    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
                    return { locale: next };
                });
                window.location.reload();
            },
        }),
        {
            name: 'vehicle-currency-storage',
        }
    )
);
