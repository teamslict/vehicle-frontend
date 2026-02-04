'use client';

import { use, useEffect, useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Lock, Save, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export default function ProfilePage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    const [loading, setLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [passData, setPassData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const email = localStorage.getItem('user_email');
            if (email) {
                try {
                    const data = await api.getCustomerProfile(storeSlug, email);
                    if (data) {
                        setFormData({
                            name: data.name || '',
                            email: data.email || email,
                            phone: data.phone || '',
                            address: data.address || '',
                        });
                    }
                } catch (err) {
                    console.error('Fetch profile failed:', err);
                }
            }
        };
        fetchProfile();
    }, [storeSlug]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.updateCustomerProfile({
                subdomain: storeSlug,
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                address: formData.address
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        if (passData.newPassword.length < 6) {
            return toast.error('Password must be at least 6 characters');
        }

        setPassLoading(true);
        try {
            const res = await api.updateCustomerPassword({
                subdomain: storeSlug,
                email: formData.email,
                currentPassword: passData.currentPassword,
                newPassword: passData.newPassword
            });
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success('Password updated successfully');
                setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            toast.error('Failed to update password');
        } finally {
            setPassLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
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
                                            required
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
                                    <p className="mt-1 text-xs text-gray-400">Email cannot be changed.</p>
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
                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        value={passData.currentPassword}
                                        onChange={e => setPassData({ ...passData, currentPassword: e.target.value })}
                                        className="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        placeholder="••••••••"
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">Optional if first time</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passData.newPassword}
                                        onChange={e => setPassData({ ...passData, newPassword: e.target.value })}
                                        className="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={passData.confirmPassword}
                                        onChange={e => setPassData({ ...passData, confirmPassword: e.target.value })}
                                        className="block w-full border-gray-300 rounded-lg focus:ring-primary focus:border-primary sm:text-sm py-2.5"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={passLoading}
                                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    {passLoading && <Loader2 className="animate-spin" size={16} />}
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
