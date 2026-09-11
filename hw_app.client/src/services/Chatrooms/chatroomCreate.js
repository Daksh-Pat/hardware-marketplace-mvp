import { apiFetch } from '@/services/apiClient';

export const createChatRoom = async (sellerId, listingId) => {
    return apiFetch('/chatroom/create', {
        method: 'POST',
        body: JSON.stringify({ sellerId, listingId })
    });
};