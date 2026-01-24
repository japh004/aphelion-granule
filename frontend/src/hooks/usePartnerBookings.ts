"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api/client";
import { Booking } from "@/lib/api/bookings";

export function usePartnerBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await api.get<Booking[]>("/partner/bookings");

            if (error) throw new Error(error);
            setBookings(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors du chargement des réservations");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return { bookings, loading, error, refetch: fetchBookings };
}
