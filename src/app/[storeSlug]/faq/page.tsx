'use client';

import { use } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';

    const faqs = tenant?.faqItems || [
        {
            question: "How do I purchase a vehicle?",
            answer: "You can purchase directly from our stock list or bid in the auctions. For stock items, simply click 'Inquire Now'. For auctions, you'll need a registered account and a deposit."
        },
        {
            question: "What is the shipping duration?",
            answer: "Shipping times vary by destination. Typically: Asia (2-3 weeks), Africa (4-6 weeks), Caribbean (4-6 weeks), Europe (5-7 weeks). We will provide a specific schedule upon booking."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We primarily accept Bank Telegraphic Transfer (TT). We also support Letters of Credit (LC) for select countries and bulk orders."
        },
        {
            question: "Do you inspect the vehicles?",
            answer: "Yes, all vehicles undergo a mandatory pre-export inspection (JAAI/JEVIC/EAA) as required by your country's regulations. We also perform our own quality checks."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-600">Find answers to common questions about our services and process.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} question={faq.question} answer={faq.answer} primaryColor={primaryColor} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer, primaryColor }: { question: string, answer: string, primaryColor: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-gray-900 text-lg">{question}</span>
                {isOpen ? (
                    <Minus size={20} style={{ color: primaryColor }} />
                ) : (
                    <Plus size={20} className="text-gray-400" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}
