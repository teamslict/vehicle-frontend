'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderNewPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Brand New Vehicles</h1>
                        <p className="text-lg text-gray-600">
                            Skip the auction uncertainty. Order factory-fresh vehicles directly from Japan's top manufacturers.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Order New?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                'Full Manufacturer Warranty',
                                'Custom Specification Orders',
                                'Latest Models & Features',
                                'Perfect Condition Guaranteed',
                                'Zero Mileage',
                                'Direct Export Pricing'
                            ].map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-blue-900 rounded-2xl p-8 text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Order?</h3>
                        <p className="mb-8 text-blue-100">
                            Contact our specialist team to discuss your requirements and get a quote for your dream vehicle.
                        </p>
                        <Link
                            href={`/${storeSlug}/request-vehicle?type=new`}
                            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
                        >
                            Request Quote <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
