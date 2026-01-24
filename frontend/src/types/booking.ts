import type { School } from './school';

export interface Booking {
    id: string;
    school: Pick<School, 'id' | 'name'>;
    offer: {
        id: string;
        name: string;
    };
    date: string;
    time?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
}

export interface CreateBookingPayload {
    schoolId: string;
    offerId: string;
    date: string;
    time?: string;
}

export interface Invoice {
    id: string;
    bookingId: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue';
    dueDate: string;
    paidAt?: string;
}
