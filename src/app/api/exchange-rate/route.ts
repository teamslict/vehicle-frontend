//
// Exchange Rate API - Fetches live USD/JPY rates with caching
//

import { NextResponse } from 'next/server';

// In-memory cache
let cachedRate: { rate: number; updatedAt: Date } | null = null;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

const FALLBACK_RATE = 153.50;

export async function GET() {
    // Return cached rate if still fresh
    if (cachedRate && Date.now() - cachedRate.updatedAt.getTime() < CACHE_DURATION_MS) {
        return NextResponse.json({
            rate: cachedRate.rate,
            updatedAt: cachedRate.updatedAt.toISOString(),
            cached: true,
        });
    }

    try {
        // Using Frankfurter API - free, no API key required, maintained by ECB
        const response = await fetch(
            'https://api.frankfurter.app/latest?from=USD&to=JPY',
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error(`API responded with ${response.status}`);
        }

        const data = await response.json();

        if (!data.rates?.JPY) {
            throw new Error('JPY rate not found in response');
        }

        const rate = data.rates.JPY;
        cachedRate = { rate, updatedAt: new Date() };

        return NextResponse.json({
            rate,
            updatedAt: cachedRate.updatedAt.toISOString(),
            cached: false,
        });
    } catch (error) {
        console.error('Exchange rate fetch failed:', error);

        // Return cached rate if available, even if stale
        if (cachedRate) {
            return NextResponse.json({
                rate: cachedRate.rate,
                updatedAt: cachedRate.updatedAt.toISOString(),
                cached: true,
                stale: true,
            });
        }

        // Ultimate fallback
        return NextResponse.json({
            rate: FALLBACK_RATE,
            updatedAt: new Date().toISOString(),
            fallback: true,
        });
    }
}
