'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
    Menu,
    X,
    ChevronDown,
    Search,
    User,
    Phone,
    Globe,
    Clock,
} from 'lucide-react';

export default function Header() {
    const { tenant, storeSlug, loading } = useTenant();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const navigation = [
        {
            name: 'Stock List',
            href: `/${storeSlug}/vehicles`,
            dropdown: [
                { name: 'All Stock', href: `/${storeSlug}/vehicles` },
                { name: 'Clearance Sale', href: `/${storeSlug}/vehicles?clearance=true` },
                { name: 'New Arrivals', href: `/${storeSlug}/vehicles?sort=newest` },
            ],
        },
        {
            name: 'Auction',
            href: `/${storeSlug}/auctions`,
            dropdown: [
                { name: 'Live Auction', href: `/${storeSlug}/auctions` },
                { name: 'How to Bid', href: `/${storeSlug}/how-to-bid` },
            ],
        },
        {
            name: 'How to Buy',
            href: `/${storeSlug}/how-to-buy/stock`,
            dropdown: [
                { name: 'Vehicle from Stock', href: `/${storeSlug}/how-to-buy/stock` },
                { name: 'Order Brand New', href: `/${storeSlug}/how-to-buy/new` },
                { name: 'Request for Vehicle', href: `/${storeSlug}/request-vehicle` },
            ],
        },
        {
            name: 'About Us',
            href: `/${storeSlug}/about`,
            dropdown: [
                { name: 'Company Profile', href: `/${storeSlug}/about` },
                { name: 'FAQ', href: `/${storeSlug}/faq` },
            ],
        },
        {
            name: 'Contact',
            href: `/${storeSlug}/contact`,
        },
    ];

    if (loading) {
        return (
            <header className="h-16 bg-white border-b flex items-center justify-center">
                <div className="spinner" />
            </header>
        );
    }

    const primaryColor = tenant?.primaryColor || '#c62828';

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar border-b border-gray-800">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="hidden sm:inline opacity-80">Japanese Used Car Exporter</span>
                        {tenant?.contactPhone && (
                            <a href={`tel:${tenant.contactPhone}`} className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                                <Phone className="w-3.5 h-3.5" />
                                <span className="font-medium">{tenant.contactPhone}</span>
                            </a>
                        )}
                    </div>
                    <div className="flex items-center gap-6">
                        {tenant?.showJapanTime && (
                            <span className="flex items-center gap-1.5 opacity-80">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Japan Time:</span> {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                        <div className="flex items-center gap-4 border-l border-gray-700 pl-4 ml-2">
                            <button className="flex items-center gap-1.5 hover:text-white text-gray-300 transition-colors font-medium">
                                <Globe className="w-3.5 h-3.5" />
                                USD
                            </button>
                            <button className="flex items-center gap-1.5 hover:text-white text-gray-300 transition-colors font-medium">
                                <Globe className="w-3.5 h-3.5" />
                                EN
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notice Bar */}
            {tenant?.noticeBarEnabled && tenant.noticeBarText && (
                <div className="notice-bar">
                    <div className="container-custom">
                        ⚠️ {tenant.noticeBarText}
                    </div>
                </div>
            )}

            {/* Main Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm backdrop-blur-xl bg-white/95">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20"> {/* Increased height from h-16 to h-20 */}
                        {/* Logo */}
                        <Link href={`/${storeSlug}`} className="flex items-center gap-2 mr-8">
                            {tenant?.logoUrl ? (
                                <Image
                                    src={tenant.logoUrl}
                                    alt={tenant.storeName || 'Logo'}
                                    width={140}
                                    height={48}
                                    className="h-12 w-auto object-contain"
                                />
                            ) : (
                                <span
                                    className="text-2xl font-bold tracking-tight"
                                    style={{ color: primaryColor }}
                                >
                                    {tenant?.storeName || 'Vehicle Export'}
                                </span>
                            )}
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden xl:flex items-center gap-2">
                            {navigation.map((item) => (
                                <div
                                    key={item.name}
                                    className="relative group" // Added group for hover detection
                                    onMouseEnter={() => setActiveDropdown(item.name)}
                                // onMouseLeave removed to allow moving to dropdown
                                >
                                    <div className="py-2" onMouseLeave={() => setActiveDropdown(null)}>
                                        <Link
                                            href={item.href}
                                            className="nav-link text-[15px] font-semibold px-4 py-2.5 rounded-full hover:bg-gray-50 transition-all flex items-center gap-1.5"
                                            style={{ color: activeDropdown === item.name ? primaryColor : undefined }}
                                        >
                                            {item.name}
                                            {item.dropdown && <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                        </Link>

                                        {/* Dropdown with animation */}
                                        {item.dropdown && activeDropdown === item.name && (
                                            <div className="absolute top-full left-0 pt-2 w-56 animate-in fade-in slide-in-from-top-1 duration-200">
                                                <div className="bg-white shadow-xl rounded-xl py-2 border border-gray-100 overflow-hidden ring-1 ring-black/5">
                                                    {item.dropdown.map((subItem) => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="block px-5 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4 ml-auto xl:ml-8">
                            <button className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>

                            {/* TODO: Replace with auth state check */}
                            {/* When logged in, show My Account dropdown */}
                            <div className="relative group hidden sm:block">
                                <Link
                                    href={`/${storeSlug}/dashboard`}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-sm transition-all text-gray-700"
                                >
                                    <User className="w-4 h-4" />
                                    My Account
                                </Link>
                                {/* Dropdown menu */}
                                <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                                    <div className="bg-white shadow-xl rounded-xl py-2 border border-gray-100">
                                        <Link href={`/${storeSlug}/dashboard`} className="block px-4 py-2 text-sm hover:bg-gray-50">
                                            Dashboard
                                        </Link>
                                        <Link href={`/${storeSlug}/dashboard/profile`} className="block px-4 py-2 text-sm hover:bg-gray-50">
                                            Profile Settings
                                        </Link>
                                        <Link href={`/${storeSlug}/dashboard/bids`} className="block px-4 py-2 text-sm hover:bg-gray-50">
                                            My Bids
                                        </Link>
                                        <Link href={`/${storeSlug}/dashboard/favorites`} className="block px-4 py-2 text-sm hover:bg-gray-50">
                                            Favorites
                                        </Link>
                                        <hr className="my-2" />
                                        <Link href={`/${storeSlug}/auth/login`} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                            Sign Out
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* When logged out, show Sign In / Register */}
                            {/*
                            <Link
                                href={`/${storeSlug}/auth/login`}
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-sm transition-all text-gray-700"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </Link>
                            <Link
                                href={`/${storeSlug}/auth/register`}
                                className="hidden sm:block btn btn-primary shadow-lg shadow-primary/20 hover:shadow-primary/40"
                                style={{ background: primaryColor }}
                            >
                                Register Free
                            </Link>
                            */}

                            {/* Mobile menu button */}
                            <button
                                className="xl:hidden p-2.5 hover:bg-gray-100 rounded-lg"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="xl:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg h-[calc(100vh-80px)] overflow-y-auto">
                        <div className="container-custom py-6 space-y-4">
                            {navigation.map((item) => (
                                <div key={item.name} className="border-b border-gray-50 pb-4">
                                    <Link
                                        href={item.href}
                                        className="block py-2 text-lg font-bold text-gray-900"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.dropdown && (
                                        <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100 ml-2">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block py-2 text-base text-gray-600 font-medium active:text-primary"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 flex flex-col gap-3">
                                <Link href={`/${storeSlug}/auth/login`} className="btn btn-outline w-full justify-center py-3">
                                    Sign In
                                </Link>
                                <Link
                                    href={`/${storeSlug}/auth/register`}
                                    className="btn btn-primary w-full justify-center py-3"
                                    style={{ background: primaryColor }}
                                >
                                    Register Free
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
