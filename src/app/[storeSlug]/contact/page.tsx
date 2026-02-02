'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant, loading } = useTenant();
    const t = useTranslations('About'); // Reusing or new namespace if needed

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="spinner" /></div>;
    }

    const primaryColor = tenant?.primaryColor || '#c62828';

    // Config Data
    const config = tenant?.contactPage;

    // Defaults matching the tone of the site
    const title = config?.title || "Contact Us";
    const subtitle = config?.subtitle || "We're here to help you find your perfect vehicle. Reach out to our team via phone, email, or visit our office.";
    const businessHours = config?.businessHours || "Mon - Sat: 9:00 AM - 6:00 PM";

    // Map URL parsing (handle iframe src or direct link)
    const mapSrc = config?.mapUrl?.includes('src="')
        ? config.mapUrl.match(/src="([^"]+)"/)?.[1]
        : config?.mapUrl;

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop')" }}
                />

                <div className="container-custom text-center relative z-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-gray-200 max-w-2xl mx-auto text-lg opacity-90">
                        {subtitle}
                    </p>
                    <div className="w-20 h-1 bg-white/30 mx-auto rounded-full mt-8" />
                </div>
            </div>

            <div className="container-custom py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                                Get in Touch
                            </h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                        <Phone size={22} style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Phone & WhatsApp</h3>
                                        <p className="text-gray-600 mt-1">{tenant?.contactPhone || '+81 123 456 7890'}</p>
                                        <p className="text-gray-600">{tenant?.whatsappNumber}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                        <Mail size={22} style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                                        <p className="text-gray-600 mt-1 hover:text-blue-600 transition-colors">
                                            {tenant?.contactEmail || 'sales@vehicleexport.com'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                        <MapPin size={22} style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Office Location</h3>
                                        <p className="text-gray-600 mt-1 leading-relaxed max-w-sm">
                                            {tenant?.address || '1-2-3 Minato Mirai, Nishi-ku, Yokohama, Japan'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-900 shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                        <Clock size={22} style={{ color: primaryColor }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-lg">Business Hours</h3>
                                        <p className="text-gray-600 mt-1">
                                            {businessHours}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Integration */}
                        <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-100 relative group">
                            {mapSrc ? (
                                <iframe
                                    src={mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <MapPin size={40} className="mb-2 opacity-50" />
                                    <span className="text-sm font-medium">Map Location Not Configured</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2" style={{ background: primaryColor }} />

                        <div className="flex items-center gap-3 mb-8">
                            <MessageSquare className="w-6 h-6" style={{ color: primaryColor }} />
                            <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                                    <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent py-3 px-4 transition-all" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input type="email" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent py-3 px-4 transition-all" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <input type="text" className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent py-3 px-4 transition-all" placeholder="Inquiry about..." />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea rows={5} className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent py-3 px-4 transition-all resize-none" placeholder="How can we help you?" />
                            </div>

                            <button
                                type="button" // Change to submit when connected
                                className="w-full text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mt-4"
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
