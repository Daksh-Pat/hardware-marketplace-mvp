import { apiFetch } from '@/services/apiClient';

export const Register = async (username, email, password) => {
    // Passing formData instead of state variables for organization here, state variables would suffice
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Email', email);
    formData.append('Password', password);

    return apiFetch('/auth/register', {
        method: 'POST',
        body: formData
    });
};