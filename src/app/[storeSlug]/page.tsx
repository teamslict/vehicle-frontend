'use client';

import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { Search, ChevronRight, Car, Truck, Shield, Globe, Award, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '@/components/home/HeroSlider';
import VehicleCard from '@/components/home/VehicleCard';
import { api, Vehicle } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const { tenant, storeSlug, loading } = useTenant();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [vehiclesLoading, setVehiclesLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            if (!storeSlug) return;
            setVehiclesLoading(true);
            try {
                const response = await api.getVehicles(storeSlug, { limit: 8 });
                setVehicles(response.data || []);
            } catch (err) {
                console.error('Failed to fetch vehicles:', err);
            } finally {
                setVehiclesLoading(false);
            }
        };
        fetchVehicles();
    }, [storeSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="spinner" />
            </div>
        );
    }

    const primaryColor = tenant?.primaryColor || '#c62828';

    const quickFilters = [
        { name: 'Fuel Efficient', icon: '⛽', href: `/${storeSlug}/vehicles?sort=fuel` },
        { name: 'Trucks', icon: '🚚', href: `/${storeSlug}/vehicles?bodyType=truck` },
        { name: 'Warranty', icon: '🛡️', href: `/${storeSlug}/vehicles?warranty=true` },
        { name: 'Hybrids', icon: '🔋', href: `/${storeSlug}/vehicles?fuelType=hybrid` },
        { name: 'Luxury', icon: '💎', href: `/${storeSlug}/vehicles?class=luxury` },
        { name: 'Auctions', icon: '🔨', href: `/${storeSlug}/auctions` },
    ];

    const benefits = [
        { icon: Car, title: '75k+', subtitle: 'Vehicles' },
        { icon: Globe, title: '150+', subtitle: 'Countries' },
        { icon: Truck, title: 'Fast', subtitle: 'Shipping' },
        { icon: Shield, title: 'Safe', subtitle: 'Payment' },
        { icon: Star, title: '4.9/5', subtitle: 'Reviews' },
    ];

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen text-gray-900">
            {/* Hero Section */}
            <section className="pt-6 pb-4">
                <div className="container-custom">
                    <HeroSlider
                        slides={tenant?.heroSlides || []}
                        storeSlug={storeSlug}
                        storeName={tenant?.storeName || ''}
                        primaryColor={primaryColor}
                    />
                </div>
            </section>

            {/* Search Section (Standardized) */}
            <section className="py-4">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Make</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-all outline-none cursor-pointer text-sm">
                                    <option>All Makes</option>
                                    <option>Toyota</option>
                                    <option>Nissan</option>
                                    <option>Honda</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Model</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-all outline-none cursor-pointer text-sm">
                                    <option>All Models</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Year</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-all outline-none cursor-pointer text-sm">
                                    <option>From Year</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Price</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-all outline-none cursor-pointer text-sm">
                                    <option>Max Price</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider pl-1">Type</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 focus:bg-white transition-all outline-none cursor-pointer text-sm">
                                    <option>Body Type</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    className="w-full btn btn-primary h-[42px] text-sm shadow-sm hover:shadow transition-all"
                                    style={{ background: primaryColor }}
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs font-semibold text-gray-500 flex items-center mr-2">POPULAR:</span>
                            {quickFilters.map((filter) => (
                                <Link
                                    key={filter.name}
                                    href={filter.href}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-xs font-medium text-gray-600 hover:bg-white hover:text-primary hover:shadow-sm border border-transparent hover:border-gray-200 transition-all"
                                >
                                    <span>{filter.icon}</span>
                                    {filter.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Value Props */}
            <div className="py-4">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.title}
                                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-gray-200 transition-colors"
                            >
                                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                    <benefit.icon className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="font-bold text-lg text-gray-900">{benefit.title}</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{benefit.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Arrivals */}
            <div className="py-6">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                            <p className="text-sm text-gray-500 mt-1">Fresh stock added daily directly from Japan</p>
                        </div>
                        <Link
                            href={`/${storeSlug}/vehicles?sort=newest`}
                            className="hidden sm:flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
                        >
                            View All <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {vehiclesLoading ? (
                            <div className="col-span-full flex items-center justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                                <span className="ml-2 text-gray-500">Loading vehicles...</span>
                            </div>
                        ) : vehicles.length > 0 ? (
                            vehicles.map((vehicle, i) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} primaryColor={primaryColor} storeSlug={storeSlug} />
                            ))
                        ) : (
                            Array.from({ length: 8 }).map((_, i) => (
                                <VehicleCard key={i} index={i} primaryColor={primaryColor} storeSlug={storeSlug} />
                            ))
                        )}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href={`/${storeSlug}/vehicles?sort=newest`}
                            className="btn w-full btn-outline"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                            View All Stock
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-6 pb-12">
                <div className="container-custom">
                    <div className="bg-gray-900 rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />

                        <div className="relative z-10 p-8 md:p-12 max-w-2xl">
                            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                                Looking for something specific?
                            </h2>
                            <p className="text-lg text-gray-300 mb-8 font-light">
                                We have access to over 100,000 vehicles at Japanese auctions daily.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href={`/${storeSlug}/request-vehicle`}
                                    className="btn bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 rounded-lg"
                                >
                                    Request a Vehicle
                                </Link>
                                <Link
                                    href={`/${storeSlug}/auctions`}
                                    className="btn bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold px-6 py-3 rounded-lg"
                                >
                                    Explore Auctions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
