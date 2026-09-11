export const formatMessageTime = (isoString) => {
    if (!isoString) return '';

    const date = new Date(isoString);
    const now = new Date();

    // Test to see if entered date is also today's date
    const isToday = date.toDateString() === now.toDateString();

    // If entered date is today's date returns just the Local Time
    if (isToday) {
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    // Otherwise returns the Local Time and the date
    return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
};