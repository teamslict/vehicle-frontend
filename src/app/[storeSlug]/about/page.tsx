'use client';

import { useTenant } from '@/lib/tenant-context';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Users, Award, ShieldCheck, Mail } from 'lucide-react';

export default function AboutPage() {
    const { tenant, storeSlug, loading } = useTenant();
    const t = useTranslations('About');
    const commonT = useTranslations('Common');

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="spinner" />
            </div>
        );
    }

    const primaryColor = tenant?.primaryColor || '#c62828';

    // Priority: New 'aboutUs' config -> Old 'companyProfile' -> Default
    const aboutConfig = tenant?.aboutUs;
    const profile = tenant?.companyProfile;

    // Default content
    const defaultStory = "We are a premier exporter of high-quality used vehicles from Japan to the world. With years of experience in the industry, we pride ourselves on transparency, reliability, and customer satisfaction.";
    const defaultMission = "To provide the best quality Japanese vehicles to the world with honest pricing and exceptional service.";

    const story = aboutConfig?.story || profile?.content || defaultStory;
    const mission = aboutConfig?.mission || defaultMission;

    // Stats
    const defaultStats = [
        { value: profile?.foundedYear || '2010', label: t('founded'), icon: 'Calendar' },
        { value: profile?.employees || '50+', label: t('employees'), icon: 'Users' },
        { value: '10k+', label: 'Happy Customers', icon: 'Smile' },
        { value: '150+', label: 'Countries Exported', icon: 'Globe' },
    ];
    const stats = aboutConfig?.stats && aboutConfig.stats.length > 0 ? aboutConfig.stats : defaultStats;

    // Values
    const defaultValues = [
        { title: "Quality Assurance", desc: "Every vehicle undergoes strict inspection.", icon: ShieldCheck },
        { title: "Transparency", desc: "No hidden fees, what you see is what you get.", icon: Award },
        { title: "Customer Support", desc: "Dedicated team available 24/7 for you.", icon: Users },
    ];
    // Map string icons from backend to Lucide components if needed, or render safely
    const values = aboutConfig?.values && aboutConfig.values.length > 0 ? aboutConfig.values : null;

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560179707-f14e90ef3dab?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40" />

                <div className="container-custom relative z-20 text-center flex flex-col items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        {profile?.title || t('title')}
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-gray-200 mt-8 px-4 text-center opacity-90">
                        {mission}
                    </p>
                    <div className="w-20 h-1 bg-white/30 mx-auto rounded-full mt-8" />
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text Content */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 border-l-4 pl-4 mb-6" style={{ borderColor: primaryColor }}>
                                    {t('ourStory')}
                                </h2>
                                <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {story}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all hover:shadow-md">
                                        <div className="text-3xl font-bold text-gray-900 mb-1" style={{ color: primaryColor }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image/Visual */}
                        <div className="relative h-full min-h-[400px]">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                                <Image
                                    src="https://images.unsplash.com/photo-1550305080-4e029753abcf?q=80&w=1200&auto=format&fit=crop"
                                    alt="Office"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            {/* Decorative element */}
                            <div
                                className="absolute -bottom-6 -right-6 w-3/4 h-3/4 rounded-2xl -z-10 opacity-10"
                                style={{ backgroundColor: primaryColor }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values/Features */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('values')}</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Our core principles that drive us to deliver the best for our customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(values || defaultValues).map((val: any, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors">
                                    {/* Icon rendering logic */}
                                    {val.icon && typeof val.icon !== 'string' ? (
                                        <val.icon className="w-7 h-7" style={{ color: primaryColor }} />
                                    ) : (
                                        <Award className="w-7 h-7" style={{ color: primaryColor }} />
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto bg-gray-900 rounded-3xl p-10 md:p-16 relative overflow-hidden text-white shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10" />

                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-6">Ready to find your dream car?</h2>
                            <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
                                Browse our inventory or contact us directly. We are here to help you every step of the way.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={`/${storeSlug}/vehicles`}
                                    className="px-8 py-3.5 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Browse Stock
                                </Link>
                                <Link
                                    href={`/${storeSlug}/contact`}
                                    className="px-8 py-3.5 bg-transparent border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    {t('contactUs')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
