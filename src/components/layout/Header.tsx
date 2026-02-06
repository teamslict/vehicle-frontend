'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
    Menu,
    X,
    ChevronDown,
    Search,
    User,
    Globe,
    CreditCard,
    LogOut,
    ShoppingCart,
    Phone,
    Clock
} from 'lucide-react';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useTranslations } from 'next-intl';
import GoogleTranslate, { changeLanguage } from '@/components/GoogleTranslate';

declare global {
    interface Window {
        changeGoogleLanguage: (lang: string) => void;
    }
}

export default function Header() {
    const { tenant, storeSlug, loading } = useTenant();
    const router = useRouter();
    const t = useTranslations('Navigation');
    const commonT = useTranslations('Common');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [currentLang, setCurrentLang] = useState('en');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { currency, locale, setCurrency, setLocale, fetchRate } = useCurrencyStore();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // Mark component as mounted (client-side only)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Check auth state on mount and when localStorage changes
    useEffect(() => {
        if (!mounted) return;

        const checkAuth = () => {
            const session = localStorage.getItem('mock_session');
            console.log('[Header] Checking auth, session:', session);
            setIsLoggedIn(!!session);
        };
        checkAuth();

        // Listen for storage changes (e.g., sign-out in another tab)
        window.addEventListener('storage', checkAuth);
        // Listen for custom auth-change event (same tab)
        window.addEventListener('auth-change', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('auth-change', checkAuth);
        };
    }, [mounted]);

    // Fetch latest exchange rate on mount
    useEffect(() => {
        fetchRate();
    }, [fetchRate]);

    const navigation = [
        {
            name: t('stock'),
            key: 'stock',
            href: `/${storeSlug}/vehicles`,
            dropdown: [
                { name: t('allStock'), href: `/${storeSlug}/vehicles` },
                { name: t('clearance'), href: `/${storeSlug}/vehicles?clearance=true` },
                { name: t('newArrivals'), href: `/${storeSlug}/vehicles?sort=newest` },
            ],
        },
        {
            name: t('auctions'),
            key: 'auctions',
            href: `/${storeSlug}/auctions`,
            dropdown: [
                { name: t('liveAuction'), href: `/${storeSlug}/auctions` },
                { name: t('howToBid'), href: `/${storeSlug}/how-to-bid` },
            ],
        },
        {
            name: t('howToBuy'),
            key: 'howToBuy',
            href: `/${storeSlug}/how-to-buy/stock`,
            dropdown: [
                { name: t('stockVehicle'), href: `/${storeSlug}/how-to-buy/stock` },
                { name: t('orderNew'), href: `/${storeSlug}/how-to-buy/new` },
                { name: t('request'), href: `/${storeSlug}/request-vehicle` },
            ],
        },
        {
            name: t('about'),
            key: 'about',
            href: `/${storeSlug}/about`,
            dropdown: [
                { name: t('companyProfile'), href: `/${storeSlug}/about` },
                { name: t('faq'), href: `/${storeSlug}/faq` },
            ],
        },
        {
            name: t('payment'),
            key: 'payment',
            href: `/${storeSlug}/dashboard/wallet`,
            dropdown: [
                { name: t('payOnline'), href: `/${storeSlug}/dashboard/wallet` },
                { name: t('ourBank'), href: `/${storeSlug}/bank-info` },
            ],
        },
        {
            name: t('contact'),
            key: 'contact',
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

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar border-b border-gray-100/10 py-2">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <span className="hidden lg:inline opacity-70 text-xs font-medium tracking-wide uppercase">{commonT('exporter')}</span>
                        {tenant?.contactPhone && (
                            <a href={`tel:${tenant.contactPhone}`} className="flex items-center gap-1.5 hover:text-white transition-colors group">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-3 h-3" />
                                </div>
                                <span className="text-sm font-bold tracking-tight">{tenant.contactPhone}</span>
                            </a>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        {tenant?.showJapanTime && (
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                <Clock className="w-3.5 h-3.5 text-primary" />
                                <span className="text-xs font-bold whitespace-nowrap">
                                    <span className="opacity-60 font-medium mr-1">{commonT('japanTime')}:</span>
                                    {new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center bg-black/20 rounded-lg p-1 border border-white/5 shadow-inner translate-y-[1px]">
                            {/* Currency Switcher */}
                            <div className="flex bg-white/5 rounded-md p-0.5">
                                <button
                                    onClick={() => setCurrency('USD')}
                                    className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${currency === 'USD'
                                        ? 'bg-primary text-white shadow-sm scale-105'
                                        : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    USD
                                </button>
                                <button
                                    onClick={() => setCurrency('JPY')}
                                    className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${currency === 'JPY'
                                        ? 'bg-primary text-white shadow-sm scale-105'
                                        : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    JPY
                                </button>
                            </div>

                            <div className="w-px h-4 bg-white/10 mx-2" />

                            {/* Language Switcher */}
                            <div className="flex bg-white/5 rounded-md p-0.5">
                                <button
                                    onClick={() => {
                                        setCurrentLang('en');
                                        changeLanguage('en');
                                    }}
                                    className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${currentLang === 'en'
                                        ? 'bg-indigo-600 text-white shadow-sm scale-105'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
                                        }`}
                                >
                                    EN
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentLang('ja');
                                        changeLanguage('ja');
                                    }}
                                    className={`px-3 py-1 rounded-sm text-[10px] font-bold transition-all ${currentLang === 'ja'
                                        ? 'bg-indigo-600 text-white shadow-sm scale-105'
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/10'
                                        }`}
                                >
                                    日本語
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Google Translate Integration */}
            <div className="absolute top-0 left-0 w-px h-px overflow-hidden opacity-0 pointer-events-none">
                {/* @ts-ignore */}
                <GoogleTranslate />
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
                                    width={200}
                                    height={64}
                                    className="h-16 w-auto object-contain"
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
                            <button
                                onClick={() => router.push(`/${storeSlug}/vehicles`)}
                                className="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* TODO: Replace with auth state check */}
                            {/* When logged in, show My Account dropdown */}
                            {!mounted ? (
                                // Skeleton during SSR/hydration
                                <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 font-semibold text-sm text-gray-300 animate-pulse">
                                    <User className="w-4 h-4" />
                                    <span className="w-16 h-4 bg-gray-200 rounded" />
                                </div>
                            ) : isLoggedIn ? (
                                <div className="relative group hidden sm:block">
                                    <Link
                                        href={`/${storeSlug}/dashboard`}
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-sm transition-all text-gray-700"
                                    >
                                        <User className="w-4 h-4" />
                                        {t('myAccount')}
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
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem('mock_session');
                                                    setIsLoggedIn(false);
                                                    window.dispatchEvent(new Event('auth-change'));
                                                    window.location.href = `/${storeSlug}/auth/login`;
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={`/${storeSlug}/auth/login`}
                                        className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 font-semibold text-sm transition-all text-gray-700"
                                    >
                                        <User className="w-4 h-4" />
                                        Sign In
                                    </Link>
                                    <Link
                                        href={`/${storeSlug}/auth/register`}
                                        className="hidden sm:block px-5 py-2.5 rounded-full font-semibold text-sm text-white shadow-lg transition-all hover:opacity-90"
                                        style={{ background: primaryColor }}
                                    >
                                        Register Free
                                    </Link>
                                </>
                            )}

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
