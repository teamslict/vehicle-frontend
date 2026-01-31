'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import VehicleCard from '@/components/home/VehicleCard';

export default function FavoritesPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // Mock Favorites (reuse array from VehiclesPage for simplicity but fewer items)
    const favorites = Array.from({ length: 3 });

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
                <p className="text-gray-500">Vehicles you have saved for later</p>
            </div>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {favorites.map((_, i) => (
                        <VehicleCard
                            key={i}
                            index={i}
                            primaryColor={primaryColor}
                            storeSlug={storeSlug}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500 mb-4">You haven't saved any vehicles yet.</p>
                    <Link
                        href={`/${storeSlug}/vehicles`}
                        className="inline-block px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800"
                    >
                        Browse Stock
                    </Link>
                </div>
            )}
        </div>
    );
}
