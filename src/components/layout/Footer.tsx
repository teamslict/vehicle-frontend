'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTenant } from '@/lib/tenant-context';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    const { tenant, storeSlug } = useTenant();

    const shopByMake = [
        'Toyota', 'Nissan', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru',
        'Suzuki', 'Daihatsu', 'Isuzu', 'Hino', 'BMW', 'Mercedes Benz',
    ];

    const shopByType = [
        'Sedan', 'SUV', 'Truck', 'Van', 'Hatchback', 'Wagon',
        'Bus', 'Minivan', 'Coupe', 'Machinery',
    ];

    const shopByPrice = [
        'Under $500', '$500 - $1,000', '$1,000 - $2,000', '$2,000 - $3,000',
        '$3,000 - $4,000', '$4,000 - $5,000', '$5,000 - $10,000', 'Above $10,000',
    ];

    const aboutLinks = [
        { name: 'Company Profile', href: `/${storeSlug}/about` },
        { name: 'How to Buy', href: `/${storeSlug}/how-to-buy/stock` },
        { name: 'Bank Details', href: `/${storeSlug}/payment/bank-details` },
        { name: 'FAQ', href: `/${storeSlug}/faq` },
        { name: 'Terms and Conditions', href: `/${storeSlug}/terms` },
        { name: 'Privacy Policy', href: `/${storeSlug}/privacy` },
    ];

    const primaryColor = tenant?.primaryColor || '#c62828';

    return (
        <footer className="bg-[#1a1a1a] text-white">
            {/* Main Footer */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Shop By Make */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Shop By Make</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {shopByMake.map((make) => (
                                <li key={make}>
                                    <Link
                                        href={`/${storeSlug}/vehicles?make=${make.toLowerCase()}`}
                                        className="hover:text-white transition-colors"
                                    >
                                        {make}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop By Type */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Shop By Type</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {shopByType.map((type) => (
                                <li key={type}>
                                    <Link
                                        href={`/${storeSlug}/vehicles?bodyType=${type.toLowerCase()}`}
                                        className="hover:text-white transition-colors"
                                    >
                                        {type}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Shop By Price */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Shop By Price</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            {shopByPrice.map((price) => (
                                <li key={price}>
                                    <Link
                                        href={`/${storeSlug}/vehicles`}
                                        className="hover:text-white transition-colors"
                                    >
                                        {price}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
                            {tenant?.logoUrl ? (
                                <Image
                                    src={tenant.logoUrl}
                                    alt={tenant.storeName || 'Logo'}
                                    width={150}
                                    height={50}
                                    className="h-12 w-auto object-contain mb-4 brightness-0 invert"
                                />
                            ) : (
                                <span
                                    className="text-3xl font-bold mb-4"
                                    style={{ color: primaryColor }}
                                >
                                    {tenant?.storeName || 'Vehicle Export'}
                                </span>
                            )}

                            {tenant?.address && (
                                <p className="text-gray-400 text-sm mb-4 flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    {tenant.address}
                                </p>
                            )}

                            <div className="space-y-2 text-sm text-gray-400">
                                {tenant?.contactPhone && (
                                    <a href={`tel:${tenant.contactPhone}`} className="flex items-center gap-2 hover:text-white">
                                        <Phone className="w-4 h-4" />
                                        {tenant.contactPhone}
                                    </a>
                                )}
                                {tenant?.contactEmail && (
                                    <a href={`mailto:${tenant.contactEmail}`} className="flex items-center gap-2 hover:text-white">
                                        <Mail className="w-4 h-4" />
                                        {tenant.contactEmail}
                                    </a>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 mt-4">
                                {tenant?.facebookUrl && (
                                    <a
                                        href={tenant.facebookUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:opacity-80"
                                    >
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                )}
                                {tenant?.instagramUrl && (
                                    <a
                                        href={tenant.instagramUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:opacity-80"
                                    >
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                )}
                                {tenant?.youtubeUrl && (
                                    <a
                                        href={tenant.youtubeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:opacity-80"
                                    >
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* About Links */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">About Us</h4>
                            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                                {aboutLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-white transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-800">
                <div className="container-custom py-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} {tenant?.storeName || 'Vehicle Export'}. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
