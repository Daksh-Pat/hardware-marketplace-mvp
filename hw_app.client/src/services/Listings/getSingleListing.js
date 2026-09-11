import { apiFetch } from '@/services/apiClient';

export const getSingleListing = async (listingId) => {
    return await apiFetch(`/listings/getlisting/${listingId}`, {
        method: 'GET'
    });
};