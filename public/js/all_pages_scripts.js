function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of params) {
        data[key] = decodeURIComponent(value);
    }
    return data;
}

function navigateTo(page, params = {}) {
    // Convert the params object to URL parameters
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    
    // Add the parameters to the URL if they exist
    const url = queryString ? `${page}?${queryString}` : page;
    window.location.href = url;
}

// Event listener for DOMContentLoaded to initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing application...');
    
    // Get URL parameters if any
    const params = getUrlParameters();
    console.log('URL Parameters:', params);
    
    
    
});

