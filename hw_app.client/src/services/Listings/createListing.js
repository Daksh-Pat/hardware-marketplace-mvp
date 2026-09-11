import { apiFetch } from '@/services/apiClient';

export const createListing = async (title, description, image, tradeTitle) => {

    // FormData used here as you cannot easily pass images to backend in regular state variables
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('TradeTitle', tradeTitle);
    formData.append('Image', image);

    return apiFetch('/listings/create', {
        method: 'POST',
        body: formData
    });
};