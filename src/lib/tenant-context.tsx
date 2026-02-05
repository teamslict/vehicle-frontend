'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface TenantConfig {
    id: string;
    tenantId: string;
    storeName: string;
    tagline: string;
    logoUrl: string | null;
    primaryColor: string;
    secondaryColor: string;
    faviconUrl: string | null;

    // Contact
    contactEmail: string | null;
    contactPhone: string | null;
    whatsappNumber: string | null;
    address: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
    youtubeUrl: string | null;

    // Content
    heroSlides: HeroSlide[];
    noticeBarText: string | null;
    noticeBarEnabled: boolean;
    promoBanners?: Array<{
        id: string;
        imageUrl: string;
        link?: string;
        bgColor?: string;
    }>;

    // Settings
    requireDeposit: boolean;
    minimumDeposit: number;
    defaultCurrency: string;
    showJapanTime: boolean;

    // How-to flows
    howToBuyStockSteps: HowToStep[] | null;
    howToBidSteps: HowToStep[] | null;

    // Company
    companyProfile: CompanyProfile | null;
    bankDetails: BankDetails | null;
    faqItems: FAQItem[] | null;

    // About Us (New Structure)
    aboutUs: AboutUsConfig | null;

    // Contact Page (New Structure)
    contactPage: ContactPageConfig | null;
}

export interface ContactPageConfig {
    title?: string;
    subtitle?: string;
    mapUrl?: string;
    businessHours?: string;
    // Generic Bank Details
    bankDetails?: {
        bankName?: string;
        accountName?: string;
        accountNumber?: string;
        swiftCode?: string;
        branch?: string;
        bankAddress?: string;
    };
}

export interface AboutUsConfig {
    story?: string;
    mission?: string;
    stats?: Array<{ value: string; label: string; icon: string }>;
    values?: Array<{ title: string; desc: string }>;
}

export interface HeroSlide {
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    link?: string;
}

export interface HowToStep {
    step: number;
    title: string;
    description: string;
    icon?: string;
}

export interface CompanyProfile {
    title?: string;
    content?: string;
    foundedYear?: string;
    employees?: string;
}

export interface BankDetails {
    bankName: string;
    accountName: string;
    accountNumber: string;
    swiftCode: string;
    branch?: string;
    iban?: string;
    bankAddress?: string;
}

export interface FAQItem {
    category?: string;
    question: string;
    answer: string;
}

interface TenantContextValue {
    tenant: TenantConfig | null;
    loading: boolean;
    error: string | null;
    storeSlug: string;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

// Default config when API fails or for development
const defaultConfig: Partial<TenantConfig> = {
    storeName: 'Vehicle Export',
    tagline: 'Premium Japanese Vehicles Direct to You',
    primaryColor: '#c62828',
    secondaryColor: '#1a1a1a',
    requireDeposit: true,
    minimumDeposit: 1000,
    defaultCurrency: 'USD',
    showJapanTime: true,
    heroSlides: [],
    noticeBarEnabled: false,
};

export function TenantProvider({
    children,
    storeSlug,
}: {
    children: ReactNode;
    storeSlug: string;
}) {
    const [tenant, setTenant] = useState<TenantConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch(`/api/erp/config?subdomain=${storeSlug}`);
                if (!res.ok) {
                    throw new Error('Failed to load store config');
                }
                const data = await res.json();
                setTenant({ ...defaultConfig, ...data } as TenantConfig);
            } catch (err) {
                console.error('Tenant fetch error:', err);
                setError('Failed to load store configuration');
                // Use default config in case of error
                setTenant({
                    ...defaultConfig,
                    id: 'default',
                    tenantId: storeSlug,
                } as TenantConfig);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [storeSlug]);

    return (
        <TenantContext.Provider value={{ tenant, loading, error, storeSlug }}>
            {children}
        </TenantContext.Provider>
    );
}

export function useTenant() {
    const context = useContext(TenantContext);
    if (context === undefined) {
        throw new Error('useTenant must be used within a TenantProvider');
    }
    return context;
}
