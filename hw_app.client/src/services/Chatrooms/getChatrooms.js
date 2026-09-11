import { apiFetch } from '@/services/apiClient';

export const getChatrooms = async () => {
    return await apiFetch('/chatroom/chatrooms', {
        method: 'GET'
    });
};