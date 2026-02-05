'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Calendar, Gauge, MapPin, Settings } from 'lucide-react';
import { Vehicle } from '@/lib/api';
import FavoriteButton from '@/components/vehicles/FavoriteButton';
import FormattedPrice from '@/components/vehicles/FormattedPrice';
import { useTranslations } from 'next-intl';

interface VehicleCardProps {
    vehicle?: Vehicle;
    index: number;
    primaryColor: string;
    storeSlug: string;
}

export default function VehicleCard({ vehicle, index, primaryColor, storeSlug }: VehicleCardProps) {
    const t = useTranslations('Vehicles');
    // If no vehicle data, use mock data (for homepage featured section)
    const displayData = vehicle || {
        id: `demo-${index}`,
        title: '2019 Toyota Prius S Touring',
        stockNumber: `SL-${1000 + index}`,
        price: 12500,
        currency: 'USD',
        mileage: 45000,
        fuel: 'Hybrid',
        transmission: 'Automatic',
        mainPhoto: null,
        status: 'IN_YARD',
    };

    const formatMileage = (km: number) => {
        if (km >= 1000) {
            return `${(km / 1000).toFixed(0)}k km`;
        }
        return `${km} km`;
    };

    return (
        <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <Link href={`/${storeSlug}/vehicles/${displayData.id}`} className="flex-col flex h-full">
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden group-hover:opacity-95 transition-opacity">
                    {displayData.mainPhoto ? (
                        <Image
                            src={displayData.mainPhoto}
                            alt={displayData.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                            <span className="text-4xl font-light text-gray-400">🚗</span>
                        </div>
                    )}

                    {/* Status Watermark */}
                    {(displayData.status === 'SOLD' || displayData.status === 'RESERVED' || displayData.status === 'HOLD') && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <div className={`transform -rotate-12 px-8 py-3 border-4 text-3xl font-black uppercase tracking-widest opacity-90 backdrop-blur-sm shadow-xl ${displayData.status === 'SOLD'
                                    ? "border-red-600/80 text-red-600 bg-red-100/80"
                                    : "border-orange-500/80 text-orange-500 bg-orange-100/80"
                                }`}>
                                {displayData.status}
                            </div>
                        </div>
                    )}

                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                        {displayData.stockNumber}
                    </div>
                    <div className="absolute top-2 right-2">
                        <FavoriteButton vehicleId={displayData.id} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-white font-bold text-lg">
                            {displayData.price > 0 ? (
                                <FormattedPrice amount={displayData.price} baseCurrency={displayData.currency} />
                            ) : 'Ask for Price'}
                        </span>
                        <span className="text-white/70 text-xs ml-2">FOB</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col gap-3">
                    <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-red-700 transition-colors">
                            {displayData.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            {displayData.status === 'IN_YARD' ? '🟢 In Stock' : displayData.status}
                        </p>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-2 text-[11px] text-gray-600 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-1.5">
                            <Gauge className="w-3.5 h-3.5 text-gray-400" />
                            <span>{formatMileage(displayData.mileage)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Fuel className="w-3.5 h-3.5 text-gray-400" />
                            <span>{displayData.fuel}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Settings className="w-3.5 h-3.5 text-gray-400" />
                            <span>{displayData.transmission}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                            <span>Japan</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
