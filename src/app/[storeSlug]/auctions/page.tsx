'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { Gavel, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AuctionsPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom text-center">
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
                        style={{ background: primaryColor }}
                    >
                        <Gavel size={40} />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Live Auction Access</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Our live auction system connects you directly to over 100+ Japanese auction houses.
                        To access real-time bidding, you need a verified account and a security deposit.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${storeSlug}/auth/register`}
                            className="btn btn-primary px-8 py-3 text-lg"
                            style={{ background: primaryColor }}
                        >
                            Create Account
                        </Link>
                        <Link
                            href={`/${storeSlug}/auth/login`}
                            className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Client Login
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Clock size={16} />
                        <span>Next auction starts in: Satisfy verify access</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
