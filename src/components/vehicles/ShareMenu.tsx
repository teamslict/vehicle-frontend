"use client";

import { useState } from 'react';
import { Share2, Link2, MessageCircle, Facebook, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface ShareMenuProps {
    title: string;
    url: string;
}

export default function ShareMenu({ title, url }: ShareMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareData = {
        title,
        text: `Check out this vehicle: ${title}`,
        url,
    };

    const handleShare = async (platform: 'whatsapp' | 'facebook' | 'native') => {
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(shareData.text);

        if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        } else if (platform === 'native') {
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Share failed:', err);
                }
            } else {
                copyToClipboard();
            }
        }
        setIsOpen(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
                <Share2 size={16} /> Share
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-50 origin-top-right"
                        >
                            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Share vehicle
                            </div>

                            <button
                                onClick={() => handleShare('whatsapp')}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors group"
                            >
                                <div className="p-1.5 bg-green-100 rounded-md group-hover:bg-green-200">
                                    <MessageCircle size={16} className="text-green-600" />
                                </div>
                                WhatsApp
                            </button>

                            <button
                                onClick={() => handleShare('facebook')}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors group"
                            >
                                <div className="p-1.5 bg-blue-100 rounded-md group-hover:bg-blue-200">
                                    <Facebook size={16} className="text-blue-600" />
                                </div>
                                Facebook
                            </button>

                            <button
                                onClick={copyToClipboard}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                            >
                                <div className="p-1.5 bg-gray-100 rounded-md group-hover:bg-gray-200">
                                    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-600" />}
                                </div>
                                {copied ? 'Copied!' : 'Copy Link'}
                            </button>

                            {typeof navigator !== 'undefined' && !!navigator.share && (
                                <button
                                    onClick={() => handleShare('native')}
                                    className="w-full flex items-center gap-3 mt-1 px-3 py-2 text-xs font-medium text-indigo-600 hover:underline"
                                >
                                    More sharing options...
                                </button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
