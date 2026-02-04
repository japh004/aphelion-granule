import api from './client';

// Types
export interface Invoice {
    id: string;
    bookingId: string;
    booking: {
        schoolName: string;
        offerName: string;
    };
    amount: number;
    status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
    paymentMethod?: 'MTN_MOMO' | 'ORANGE_MONEY' | 'CARD' | 'CASH';
    paymentReference?: string;
    createdAt: string;
    paidAt?: string;
}

// Invoices Service
export const invoicesService = {
    async getMyInvoices(userId: string): Promise<Invoice[]> {
        const { data, error } = await api.get<Invoice[]>('/invoices', {
            'X-User-Id': userId
        });
        if (error) throw new Error(error);
        return data || [];
    },

    async getBySchool(schoolId: string): Promise<Invoice[]> {
        const { data, error } = await api.get<Invoice[]>(`/invoices/school/${schoolId}`);
        if (error) throw new Error(error);
        return data || [];
    },

    async getById(id: string): Promise<Invoice> {
        const { data, error } = await api.get<Invoice>(`/invoices/${id}`);
        if (error) throw new Error(error);
        return data!;
    },

    async pay(id: string, method: Invoice['paymentMethod'], reference: string): Promise<Invoice> {
        const { data, error } = await api.post<Invoice>(
            `/invoices/${id}/pay?method=${method}&reference=${reference}`
        );
        if (error) throw new Error(error);
        return data!;
    }
};
