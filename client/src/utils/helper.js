export function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    // Format the date to "16 Aug 2024"
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return formattedDate;
}

