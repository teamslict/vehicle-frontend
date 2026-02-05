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
