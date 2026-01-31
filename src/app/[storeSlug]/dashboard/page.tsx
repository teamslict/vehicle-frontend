'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { Gavel, ShoppingCart, Clock, CheckCircle2 } from 'lucide-react';

export default function DashboardOverview({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // Mock Data
    const stats = [
        { label: 'Active Bids', value: '3', icon: Gavel, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Orders', value: '1', icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Watchlist', value: '12', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Completed', value: '5', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500">Welcome back, User</p>
                </div>
                <div className="text-sm text-gray-400">
                    Last login: Today, 3:45 PM
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm">{stat.label}</h3>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
            >
                <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-6">
                    {/* Placeholder Activity Items */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                            <div>
                                <p className="text-gray-900 font-medium text-sm">Placed a bid on <span className="font-bold">2019 Toyota Prius</span></p>
                                <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
