'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Gavel, User, Heart, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardSidebarProps {
    storeSlug: string;
    primaryColor: string;
}

export default function DashboardSidebar({ storeSlug, primaryColor }: DashboardSidebarProps) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', href: `/${storeSlug}/dashboard` },
        { icon: Gavel, label: 'My Bids', href: `/${storeSlug}/dashboard/bids` },
        { icon: Heart, label: 'Favorites', href: `/${storeSlug}/dashboard/favorites` },
        { icon: User, label: 'Profile', href: `/${storeSlug}/dashboard/profile` },
    ];

    return (
        <div className="w-full lg:w-64 bg-white lg:min-h-[calc(100vh-80px)] border-r border-gray-100 flex-shrink-0">
            <div className="p-6">
                <div className="flex items-center gap-3 px-2 mb-8 text-gray-400 text-sm font-medium uppercase tracking-wider">
                    <Settings size={14} />
                    <span>Account Menu</span>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                style={isActive ? { backgroundColor: primaryColor } : {}}
                            >
                                <item.icon
                                    size={20}
                                    className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}
                                />
                                <span className="font-medium relative z-10">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-6 border-t border-gray-100 mt-auto">
                <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
