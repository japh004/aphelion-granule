import api from './client';

// Types
export interface AuthUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'STUDENT' | 'SCHOOL_ADMIN';
    schoolId?: string;
}

export interface AuthResponse {
    user: AuthUser;
    token: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'STUDENT' | 'SCHOOL_ADMIN';
}

export interface LoginPayload {
    email: string;
    password: string;
}

// Auth Service
export const authService = {
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const { data, error } = await api.post<AuthResponse>('/auth/register', payload);
        if (error) throw new Error(error);
        if (data) {
            api.setToken(data.token);
        }
        return data!;
    },

    async login(payload: LoginPayload): Promise<AuthResponse> {
        const { data, error } = await api.post<AuthResponse>('/auth/login', payload);
        if (error) throw new Error(error);
        if (data) {
            api.setToken(data.token);
        }
        return data!;
    },

    logout() {
        api.setToken(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
    },

    getCurrentUser(): AuthUser | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated(): boolean {
        return !!api.getToken();
    }
};
