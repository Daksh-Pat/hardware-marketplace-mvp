import { apiFetch } from '@/services/apiClient';

export const chatroomDelete = (id) => {
    // Deletes chatroom based on ID sent, if no ID then throws error
    if (!id) {
        throw new Error('Chatroom ID is required.');
    }

    return apiFetch(`/chatroom/delete/${id}`, {
        method: 'DELETE',
    });
};