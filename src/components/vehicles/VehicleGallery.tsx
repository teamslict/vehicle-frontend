"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface VehicleGalleryProps {
    images: string[];
    primaryColor: string;
    stockNumber?: string;
}

export default function VehicleGallery({ images, primaryColor, stockNumber }: VehicleGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const downloadAllImages = async () => {
        if (!images.length) return;
        setIsDownloading(true);

        try {
            const response = await fetch('/api/download-images', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images, stockNumber }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Download failed');
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${stockNumber || 'vehicle'}-pictures.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download images. Please try again later.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        {images[currentIndex] ? (
                            <Image
                                src={images[currentIndex]}
                                alt={`Vehicle image ${currentIndex + 1}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-300">
                                <span className="text-6xl font-light">NO IMAGE</span>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows (visible on hover) */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={prevImage}
                        className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${currentIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        style={{ borderColor: currentIndex === idx ? primaryColor : 'transparent' }}
                    >
                        {img ? (
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200" />
                        )}

                    </button>
                ))}
            </div>

            {/* Download Button */}
            <button
                onClick={downloadAllImages}
                disabled={isDownloading || images.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold rounded-lg transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-wide mt-4"
            >
                {isDownloading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Download className="w-5 h-5" />
                )}
                {isDownloading ? 'Preparing ZIP...' : 'Download all pictures'}
            </button>
        </div>
    );
}
