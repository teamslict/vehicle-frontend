'use client';

import { useTenant } from '@/lib/tenant-context';
import { FilterSidebar } from '@/components/vehicles/FilterSidebar';
import VehicleCard from '@/components/home/VehicleCard';
import { ChevronDown, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useState, use, useEffect } from 'react';
import { api, Vehicle } from '@/lib/api';

export default function VehiclesPage({ params }: { params: Promise<{ storeSlug: string }> }) {
    const { storeSlug } = use(params);
    const { tenant } = useTenant();
    const primaryColor = tenant?.primaryColor || '#c62828';
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [sort, setSort] = useState('newest');
    const limit = 12;

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            setError(null);
            try {
                // Map filters to API params
                const params: any = { ...filters };

                if (filters.year) {
                    params.minYear = filters.year;
                    params.maxYear = filters.year;
                    delete params.year;
                }

                if (filters.price) {
                    if (filters.price === 'Under $10,000') {
                        params.maxPrice = '10000';
                    } else if (filters.price === '$10,000 - $20,000') {
                        params.minPrice = '10000';
                        params.maxPrice = '20000';
                    } else if (filters.price === '$20,000 - $30,000') {
                        params.minPrice = '20000';
                        params.maxPrice = '30000';
                    } else if (filters.price === '$30,000+') {
                        params.minPrice = '30000';
                    }
                    delete params.price;
                }

                if (filters.engineCc) {
                    if (filters.engineCc === 'Under 1000cc') {
                        params.maxEngineCc = '1000';
                    } else if (filters.engineCc === '1000cc - 1500cc') {
                        params.minEngineCc = '1000';
                        params.maxEngineCc = '1500';
                    } else if (filters.engineCc === '1500cc - 2000cc') {
                        params.minEngineCc = '1500';
                        params.maxEngineCc = '2000';
                    } else if (filters.engineCc === 'Over 2000cc') {
                        params.minEngineCc = '2000';
                    }
                    delete params.engineCc;
                }

                const response = await api.getVehicles(storeSlug, {
                    limit,
                    offset: (page - 1) * limit,
                    sort,
                    ...params
                });
                setVehicles(response.data || []);
                setTotal(response.meta?.total || 0);
            } catch (err) {
                console.error('Failed to fetch vehicles:', err);
                setError('Failed to load vehicles. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [storeSlug, page, filters, sort]);

    const handleFilterChange = (newFilters: Record<string, string>) => {
        setFilters(newFilters);
        setPage(1); // Reset to first page when filtering
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container-custom">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Vehicle Stock</h1>
                        <p className="text-gray-500 mt-1">
                            {loading ? 'Loading...' : `Showing ${vehicles.length} of ${total} vehicles`}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <SlidersHorizontal size={18} />
                            Filters
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    setPage(1);
                                }}
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer font-medium"
                            >
                                <option value="newest">Sort by: Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="year_desc">Year: Newest</option>
                                <option value="mileage_asc">Mileage: Low to High</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`lg:block ${isMobileFiltersOpen ? 'block' : 'hidden'}`}>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                            <FilterSidebar onFilterChange={handleFilterChange} />
                        </div>
                    </aside>

                    {/* Vehicle Grid */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Loading State */}
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                                <span className="ml-3 text-gray-500">Loading vehicles...</span>
                            </div>
                        )}

                        {/* Error State */}
                        {error && !loading && (
                            <div className="text-center py-20">
                                <p className="text-red-500 mb-4">{error}</p>
                                <button
                                    onClick={() => setPage(1)}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && !error && vehicles.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No vehicles found</p>
                                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
                            </div>
                        )}

                        {/* Grid */}
                        {!loading && !error && vehicles.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {vehicles.map((vehicle, i) => (
                                        <VehicleCard
                                            key={vehicle.id}
                                            vehicle={vehicle}
                                            index={i}
                                            primaryColor={primaryColor}
                                            storeSlug={storeSlug}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-12">
                                        <nav className="flex items-center gap-2">
                                            <button
                                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                                disabled={page === 1}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                &lt;
                                            </button>
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium ${page === p
                                                        ? 'bg-gray-900 text-white'
                                                        : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                                disabled={page === totalPages}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                &gt;
                                            </button>
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
