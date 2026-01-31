import { TenantProvider } from '@/lib/tenant-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function StoreLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ storeSlug: string }>;
}) {
    const { storeSlug } = await params;

    return (
        <TenantProvider storeSlug={storeSlug}>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </TenantProvider>
    );
}
