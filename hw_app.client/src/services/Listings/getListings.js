import { apiFetch } from '@/services/apiClient';

export const getListings = async (filters = { }) => {

    // Fetches listing data based on parameters passed to backend
    const queryParams = new URLSearchParams({
        searchInput: filters.searchInput || "",
        mine: filters.mine || "false",
        tradeInput: filters.tradeInput || "",
        numSelect: filters.numSelect || "20",
        sortSelect: filters.sortSelect || ""
    });

    return apiFetch(`/listings/hardware?${queryParams.toString()}`);
};