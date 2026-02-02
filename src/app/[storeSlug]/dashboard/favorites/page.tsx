'use client';

import { use, useEffect, useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Loader2, Heart } from 'lucide-react';
import VehicleCard from '@/components/home/VehicleCard';
import { useFavorites } from '@/hooks/useFavorites';
import { api, Vehicle } from '@/lib/api';

export default function FavoritesPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    const { favorites } = useFavorites();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteVehicles = async () => {
            if (favorites.length === 0) {
                setVehicles([]);
                setLoading(false);
                return;
            }

            try {
                // We fetch vehicles by their IDs
                const response = await api.getVehicles(storeSlug, { ids: favorites });
                setVehicles(response.data || []);
            } catch (err) {
                console.error('Failed to fetch favorite vehicles', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteVehicles();
    }, [storeSlug, favorites]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
                <p className="text-gray-500">Vehicles you have saved for later</p>
            </div>

            {loading && favorites.length > 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
                    <p className="text-gray-500 text-sm">Loading your favorites...</p>
                </div>
            ) : vehicles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {vehicles.map((vehicle, i) => (
                        <motion.div
                            key={vehicle.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <VehicleCard
                                vehicle={vehicle}
                                index={i}
                                primaryColor={primaryColor}
                                storeSlug={storeSlug}
                            />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Heart size={32} />
                    </div>
                    <p className="text-gray-500 mb-6">You haven't saved any vehicles yet.</p>
                    <Link
                        href={`/${storeSlug}/vehicles`}
                        className="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        Browse Stock
                    </Link>
                </div>
            )}
        </div>
    );
}

