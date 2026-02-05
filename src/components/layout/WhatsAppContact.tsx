"use client";

import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTenant } from '@/lib/tenant-context';

interface WhatsAppContactProps {
    phoneNumber?: string;
    message?: string;
}

export default function WhatsAppContact({ phoneNumber: propPhone, message: propMessage }: WhatsAppContactProps) {
    const { tenant } = useTenant();

    const phoneNumber = propPhone || tenant?.whatsappNumber || tenant?.contactPhone || '+819012345678';
    const message = propMessage || `Hi ${tenant?.storeName || ''}, I would like to inquire about a vehicle.`;

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber.replace(/\+/g, '').replace(/\s/g, '')}?text=${encodedMessage}`, '_blank');
    };

    if (!phoneNumber) return null;

    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
        >
            <div className="hidden group-hover:block font-bold pl-2 pr-1 transition-all">
                Chat with us
            </div>
            <MessageCircle size={24} fill="white" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
            </span>
        </motion.button>
    );
}
