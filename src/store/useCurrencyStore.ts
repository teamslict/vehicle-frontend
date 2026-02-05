import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CurrencyState {
    currency: 'USD' | 'JPY';
    locale: 'en' | 'ja';
    rate: number; // 1 USD = X JPY
    lastUpdated: string | null;
    isRateLoading: boolean;
    setCurrency: (currency: 'USD' | 'JPY') => void;
    setLocale: (locale: 'en' | 'ja') => void;
    toggleCurrency: () => void;
    toggleLocale: () => void;
    fetchRate: () => Promise<void>;
}

const FALLBACK_RATE = 153.50;

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: 'USD',
            locale: 'en', // Always default to English for semantic content
            rate: FALLBACK_RATE,
            lastUpdated: null,
            isRateLoading: false,
            setCurrency: (currency) => set({ currency }),
            setLocale: (locale) => {
                // We only store the preference, but don't force a reload anymore
                // Google Translate handles the actual text change
                set({ locale });
            },
            toggleCurrency: () => set((state) => ({
                currency: state.currency === 'USD' ? 'JPY' : 'USD'
            })),
            toggleLocale: () => {
                set((state) => {
                    const next = state.locale === 'en' ? 'ja' : 'en';
                    return { locale: next };
                });
            },
            fetchRate: async () => {
                const state = get();

                // Force fetch if we are on fallback rate
                if (Math.abs(state.rate - FALLBACK_RATE) < 0.01) {
                    // Force update
                } else {
                    // Don't refetch if we have a recent rate (within 1 hour)
                    const lastUpdated = state.lastUpdated;
                    if (lastUpdated) {
                        const hourAgo = Date.now() - 60 * 60 * 1000;
                        if (new Date(lastUpdated).getTime() > hourAgo) {
                            return;
                        }
                    }
                }

                set({ isRateLoading: true });
                try {
                    const response = await fetch('/api/exchange-rate');
                    if (!response.ok) throw new Error('Failed to fetch rate');
                    const data = await response.json();
                    set({
                        rate: data.rate,
                        lastUpdated: data.updatedAt,
                        isRateLoading: false
                    });
                } catch (error) {
                    console.error('Failed to fetch exchange rate:', error);
                    set({ isRateLoading: false });
                }
            },
        }),
        {
            name: 'vehicle-currency-storage',
            version: 1, // Invalidate old cache
            partialize: (state) => ({
                currency: state.currency,
                locale: state.locale,
                rate: state.rate,
                lastUpdated: state.lastUpdated,
            }),
        }
    )
);

// Auto-fetch rate when store is created (client-side only)
if (typeof window !== 'undefined') {
    // Small delay to ensure hydration is complete
    setTimeout(() => {
        useCurrencyStore.getState().fetchRate();
    }, 100);
}
