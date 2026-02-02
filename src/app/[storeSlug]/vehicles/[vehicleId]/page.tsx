'use client';

import { useTenant } from '@/lib/tenant-context';
import VehicleGallery from '@/components/vehicles/VehicleGallery';
import {
    Calendar, Gauge, Fuel, MapPin, Share2, Printer,
    CheckCircle2, Info, ShieldCheck, Mail, Loader2, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { api, VehicleDetail } from '@/lib/api';
import FavoriteButton from '@/components/vehicles/FavoriteButton';
import FormattedPrice from '@/components/vehicles/FormattedPrice';

export default function VehicleDetailPage({ params }: { params: Promise<{ storeSlug: string; vehicleId: string }> }) {
    const { storeSlug, vehicleId } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await api.getVehicle(storeSlug, vehicleId);
                setVehicle(data);
            } catch (err) {
                console.error('Failed to fetch vehicle:', err);
                setError('Vehicle not found or failed to load.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [storeSlug, vehicleId]);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Loading vehicle details...</p>
                </div>
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Vehicle Not Found</h2>
                    <p className="text-gray-500 mb-6">{error || 'This vehicle may have been sold or removed.'}</p>
                    <Link href={`/${storeSlug}/vehicles`} className="btn btn-primary" style={{ background: primaryColor }}>
                        Browse Other Vehicles
                    </Link>
                </div>
            </div>
        );
    }

    const formatMileage = (km: number | null | undefined) => {
        if (km === null || km === undefined) return '—';
        return `${km.toLocaleString()} km`;
    };

    const images = vehicle.photos?.map(p => p.url) || [];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Breadcrumb & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link href={`/${storeSlug}`} className="hover:text-primary transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href={`/${storeSlug}/vehicles`} className="hover:text-primary transition-colors">Stock</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium truncate max-w-[200px]">{vehicle.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Share2 size={16} /> Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <Printer size={16} /> Print
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Gallery & basic info (7 cols) */}
                    <div className="lg:col-span-7 space-y-8">
                        <VehicleGallery images={images} primaryColor={primaryColor} />

                        {/* Description / Features */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Info size={20} className="text-gray-400" />
                                Vehicle Extras & Features
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {(vehicle.features || []).map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                        <CheckCircle2 size={16} style={{ color: primaryColor }} />
                                        {feature}
                                    </div>
                                ))}
                                {(!vehicle.features || vehicle.features.length === 0) && (
                                    <p className="text-gray-400 col-span-3">Contact us for detailed specifications</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Price, Specs, CTA (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Price Card */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck size={120} />
                            </div>

                            <div className="relative z-10">
                                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                    {vehicle.status === 'IN_YARD' ? 'Available Now' : vehicle.status}
                                </div>
                                <h1 className="text-2xl md:text-3xl font-extra-bold text-gray-900 mb-2 leading-tight">
                                    {vehicle.title}
                                </h1>
                                <p className="text-gray-500 mb-6 flex items-center justify-between">
                                    <span>Stock ID: <span className="font-mono text-gray-900 font-bold">{vehicle.stockNumber}</span></span>
                                    <FavoriteButton vehicleId={vehicle.id} />
                                </p>

                                <div className="flex items-end gap-3 mb-8">
                                    <span className="text-4xl font-black text-gray-900 tracking-tight">
                                        <FormattedPrice amount={vehicle.fobPrice} baseCurrency={vehicle.currency} />
                                    </span>
                                    <span className="text-gray-500 font-medium mb-1.5">(FOB Price)</span>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href={`/${storeSlug}/request-vehicle?stock=${vehicle.stockNumber}`}
                                        className="btn btn-primary w-full text-lg h-14"
                                        style={{ background: primaryColor }}
                                    >
                                        <Mail className="mr-2" />
                                        Inquire Now
                                    </Link>
                                    <p className="text-xs text-center text-gray-500">
                                        Inquire for Total C&F Price to your port
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Specs Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-gray-900">Vehicle Specifications</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {[
                                    { icon: Calendar, label: 'Year', value: vehicle.year },
                                    { icon: Gauge, label: 'Mileage', value: formatMileage(vehicle.mileage) },
                                    { icon: Fuel, label: 'Engine / Fuel', value: `${vehicle.engineCc}cc / ${vehicle.fuelType}` },
                                    { icon: CheckCircle2, label: 'Transmission', value: vehicle.transmission },
                                    { icon: ShieldCheck, label: 'Chassis No', value: vehicle.chassisNumber },
                                    { icon: MapPin, label: 'Color', value: vehicle.color },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <item.icon size={18} />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg h-fit text-blue-600">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-900 text-sm mb-1">Buyer Protection</h4>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    All vehicles are inspected by JEVIC/JAAI before shipment. We guarantee standard quality for all our exports.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
