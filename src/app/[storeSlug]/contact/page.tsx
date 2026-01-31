'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-gray-900 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We're here to help you find your perfect vehicle. Reach out to our team via phone, email, or visit our office.
                    </p>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Phone & WhatsApp</h3>
                                        <p className="text-gray-600 mt-1">{tenant?.contactPhone || '+81 123 456 7890'}</p>
                                        <p className="text-gray-600">{tenant?.whatsappNumber || '+81 123 456 7890'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Email</h3>
                                        <p className="text-gray-600 mt-1">{tenant?.contactEmail || 'sales@vehicleexport.com'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Office Location</h3>
                                        <p className="text-gray-600 mt-1 leading-relaxed">
                                            {tenant?.address || '1-2-3 Minato Mirai, Nishi-ku, Yokohama, Japan'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-gray-100 rounded-xl overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                [Google Map Integration]
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" className="w-full rounded-lg border-gray-300 focus:ring-black focus:border-black py-2.5" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" className="w-full rounded-lg border-gray-300 focus:ring-black focus:border-black py-2.5" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <input type="text" className="w-full rounded-lg border-gray-300 focus:ring-black focus:border-black py-2.5" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea rows={4} className="w-full rounded-lg border-gray-300 focus:ring-black focus:border-black py-2.5" />
                            </div>

                            <button
                                className="w-full btn btn-primary py-3 font-bold text-lg flex items-center justify-center gap-2"
                                style={{ background: primaryColor }}
                            >
                                <Send size={20} /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
