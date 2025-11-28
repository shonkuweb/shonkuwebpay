(function () {
    // Check if the page was reloaded
    let isReload = false;
    try {
        if (performance.getEntriesByType("navigation").length > 0) {
            isReload = performance.getEntriesByType("navigation")[0].type === 'reload';
        } else if (window.performance && window.performance.navigation) {
            // Fallback for older browsers
            isReload = window.performance.navigation.type === 1;
        }
    } catch (e) {
        console.error("Navigation check failed", e);
    }

    if (isReload) {
        sessionStorage.removeItem('isLoggedIn');
    }

    // Check authentication
    if (!sessionStorage.getItem('isLoggedIn')) {
        // If not logged in, redirect to login page
        // We use replace to prevent going back to the protected page
        window.location.replace('login.html');
    }
})();
