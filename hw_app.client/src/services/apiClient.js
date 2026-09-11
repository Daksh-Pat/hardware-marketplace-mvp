const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');

    // Sets headers for API Fetch call including JWT Auth & Any Query Parameters
    const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    // The Content Type header stays application/json unless passing formData to backend
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // Make fetch request to backend with type of request and parameters passed
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    // If unauthorized then logs out user
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.reload();
        throw new Error('Unauthorized');
    }

    // If any other error displays it
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP Error ${response.status}`);
    }

    // If no data sent returns null
    if (response.status === 204) {
        return null;
    }

    // Returns the data from request if no other issues come up
    return response.json();
};