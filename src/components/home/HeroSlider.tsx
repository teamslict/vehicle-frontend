'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo, type Transition } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSlide {
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    mobileImageUrl?: string;
    link?: string;
}

interface HeroSliderProps {
    slides: HeroSlide[];
    storeSlug: string;
    storeName: string;
    primaryColor: string;
}

// Shared transition
const smoothTransition: Transition = { duration: 0.6, ease: 'easeOut' };

// Animation variants for staggered text
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition
    }
};

const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: smoothTransition
    }
};

export default function HeroSlider({ slides, storeSlug, storeName, primaryColor }: HeroSliderProps) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1);
    const dragX = useMotionValue(0);
    const dragOpacity = useTransform(dragX, [-200, 0, 200], [0.5, 1, 0.5]);

    const SLIDE_DURATION = 6000;

    const defaultSlide: HeroSlide = {
        id: 'default',
        title: storeName || 'Premium Vehicles',
        subtitle: 'Direct from Japan to Your Doorstep',
        imageUrl: '',
        link: undefined,
    };

    const activeSlides = slides.length > 0 ? slides : [defaultSlide];
    const activeSlide = activeSlides[current];

    const goToSlide = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
        setProgress(0);
    }, [current]);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % activeSlides.length);
        setProgress(0);
    }, [activeSlides.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
        setProgress(0);
    }, [activeSlides.length]);

    // Auto-advance with progress
    useEffect(() => {
        if (activeSlides.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + (100 / (SLIDE_DURATION / 50));
            });
        }, 50);

        return () => clearInterval(interval);
    }, [activeSlides.length, isPaused, nextSlide]);

    // Swipe handling
    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x < -threshold) {
            nextSlide();
        } else if (info.offset.x > threshold) {
            prevSlide();
        }
    };

    // Image animation variants
    const imageVariants = {
        enter: (dir: number) => ({
            opacity: 0,
            scale: 1.1,
            x: dir > 0 ? 100 : -100,
        }),
        center: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.8, ease: 'easeOut' as const }
        },
        exit: (dir: number) => ({
            opacity: 0,
            scale: 0.95,
            x: dir > 0 ? -100 : 100,
            transition: { duration: 0.5, ease: 'easeOut' as const }
        })
    };

    return (
        <div
            className="relative h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden bg-black"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Image Layer */}
            <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                    style={{ opacity: dragOpacity }}
                >
                    {activeSlide.imageUrl ? (
                        <>
                            {/* Mobile image */}
                            {activeSlide.mobileImageUrl && (
                                <motion.div
                                    className="absolute inset-0 md:hidden"
                                    animate={{ scale: [1, 1.08] }}
                                    transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                                >
                                    <Image
                                        src={activeSlide.mobileImageUrl}
                                        alt={activeSlide.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="100vw"
                                    />
                                </motion.div>
                            )}
                            {/* Desktop image with Ken Burns */}
                            <motion.div
                                className={cn("absolute inset-0", activeSlide.mobileImageUrl ? "hidden md:block" : "")}
                                animate={{ scale: [1, 1.08] }}
                                transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                            >
                                <Image
                                    src={activeSlide.imageUrl}
                                    alt={activeSlide.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                            </motion.div>
                        </>
                    ) : (
                        <div
                            className="w-full h-full"
                            style={{
                                background: `linear-gradient(135deg, ${primaryColor} 0%, #0a0a0a 50%, #000000 100%)`,
                            }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

            {/* Content Layer */}
            <div className="absolute inset-0 flex items-center z-10">
                <div className="container mx-auto px-6 md:px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="max-w-4xl"
                        >
                            {/* Badge */}
                            <motion.div variants={itemVariants} className="mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Now Shipping Worldwide
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight"
                            >
                                <span className="block">{activeSlide.title}</span>
                            </motion.h1>

                            {/* Subtitle */}
                            {activeSlide.subtitle && (
                                <motion.p
                                    variants={itemVariants}
                                    className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-2xl font-light leading-relaxed"
                                >
                                    {activeSlide.subtitle}
                                </motion.p>
                            )}

                            {/* CTA Buttons */}
                            <motion.div variants={buttonVariants} className="flex flex-wrap gap-4">
                                <Link
                                    href={activeSlide.link || `/${storeSlug}/vehicles`}
                                    className="group relative overflow-hidden px-8 py-4 bg-white text-black font-bold rounded-full shadow-2xl shadow-white/20 flex items-center gap-3 transition-all duration-300 hover:shadow-white/40 hover:scale-105 active:scale-95"
                                >
                                    <span className="relative z-10">Browse Inventory</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href={`/${storeSlug}/auctions`}
                                    className="group px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-full flex items-center gap-3 transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 active:scale-95"
                                >
                                    <Play className="w-5 h-5 fill-white" />
                                    Live Auctions
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Controls */}
            {activeSlides.length > 1 && (
                <>
                    {/* Side Arrows - Desktop */}
                    <div className="hidden md:block">
                        <button
                            onClick={prevSlide}
                            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-110 active:scale-95 group"
                        >
                            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-110 active:scale-95 group"
                        >
                            <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Progress Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                        {activeSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className="group relative h-1 rounded-full overflow-hidden transition-all duration-300"
                                style={{ width: current === idx ? '48px' : '24px' }}
                            >
                                {/* Background */}
                                <div className="absolute inset-0 bg-white/30 rounded-full" />
                                {/* Progress fill */}
                                {current === idx && (
                                    <motion.div
                                        className="absolute inset-0 bg-white rounded-full origin-left"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: progress / 100 }}
                                        transition={{ duration: 0.05, ease: 'linear' }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Slide Counter */}
                    <div className="absolute bottom-8 right-8 hidden md:flex items-center gap-2 text-white/60 font-mono text-sm">
                        <span className="text-white font-bold text-lg">{String(current + 1).padStart(2, '0')}</span>
                        <span>/</span>
                        <span>{String(activeSlides.length).padStart(2, '0')}</span>
                    </div>
                </>
            )}

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
