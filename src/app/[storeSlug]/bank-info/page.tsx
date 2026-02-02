'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { Copy, Check, Building2, CreditCard, MapPin, Globe } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function BankInfoPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant, loading } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // Copy to clipboard logic
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string | undefined, fieldName: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(null), 2000);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="spinner" /></div>;
    }

    const bank = tenant?.bankDetails;

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Bank Transfer Details</h1>
                    <p className="text-lg text-gray-600">
                        Please use the following bank details for all wire transfers.
                        Always quote your Invoice Number as the reference.
                    </p>
                </div>

                {!bank?.bankName ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
                        <Building2 className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-yellow-900 mb-2">Bank Details Not Configured</h3>
                        <p className="text-yellow-700">Please contact our support team for payment instructions.</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-gray-900 text-white p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Building2 size={150} />
                            </div>
                            <h2 className="text-2xl font-bold relative z-10">Official Bank Account</h2>
                            <p className="opacity-80 relative z-10 mt-1">For International Wire Transfers (TT)</p>
                        </div>

                        {/* Details Grid */}
                        <div className="p-8 md:p-10 space-y-8">

                            {/* Account Name */}
                            <div className="group relative bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                            <Building2 size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Beneficiary Name</p>
                                            <p className="text-xl font-bold text-gray-900 break-all">{bank.accountName || '-'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(bank.accountName, 'accountName')}
                                        className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                                    >
                                        {copiedField === 'accountName' ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Bank Name */}
                            <div className="group relative bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                                            <p className="text-xl font-bold text-gray-900">{bank.bankName || '-'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(bank.bankName, 'bankName')}
                                        className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                                    >
                                        {copiedField === 'bankName' ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Account Number */}
                                <div className="group relative bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
                                            <p className="text-xl font-mono font-bold text-gray-900 tracking-wide">{bank.accountNumber || '-'}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(bank.accountNumber, 'accountNumber')}
                                            className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                                        >
                                            {copiedField === 'accountNumber' ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* SWIFT Code */}
                                <div className="group relative bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-blue-200 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">SWIFT / BIC Code</p>
                                            <p className="text-xl font-mono font-bold text-gray-900 tracking-wide">{bank.swiftCode || '-'}</p>
                                        </div>
                                        <button
                                            onClick={() => handleCopy(bank.swiftCode, 'swiftCode')}
                                            className="text-gray-400 hover:text-blue-600 transition-colors p-2"
                                        >
                                            {copiedField === 'swiftCode' ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Branch & Address */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 border-l-4 border-gray-200 pl-6">
                                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                                        <MapPin size={16} />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Branch</span>
                                    </div>
                                    <p className="text-lg font-medium text-gray-900">{bank.branch || '-'}</p>
                                </div>
                                <div className="p-4 border-l-4 border-gray-200 pl-6">
                                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                                        <Globe size={16} />
                                        <span className="text-sm font-semibold uppercase tracking-wider">Address</span>
                                    </div>
                                    <p className="text-lg font-medium text-gray-900">{bank.bankAddress || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Warning */}
                        <div className="bg-red-50 p-6 border-t border-red-100 flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-red-600 font-bold text-sm">!</span>
                            </div>
                            <p className="text-sm text-red-800 leading-relaxed">
                                <strong>Important:</strong> International transfers may take 3-5 business days to reflect.
                                Please ensure you cover all intermediary bank fees so that the full amount is received.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
