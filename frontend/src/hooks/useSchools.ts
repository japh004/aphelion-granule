'use client';

import { useState, useEffect, useCallback } from 'react';
import { schoolsService, School, Offer } from '@/lib/api';

export function useSchools(city?: string) {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchools = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await schoolsService.getAll(city);
            setSchools(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de chargement');
        } finally {
            setLoading(false);
        }
    }, [city]);

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

    return { schools, loading, error, refetch: fetchSchools };
}

export function useSchool(id: string) {
    const [school, setSchool] = useState<School | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSchool() {
            try {
                setLoading(true);
                setError(null);
                const data = await schoolsService.getById(id);
                setSchool(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erreur de chargement');
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchSchool();
        }
    }, [id]);

    return { school, loading, error };
}
