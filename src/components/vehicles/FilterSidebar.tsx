"use client";

import { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { ChevronDown, ChevronRight, Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function FilterSidebar() {
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    // Mock data - would typically come from API/Context
    const filters = [
        {
            id: 'make',
            label: 'Make',
            options: ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Suzuki', 'Mitsubishi', 'Subaru']
        },
        {
            id: 'model',
            label: 'Model',
            options: ['Prius', 'Aqua', 'Vitz', 'Fit', 'Axio', 'Premio']
        },
        {
            id: 'year',
            label: 'Year',
            options: ['2024', '2023', '2022', '2021', '2020', 'Older']
        },
        {
            id: 'price',
            label: 'Price Range',
            options: ['Under $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000+']
        },
        {
            id: 'body',
            label: 'Body Type',
            options: ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Van/Minivan']
        }
    ];

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        make: true,
        model: true,
        year: false,
        price: false,
        body: false
    });

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    Filters
                </h3>
                <button className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors">
                    Clear All
                </button>
            </div>

            {/* Filter Sections */}
            <div className="space-y-1">
                {filters.map((section) => (
                    <div key={section.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between py-3 group"
                        >
                            <span className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">
                                {section.label}
                            </span>
                            {openSections[section.id] ? (
                                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                            )}
                        </button>

                        <AnimatePresence>
                            {openSections[section.id] && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-2 pb-2 pl-1">
                                        {section.options.map((option, idx) => (
                                            <label key={idx} className="flex items-center gap-3 cursor-pointer group py-1">
                                                <div className="relative flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="peer h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-all cursor-pointer"
                                                        style={{ color: primaryColor }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                                    {option}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
