export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'student' | 'school_admin';
    createdAt: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload extends LoginPayload {
    firstName: string;
    lastName: string;
    role: 'student' | 'school_admin';
}
