const API_BASE = '/api/erp';

interface FetchOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
}

async function fetchWithRetry(
    url: string,
    options: FetchOptions = {},
    retries = 3,
    backoff = 1000
): Promise<Response> {
    try {
        const response = await fetch(url, options);
        if (!response.ok && response.status >= 500 && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        return response;
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
        }
        throw error;
    }
}

function buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
    const url = new URL(`${API_BASE}/${path}`, window.location.origin);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
    }
    return url.toString();
}

export interface Vehicle {
    id: string;
    title: string;
    stockNumber: string;
    price: number;
    currency: string;
    mileage: number;
    fuel: string;
    transmission: string;
    mainPhoto: string | null;
    status: string;
}

export interface VehicleDetail extends Vehicle {
    make: string;
    model: string;
    year: number;
    month?: number;
    chassisNumber: string;
    engineCc: number;
    fuelType: string;
    color: string;
    steering?: string;
    seats?: number;
    doors?: number;
    driveType?: string;
    bodyType?: string;
    fobPrice: number;
    cifPrice?: number;
    location?: string;
    auctionGrade?: string;
    photos: { url: string; tag?: string }[];
    features: string[];
    description?: string;
}

export interface VehicleListResponse {
    data: Vehicle[];
    meta: {
        total: number;
        limit: number;
        offset: number;
    };
}

export const api = {
    // Vehicles
    getVehicles: async (subdomain: string, params?: {
        make?: string;
        model?: string;
        minYear?: number;
        maxYear?: number;
        minPrice?: number;
        maxPrice?: number;
        fuelType?: string;
        transmission?: string;
        bodyType?: string;
        limit?: number;
        offset?: number;
        sort?: string;
        clearance?: boolean;
    }): Promise<VehicleListResponse> => {
        const url = buildUrl('vehicles', { subdomain, ...params });
        const res = await fetchWithRetry(url);
        return res.json();
    },

    getVehicle: async (subdomain: string, id: string): Promise<VehicleDetail> => {
        const url = buildUrl(`vehicles/${id}`, { subdomain });
        const res = await fetchWithRetry(url);
        return res.json();
    },

    // Bids / Inquiries
    submitInquiry: async (data: {
        subdomain: string;
        vehicleId?: string;
        customerEmail: string;
        customerName: string;
        customerPhone?: string;
        customerCountry?: string;
        amount?: number;
        message?: string;
        make?: string;
        model?: string;
    }) => {
        const res = await fetchWithRetry(`${API_BASE}/bids`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenantId: data.subdomain, ...data }),
        });
        return res.json();
    },

    // Config
    getConfig: async (subdomain: string) => {
        const url = buildUrl('config', { subdomain });
        const res = await fetchWithRetry(url);
        return res.json();
    },
};

export default api;
