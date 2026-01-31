'use client';

import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import {
    UserPlus,
    Shield,
    Gavel,
    Bell,
    FileText,
    CreditCard,
    Ship,
    FileCheck,
    Truck,
    PartyPopper,
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    UserPlus,
    Shield,
    Gavel,
    Bell,
    FileText,
    CreditCard,
    Ship,
    FileCheck,
    Truck,
    PartyPopper,
};

// Default steps if not configured in backend
const defaultSteps = [
    {
        step: 1,
        title: 'Register with us',
        description: 'Fill up the simple online registration form.',
        icon: 'UserPlus',
    },
    {
        step: 2,
        title: 'Security Deposit',
        description: 'Minimum USD 1000 deposit required to activate bidding. Refundable if no successful bid.',
        icon: 'Shield',
    },
    {
        step: 3,
        title: 'Start Bidding',
        description: 'Place bids on our auction website. Our agents will bid on your behalf during live auction.',
        icon: 'Gavel',
    },
    {
        step: 4,
        title: 'Auction Result',
        description: 'You will be notified via email and customer portal. Successful bids receive an invoice.',
        icon: 'Bell',
    },
    {
        step: 5,
        title: 'Invoice',
        description: 'Bidding price + auction commission = total price. Invoice sent with all relevant details.',
        icon: 'FileText',
    },
    {
        step: 6,
        title: 'Payment',
        description: 'Make payment to the bank details on the invoice. Please mention invoice number.',
        icon: 'CreditCard',
    },
    {
        step: 7,
        title: 'Shipment',
        description: 'Once payment is confirmed, vehicle prepared for shipment on next immediate vessel.',
        icon: 'Ship',
    },
    {
        step: 8,
        title: 'Documents',
        description: 'When shipment is complete with zero balance, we courier your vehicle documents.',
        icon: 'FileCheck',
    },
    {
        step: 9,
        title: 'Receive Vehicle',
        description: 'Submit original documents to your customs agent to clear the vehicle.',
        icon: 'Truck',
    },
    {
        step: 10,
        title: 'Enjoy!',
        description: 'The vehicle you bid for is now yours to enjoy!',
        icon: 'PartyPopper',
    },
];

export default function HowToBidPage() {
    const { tenant, storeSlug, loading } = useTenant();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    const primaryColor = tenant?.primaryColor || '#c62828';
    const steps = tenant?.howToBidSteps || defaultSteps;
    const minimumDeposit = tenant?.minimumDeposit || 1000;

    return (
        <div className="py-12">
            {/* Header */}
            <section
                className="py-16 mb-12"
                style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #1a1a1a 100%)` }}
            >
                <div className="container-custom text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Japanese Car Auction - How to Bid
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        Follow these steps to participate in Japanese car auctions and get your dream vehicle
                    </motion.p>
                </div>
            </section>

            {/* Deposit Info Banner */}
            <section className="container-custom mb-12">
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-blue-900 mb-1">Security Deposit Required</h3>
                        <p className="text-blue-700">
                            A minimum deposit of <strong>${minimumDeposit.toLocaleString()}</strong> is required to activate your bidding account.
                            This deposit is fully refundable if you don't secure a successful bid.
                        </p>
                    </div>
                    <Link
                        href={`/${storeSlug}/auth/register`}
                        className="btn bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap"
                    >
                        Open Bidding Account
                    </Link>
                </div>
            </section>

            {/* Steps */}
            <section className="container-custom">
                <div className="max-w-4xl mx-auto space-y-6">
                    {steps.map((step, index) => {
                        const IconComponent = iconMap[step.icon || 'Check'] || PartyPopper;
                        return (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="step-item"
                            >
                                <div className="step-number" style={{ background: primaryColor }}>
                                    {step.step}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span style={{ color: primaryColor }}>
                                            <IconComponent className="w-5 h-5" />
                                        </span>
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <h3 className="text-2xl font-bold mb-4">Ready to Start Bidding?</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${storeSlug}/auth/register`}
                            className="btn btn-primary text-lg px-8 py-3"
                            style={{ background: primaryColor }}
                        >
                            Register & Deposit Now
                        </Link>
                        <Link
                            href={`/${storeSlug}/auctions`}
                            className="btn btn-outline text-lg px-8 py-3"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                            Browse Auctions
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
