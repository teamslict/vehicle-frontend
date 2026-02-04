'use client';

import { use, useEffect, useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gavel, Calendar, DollarSign, ArrowRight, Loader2, X } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface Bid {
    id: string;
    vehicleId: string | null;
    status: string;
    maxBudget: string | number;
    currency: string;
    createdAt: string;
    vehicle?: {
        make: string;
        model: string;
        year: number;
        photos: { url: string }[];
    };
    requestedMake: string;
    requestedModel: string;
}

export default function MyBidsPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();

    const [bids, setBids] = useState<Bid[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
    const [newAmount, setNewAmount] = useState<string>('');
    const [updating, setUpdating] = useState(false);

    const fetchBids = async () => {
        const email = localStorage.getItem('user_email');
        if (!email) return;

        try {
            const data = await api.getCustomerBids(storeSlug, email);
            if (Array.isArray(data)) {
                setBids(data);
            }
        } catch (error) {
            console.error('Failed to fetch bids:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBids();
    }, [storeSlug]);

    const handleUpdateClick = (bid: Bid) => {
        setSelectedBid(bid);
        setNewAmount(bid.maxBudget.toString());
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = localStorage.getItem('user_email');
        if (!email || !selectedBid) return;

        setUpdating(true);
        try {
            const res = await api.updateCustomerBid({
                subdomain: storeSlug,
                email,
                bidId: selectedBid.id,
                amount: parseFloat(newAmount)
            });

            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Bid updated successfully');
                setSelectedBid(null);
                fetchBids(); // Refresh list
            }
        } catch (error) {
            toast.error('Failed to update bid');
        } finally {
            setUpdating(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
            case 'APPROVED': return 'bg-blue-100 text-blue-700';
            case 'WON': return 'bg-green-100 text-green-700';
            case 'LOST':
            case 'REJECTED': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) {
        return <div className="flex justify-center py-12"><Loader2 className="animate-spin text-gray-400" /></div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Bids</h1>
                <p className="text-gray-500">Track the status of your vehicle bids</p>
            </div>

            {bids.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-gray-500 mb-4">You haven't placed any bids yet.</p>
                    <Link href={`/${storeSlug}/vehicles`} className="text-primary hover:underline font-medium">
                        Browse Vehicles
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {bids.map((bid, idx) => {
                        const vehicleName = bid.vehicle
                            ? `${bid.vehicle.year} ${bid.vehicle.make} ${bid.vehicle.model}`
                            : `${bid.requestedMake} ${bid.requestedModel}`;

                        const photoUrl = bid.vehicle?.photos?.[0]?.url;

                        return (
                            <motion.div
                                key={bid.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    {/* Image Placeholder */}
                                    <div className="w-full md:w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                                        {photoUrl ? (
                                            <img src={photoUrl} alt={vehicleName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Gavel size={24} opacity={0.5} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg">
                                                {bid.vehicleId ? (
                                                    <Link href={`/${storeSlug}/vehicles/${bid.vehicleId}`} className="hover:underline">
                                                        {vehicleName}
                                                    </Link>
                                                ) : (
                                                    <span>{vehicleName}</span>
                                                )}
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(bid.status)}`}>
                                                {bid.status}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <span className="font-mono font-medium text-gray-900">#{bid.id.slice(-6)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Your Bid:</span>
                                            <span className="text-lg font-bold text-gray-900">
                                                {Number(bid.maxBudget).toLocaleString()} {bid.currency}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex flex-col gap-2">
                                        {bid.vehicleId && (
                                            <Link
                                                href={`/${storeSlug}/vehicles/${bid.vehicleId}`}
                                                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                            >
                                                View Vehicle <ArrowRight size={14} />
                                            </Link>
                                        )}
                                        {['PENDING', 'APPROVED'].includes(bid.status) && (
                                            <button
                                                onClick={() => handleUpdateClick(bid)}
                                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                Update Bid
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Update Bid Modal Overlay */}
            {selectedBid && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Update Bid Amount</h3>
                            <button onClick={() => setSelectedBid(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Budget</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <DollarSign size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={newAmount}
                                        onChange={e => setNewAmount(e.target.value)}
                                        className="block w-full pl-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">{selectedBid.currency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setSelectedBid(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
                                >
                                    {updating && <Loader2 className="animate-spin" size={14} />}
                                    Update Bid
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
