'use client';

import { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function RequestVehiclePage() {
    const { tenant, storeSlug, loading } = useTenant();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        make: '',
        model: '',
        yearFrom: '',
        yearTo: '',
        fuel: '',
        fuelType: '',
        transmission: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // TODO: Connect to API
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Request submitted successfully! We will contact you shortly.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                make: '',
                model: '',
                yearFrom: '',
                yearTo: '',
                fuel: '',
                fuelType: '',
                transmission: '',
                message: '',
            });
        } catch {
            toast.error('Failed to submit request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    const primaryColor = tenant?.primaryColor || '#c62828';

    const makes = [
        'Toyota', 'Nissan', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru',
        'Suzuki', 'Daihatsu', 'Isuzu', 'Hino', 'BMW', 'Mercedes Benz',
        'Audi', 'Volkswagen', 'Lexus', 'Land Rover', 'Volvo', 'Ford',
    ];

    const fuels = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'];
    const fuelTypes = ['Any', 'Efficient', 'High Performance'];
    const transmissions = ['Any', 'Automatic', 'Manual', 'CVT'];

    return (
        <div className="py-12">
            {/* Header */}
            <section
                className="py-16 mb-12"
                style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #1a1a1a 100%)` }}
            >
                <div className="container-custom text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Request for Vehicle
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        Can't find what you're looking for? Tell us your requirements and we'll find it for you!
                    </motion.p>
                </div>
            </section>

            {/* Form */}
            <section className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl shadow-xl p-8 border"
                    >
                        {/* Contact Info */}
                        <h2 className="text-xl font-bold mb-6 pb-4 border-b">Your Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                    placeholder="+1234567890"
                                />
                            </div>
                        </div>

                        {/* Vehicle Details */}
                        <h2 className="text-xl font-bold mb-6 pb-4 border-b">Vehicle Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Make</label>
                                <select
                                    value={formData.make}
                                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                >
                                    <option value="">Select a Make</option>
                                    {makes.map((make) => (
                                        <option key={make} value={make}>{make}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Model</label>
                                <input
                                    type="text"
                                    value={formData.model}
                                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                    placeholder="e.g. Prius, Corolla"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Year From</label>
                                    <select
                                        value={formData.yearFrom}
                                        onChange={(e) => setFormData({ ...formData, yearFrom: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                    >
                                        <option value="">Year</option>
                                        {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Year To</label>
                                    <select
                                        value={formData.yearTo}
                                        onChange={(e) => setFormData({ ...formData, yearTo: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                    >
                                        <option value="">All</option>
                                        {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Fuel</label>
                                <select
                                    value={formData.fuel}
                                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                >
                                    <option value="">Any</option>
                                    {fuels.map((fuel) => (
                                        <option key={fuel} value={fuel}>{fuel}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Fuel Type</label>
                                <select
                                    value={formData.fuelType}
                                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                >
                                    {fuelTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Transmission</label>
                                <select
                                    value={formData.transmission}
                                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200"
                                >
                                    {transmissions.map((trans) => (
                                        <option key={trans} value={trans}>{trans}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-2">Additional Requirements / Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                placeholder="Tell us more about your requirements..."
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-primary text-lg px-8 py-3 flex-1"
                                style={{ background: primaryColor }}
                            >
                                {submitting ? 'Sending...' : 'Send Request'}
                            </button>
                            <button
                                type="reset"
                                onClick={() => setFormData({
                                    name: '',
                                    email: '',
                                    phone: '',
                                    make: '',
                                    model: '',
                                    yearFrom: '',
                                    yearTo: '',
                                    fuel: '',
                                    fuelType: '',
                                    transmission: '',
                                    message: '',
                                })}
                                className="btn btn-secondary text-lg px-8 py-3"
                            >
                                Reset
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}
