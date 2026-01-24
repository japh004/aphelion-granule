'use client';

import { useState, useEffect, useCallback } from 'react';
import { invoicesService, Invoice } from '@/lib/api';

export function useInvoices(userId?: string) {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvoices = useCallback(async () => {
        if (!userId) {
            setInvoices([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await invoicesService.getMyInvoices(userId);
            setInvoices(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de chargement');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices]);

    const payInvoice = useCallback(async (
        invoiceId: string,
        method: Invoice['paymentMethod'],
        reference: string
    ) => {
        const updated = await invoicesService.pay(invoiceId, method, reference);
        setInvoices(prev => prev.map(inv => inv.id === invoiceId ? updated : inv));
        return updated;
    }, []);

    // Calculate totals
    const totalPending = invoices
        .filter(inv => inv.status === 'PENDING')
        .reduce((sum, inv) => sum + inv.amount, 0);

    const totalPaid = invoices
        .filter(inv => inv.status === 'PAID')
        .reduce((sum, inv) => sum + inv.amount, 0);

    return {
        invoices,
        loading,
        error,
        refetch: fetchInvoices,
        payInvoice,
        totalPending,
        totalPaid
    };
}
