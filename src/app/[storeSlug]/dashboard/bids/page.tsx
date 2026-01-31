'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gavel, Calendar, DollarSign, ArrowRight, Clock } from 'lucide-react';

export default function MyBidsPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // Mock Bids Data
    const bids = [
        {
            id: 'BID-1001',
            vehicleName: '2019 Toyota Prius S Touring',
            stockId: '1005',
            bidAmount: 11500,
            status: 'active', // active, won, lost
            date: '2024-03-15',
            image: '' // Placeholder
        },
        {
            id: 'BID-1002',
            vehicleName: '2018 Honda Vezel Hybrid Z',
            stockId: '1008',
            bidAmount: 18200,
            status: 'won',
            date: '2024-03-10',
            image: ''
        },
        {
            id: 'BID-1003',
            vehicleName: '2020 Mazda CX-5',
            stockId: '1012',
            bidAmount: 22000,
            status: 'lost',
            date: '2024-03-01',
            image: ''
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-blue-100 text-blue-700';
            case 'won': return 'bg-green-100 text-green-700';
            case 'lost': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
                <p className="text-gray-500">Track the status of your vehicle bids</p>
            </div>

            <div className="space-y-4">
                {bids.map((bid, idx) => (
                    <motion.div
                        key={bid.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Image Placeholder */}
                            <div className="w-full md:w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0" />

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg">
                                        <Link href={`/${storeSlug}/vehicles/${bid.stockId}`} className="hover:underline">
                                            {bid.vehicleName}
                                        </Link>
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(bid.status)}`}>
                                        {bid.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <span className="font-mono font-medium text-gray-900">#{bid.stockId}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{bid.date}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Your Bid:</span>
                                    <span className="text-lg font-bold text-gray-900">${bid.bidAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="w-full md:w-auto flex flex-col gap-2">
                                <Link
                                    href={`/${storeSlug}/vehicles/${bid.stockId}`}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    View Vehicle <ArrowRight size={14} />
                                </Link>
                                {bid.status === 'active' && (
                                    <button
                                        className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Update Bid
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
