'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Lock, Save, Loader2 } from 'lucide-react';

export default function ProfilePage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, New York, NY 10001',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-500">Manage your personal information and security</p>
            </div>

            <div className="space-y-6">
                {/* Personal Information Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            <User size={18} className="text-gray-500" />
                            Personal Information
                        </h2>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="block w-full pl-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="block w-full pl-10 border-gray-200 bg-gray-50 text-gray-500 rounded-lg sm:text-sm py-2.5 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-400">Email cannot be changed contact support.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="block w-full pl-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin size={16} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                                            className="block w-full pl-10 border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 rounded-lg text-white font-medium text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-all disabled:opacity-70"
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Security Card */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Lock size={18} className="text-gray-500" />
                            Security
                        </h2>
                    </div>

                    <div className="p-6">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        className="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        className="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="button"
                                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
