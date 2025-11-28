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

    // Check authentication (skip if already on login page)
    if (!sessionStorage.getItem('isLoggedIn') && !window.location.pathname.endsWith('login.html')) {
        // If not logged in, redirect to login page
        // We use replace to prevent going back to the protected page
        window.location.replace('login.html');
    }

    // Disable right-click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    // Disable keyboard shortcuts for Developer Tools
    document.addEventListener('keydown', function (e) {
        // F12
        if (e.key === 'F12') {
            e.preventDefault();
        }
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
            e.preventDefault();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'U') {
            e.preventDefault();
        }
    });
})();
