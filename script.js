document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('onboardingForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather form data
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            // Handle multiple values for checkboxes
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        console.log('Form Data Submitted:', data);

        // Visual feedback
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Submitted Successfully!';
        submitBtn.style.backgroundColor = '#10b981'; // Green color
        submitBtn.disabled = true;

        alert('Thank you! Your business details have been captured. Check the console for the data object.');

        // Redirect after a short delay to allow the user to see the success state
        setTimeout(() => {
            window.location.href = 'AT&C.html';
        }, 1000);
    });
});
