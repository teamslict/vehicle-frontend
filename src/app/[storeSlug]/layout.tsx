import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppContact from '@/components/layout/WhatsAppContact';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function StoreLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ storeSlug: string }>;
}) {
    const { storeSlug } = await params;

    // Fetch messages for the current locale (handled by next-intl middleware/request config)
    const messages = await getMessages();

    return (
        <TenantProvider storeSlug={storeSlug}>
            <NextIntlClientProvider messages={messages}>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                    <WhatsAppContact />
                </div>
            </NextIntlClientProvider>
        </TenantProvider>
    );

}

const ERP_API_URL = process.env.ERP_API_URL || 'http://localhost:3000';

export async function generateMetadata({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = await params;

    try {
        // Fetch tenant config directly from ERP backend to avoid extra hops/window issues
        const res = await fetch(`${ERP_API_URL}/api/public/export/config?subdomain=${storeSlug}`, {
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (res.ok) {
            const data = await res.json();
            if (data?.logoUrl) {
                return {
                    title: data.storeName || 'Vehicle Store',
                    description: data.tagline || 'Premium Japanese Vehicles',
                    icons: {
                        icon: data.logoUrl,
                        shortcut: data.logoUrl,
                        apple: data.logoUrl,
                    }
                };
            }
        }
    } catch (e) {
        console.error('Failed to fetch tenant metadata:', e);
    }

    return {
        title: 'Vehicle Store',
        description: 'Premium Imported Vehicles'
    };
}
