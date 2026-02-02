'use client';

import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useEffect, useState } from 'react';

interface FormattedPriceProps {
    amount: number;
    baseCurrency?: string;
    className?: string;
}

export default function FormattedPrice({ amount, baseCurrency = 'USD', className = '' }: FormattedPriceProps) {
    const { currency, rate } = useCurrencyStore();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span className={className}>...</span>;
    }

    const isJPY = currency === 'JPY';

    // Convert if necessary (assuming base is USD)
    const convertedAmount = isJPY ? (baseCurrency === 'USD' ? amount * rate : amount) : (baseCurrency === 'USD' ? amount : amount / rate);

    const formatted = new Intl.NumberFormat(currency === 'JPY' ? 'ja-JP' : 'en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(convertedAmount);

    return (
        <span className={className}>
            {formatted}
        </span>
    );
}
