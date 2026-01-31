'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    link?: string;
}

interface HeroSliderProps {
    slides: HeroSlide[];
    storeSlug: string;
    storeName: string;
    primaryColor: string;
}

export default function HeroSlider({ slides, storeSlug, storeName, primaryColor }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);

    // Auto-advance
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const defaultSlide: HeroSlide = {
        id: 'default',
        title: storeName || 'Japanese Used Cars',
        subtitle: 'Premium Vehicles Direct to You',
        imageUrl: '', // Will fall back to gradient
        link: undefined,
    };

    const activeSlide = slides.length > 0 ? slides[current] : defaultSlide;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {activeSlide.imageUrl ? (
                        <Image
                            src={activeSlide.imageUrl}
                            alt={activeSlide.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div
                            className="w-full h-full"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor} 0%, #000000 100%)`,
                            }}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="container-custom text-center text-white px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg tracking-tight">
                                {activeSlide.title}
                            </h1>
                            <p className="text-xl md:text-3xl text-gray-100 mb-8 font-light drop-shadow-md max-w-2xl mx-auto">
                                {activeSlide.subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={activeSlide.link || `/${storeSlug}/vehicles`}
                                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                >
                                    Browse Inventory
                                </Link>
                                <Link
                                    href={`/${storeSlug}/auctions`}
                                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-transform hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
                                >
                                    Live Auctions
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors border border-white/20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
