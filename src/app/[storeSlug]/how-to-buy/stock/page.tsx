'use client';

import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import {
    UserPlus,
    Car,
    FileText,
    CreditCard,
    Ship,
    FileCheck,
    Check,
} from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    UserPlus,
    Car,
    FileText,
    CreditCard,
    Ship,
    FileCheck,
    Check,
};

// Default steps if not configured in backend
const defaultSteps = [
    {
        step: 1,
        title: 'Register with us',
        description: "It's free! Fill up the simple online form and click submit.",
        icon: 'UserPlus',
    },
    {
        step: 2,
        title: 'Select your vehicle',
        description: "Click 'inquiry' on your selected stock. Our sales person will contact you to finalise the price.",
        icon: 'Car',
    },
    {
        step: 3,
        title: 'Invoice',
        description: 'Once the price is agreed, we will send an invoice to your email with vehicle info, shipment details, and total price.',
        icon: 'FileText',
    },
    {
        step: 4,
        title: 'Payment',
        description: 'Make payment to the bank details on the invoice. Please mention the invoice number for reference.',
        icon: 'CreditCard',
    },
    {
        step: 5,
        title: 'Shipment',
        description: 'Once payment is confirmed, your vehicle will be prepared for shipment on the next available vessel.',
        icon: 'Ship',
    },
    {
        step: 6,
        title: 'Documents',
        description: 'When the shipment is complete with zero due balance, we will courier your vehicle documents to you.',
        icon: 'FileCheck',
    },
    {
        step: 7,
        title: 'Receive Vehicle',
        description: 'Submit the necessary original documents to your customs agent to clear the vehicle.',
        icon: 'Check',
    },
];

export default function HowToBuyStockPage() {
    const { tenant, storeSlug, loading } = useTenant();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    const primaryColor = tenant?.primaryColor || '#c62828';
    const steps = tenant?.howToBuyStockSteps || defaultSteps;

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
                        How to Buy Used Cars from {tenant?.storeName || 'Us'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        Follow these simple steps to purchase your dream vehicle from our stock
                    </motion.p>
                </div>
            </section>

            {/* Steps */}
            <section className="container-custom">
                <div className="max-w-4xl mx-auto space-y-6">
                    {steps.map((step, index) => {
                        const IconComponent = iconMap[step.icon || 'Check'] || Check;
                        return (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex gap-6 items-start p-6 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                                    style={{ background: primaryColor }}
                                >
                                    {step.step}
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span style={{ color: primaryColor }}>
                                            <IconComponent className="w-6 h-6" />
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${storeSlug}/auth/register`}
                            className="btn btn-primary text-lg px-8 py-3"
                            style={{ background: primaryColor }}
                        >
                            Register Now - It's Free!
                        </Link>
                        <Link
                            href={`/${storeSlug}/vehicles`}
                            className="btn btn-outline text-lg px-8 py-3"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                            Browse Stock
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
