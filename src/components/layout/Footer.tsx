'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTenant } from '@/lib/tenant-context';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const { tenant, storeSlug } = useTenant();
    const t = useTranslations('Footer');
    const navT = useTranslations('Navigation');

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
        { name: navT('companyProfile'), href: `/${storeSlug}/about` },
        { name: navT('howToBuy'), href: `/${storeSlug}/how-to-buy/stock` },
        { name: 'Bank Details', href: `/${storeSlug}/payment/bank-details` },
        { name: navT('faq'), href: `/${storeSlug}/faq` },
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

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed max-w-sm">
                                {t('tagline')}
                            </p>

                            <div className="space-y-3 text-sm text-gray-400">
                                <h5 className="font-bold text-white mb-2 uppercase tracking-wider text-xs opacity-50">{t('contactInfo')}</h5>
                                {tenant?.address && (
                                    <p className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                        {tenant.address}
                                    </p>
                                )}
                                {tenant?.contactPhone && (
                                    <a href={`tel:${tenant.contactPhone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Phone className="w-4 h-4 text-primary" />
                                        {tenant.contactPhone}
                                    </a>
                                )}
                                {tenant?.contactEmail && (
                                    <a href={`mailto:${tenant.contactEmail}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Mail className="w-4 h-4 text-primary" />
                                        {tenant.contactEmail}
                                    </a>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-3 mt-6">
                                {tenant?.facebookUrl && (
                                    <a href={tenant.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all">
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                )}
                                {tenant?.instagramUrl && (
                                    <a href={tenant.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all">
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                )}
                                {tenant?.youtubeUrl && (
                                    <a href={tenant.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-red-600 transition-all">
                                        <Youtube className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* About Links */}
                        <div className="pt-6 border-t border-white/5">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-4">{navT('about')}</h4>
                            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-400">
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
            <div className="border-t border-white/5">
                <div className="container-custom py-6 text-center text-xs text-gray-500 font-medium tracking-wide">
                    © {new Date().getFullYear()} {tenant?.storeName || 'Vehicle Export'}. {t('copyright')}
                </div>
            </div>
        </footer>
    );
}
