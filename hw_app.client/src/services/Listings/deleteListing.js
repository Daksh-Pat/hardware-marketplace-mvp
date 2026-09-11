import { apiFetch } from '@/services/apiClient';

export const deleteListing = (id) => {

    // If no id passed then throws error, otherwise deletes listing
    if (!id) {
        throw new Error('Listing ID is required.');
    }

    return apiFetch(`/listings/delete/${id}`, {
        method: 'DELETE',
    });
};