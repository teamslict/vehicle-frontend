'use client';

import { use, useEffect, useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { Gavel, ShoppingCart, Clock, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardOverview({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    const [statsData, setStatsData] = useState({
        activeBids: 0,
        pendingOrders: 0,
        watchlist: 0,
        completed: 0
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            const email = localStorage.getItem('user_email');
            if (email) {
                try {
                    const data = await api.getCustomerDashboard(storeSlug, email);
                    if (data && data.stats) {
                        setStatsData(data.stats);
                        setRecentActivity(data.recentActivity || []);
                    }
                } catch (error) {
                    console.error('Failed to load dashboard:', error);
                }
            }
            setLoading(false);
        };

        fetchDashboard();
    }, [storeSlug]);

    const stats = [
        { label: 'Active Bids', value: statsData.activeBids, icon: Gavel, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Orders', value: statsData.pendingOrders, icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Watchlist', value: statsData.watchlist, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Completed', value: statsData.completed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
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
                    <p className="text-gray-500">Welcome back</p>
                </div>
                <div className="text-sm text-gray-400">
                    Last login: Today, {new Date().toLocaleTimeString()}
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
                            <span className="text-2xl font-bold text-gray-900">
                                {loading ? '-' : stat.value}
                            </span>
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
                    {loading ? (
                        <p className="text-gray-400 text-sm">Loading activity...</p>
                    ) : recentActivity.length > 0 ? (
                        recentActivity.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-4 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                                <div>
                                    <p className="text-gray-900 font-medium text-sm">
                                        {item.status === 'PENDING' ? 'Placed a bid on ' : 'Update on '}
                                        <span className="font-bold">{item.vehicle}</span>
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm italic">No recent activity found.</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
