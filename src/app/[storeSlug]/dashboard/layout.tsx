'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ storeSlug: string }>;
}) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // TODO: Add Auth check here (Middleware or Client-side check)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
                    <DashboardSidebar storeSlug={storeSlug} primaryColor={primaryColor} />
                    <main className="flex-1 p-6 lg:p-10">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
