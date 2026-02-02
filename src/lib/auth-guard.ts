'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export function useAuthGuard() {
    const router = useRouter();
    const params = useParams();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for mocked session
        // In a real app, this would check a cookie or call an auth API
        const session = localStorage.getItem('mock_session');

        if (!session) {
            const storeSlug = params?.storeSlug as string;
            // Redirect to login
            if (storeSlug) {
                router.push(`/${storeSlug}/auth/login?redirect=dashboard/wallet`);
            } else {
                router.push('/'); // Fallback
            }
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [router, params]);

    return { isAuthenticated, isLoading };
}
