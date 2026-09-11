import { apiFetch } from '@/services/apiClient';

export const Login = async (username, password) => {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
};