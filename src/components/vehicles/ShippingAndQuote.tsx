"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2, Calculator, Send } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface ShippingAndQuoteProps {
    vehicleId: string;
    fobPrice: number;
}

type Country = { id: string; name: string; code: string };
type Port = { id: string; name: string; shippingMethod: string; isDefault: boolean };
type Calculation = {
    fob: number;
    shipping: number | null;
    insurance: number | null;
    inspection: number | null;
    cif: number | null;
    askForPrice: boolean;
};

export default function ShippingAndQuote({ vehicleId, fobPrice }: ShippingAndQuoteProps) {
    const params = useParams();
    const subdomain = params.storeSlug as string;

    // Step 1: Shipping State
    const [countries, setCountries] = useState<Country[]>([]);
    const [ports, setPorts] = useState<Port[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedPort, setSelectedPort] = useState<string>("");
    const [calculation, setCalculation] = useState<Calculation | null>(null);
    const [loadingLoc, setLoadingLoc] = useState(false);
    const [calculating, setCalculating] = useState(false);

    // Step 2: Quote Form State
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [submitting, setSubmitting] = useState(false);

    // Load Countries & Auto-Detect
    useEffect(() => {
        async function init() {
            setLoadingLoc(true);
            try {
                const countryList = await api.getShippingCountries(subdomain);
                setCountries(countryList);

                // Auto Detect IP
                const ipRes = await fetch("https://ip-api.com/json/");
                const ipData = await ipRes.json();
                const detected = countryList.find((c: Country) => c.code === ipData.countryCode);

                if (detected) {
                    setSelectedCountry(detected.id);
                } else if (countryList.length > 0) {
                    // Default to first if not detected
                    // setSelectedCountry(countryList[0].id);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingLoc(false);
            }
        }
        init();
    }, [subdomain]);

    // Load Ports when Country changes
    useEffect(() => {
        if (!selectedCountry) {
            setPorts([]);
            setSelectedPort("");
            setCalculation(null);
            return;
        }

        async function loadPorts() {
            try {
                const portList = await api.getShippingPorts(subdomain, selectedCountry);
                setPorts(portList);

                // Select default port
                const def = portList.find((p: Port) => p.isDefault) || portList[0];
                if (def) setSelectedPort(def.id);
            } catch (e) {
                console.error(e);
            }
        }
        loadPorts();
    }, [selectedCountry, subdomain]);

    // Calculate when Port changes
    useEffect(() => {
        if (!selectedPort) {
            setCalculation(null);
            return;
        }

        async function calc() {
            setCalculating(true);
            try {
                const res = await api.calculateShipping({ subdomain, vehicleId, portId: selectedPort });
                setCalculation(res);
            } catch (e) {
                console.error(e);
            } finally {
                setCalculating(false);
            }
        }
        calc();
    }, [selectedPort, subdomain, vehicleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCountry || !selectedPort) {
            toast.error("Please select a shipping destination");
            return;
        }

        setSubmitting(true);
        try {
            await api.submitQuote({
                subdomain,
                vehicleId,
                name: form.name,
                email: form.email,
                phone: form.phone,
                address: form.address,
                countryId: selectedCountry,
                portId: selectedPort,
            });
            toast.success("Quote request submitted! We will contact you shortly.");
            setForm({ name: "", email: "", phone: "", address: "" });
        } catch (e) {
            toast.error("Failed to submit request");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg border shadow-sm p-6 space-y-8">

            {/* Step 1: Shipping Destination */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Shipping Destination
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Country</label>
                        <select
                            className="w-full mt-1 border rounded-md p-2"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            disabled={loadingLoc}
                        >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Port</label>
                        <select
                            className="w-full mt-1 border rounded-md p-2"
                            value={selectedPort}
                            onChange={(e) => setSelectedPort(e.target.value)}
                            disabled={!selectedCountry || ports.length === 0}
                        >
                            <option value="">Select Port</option>
                            {ports.map((p) => (
                                <option key={p.id} value={p.id}>{p.name} ({p.shippingMethod})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Pricing Breakdown */}
                {calculation && (
                    <div className="bg-slate-50 p-4 rounded-md border text-sm space-y-2 mt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Vehicle Price (FOB):</span>
                            <span className="font-medium">${calculation.fob.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping:</span>
                            <span>{calculation.shipping ? `$${calculation.shipping.toLocaleString()}` : "Ask for Price"}</span>
                        </div>
                        {(calculation.insurance || 0) > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Marine Insurance:</span>
                                <span>${calculation.insurance?.toLocaleString()}</span>
                            </div>
                        )}
                        {(calculation.inspection || 0) > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Inspection Fee:</span>
                                <span>${calculation.inspection?.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="border-t pt-2 mt-2 flex justify-between items-center">
                            <span className="font-bold text-lg text-primary">Total CIF:</span>
                            <span className="font-bold text-xl text-primary">
                                {calculation.askForPrice
                                    ? "Price on Request"
                                    : `$${calculation.cif?.toLocaleString()}`
                                }
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <hr />

            {/* Step 2: Quote Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Get a Free Quote
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium">Name *</label>
                        <input
                            required
                            className="w-full mt-1 border rounded-md p-2"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Email *</label>
                        <input
                            required
                            type="email"
                            className="w-full mt-1 border rounded-md p-2"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="your@email.com"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Phone *</label>
                        <input
                            required
                            type="tel"
                            className="w-full mt-1 border rounded-md p-2"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            placeholder="+1 234 567 8900"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Address / City</label>
                        <input
                            className="w-full mt-1 border rounded-md p-2"
                            value={form.address}
                            onChange={e => setForm({ ...form, address: e.target.value })}
                            placeholder="Optional"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-secondary font-bold py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </span>
                    ) : (
                        "Request Official Quote"
                    )}
                </button>
            </form>

        </div>
    );
}
