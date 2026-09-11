import { apiFetch } from '@/services/apiClient';

export const getMessages = async (chatRoomId) => {
    return await apiFetch(`/Messages/messages/${chatRoomId}`, {
        method: 'GET'
    });
};