document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('onboardingForm');
    const gstRadios = document.getElementsByName('gst');
    const gstInputContainer = document.getElementById('gstInputContainer');
    const gstInput = document.getElementById('gstNumber');
    const gstError = document.getElementById('gstError');

    // GST Toggle Logic
    console.log('GST Radios found:', gstRadios.length);
    gstRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            console.log('GST Radio changed:', e.target.value);
            if (e.target.value === 'yes') {
                console.log('Showing GST Input');
                gstInputContainer.style.display = 'block';
                gstInput.required = true;
            } else {
                console.log('Hiding GST Input');
                gstInputContainer.style.display = 'none';
                gstInput.required = false;
                gstInput.value = ''; // Clear value
                gstInput.style.borderColor = ''; // Reset border
                gstError.style.display = 'none'; // Hide error
            }
        });
    });

    // GST Validation Logic
    gstInput.addEventListener('input', (e) => {
        const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        const value = e.target.value.toUpperCase();
        e.target.value = value; // Auto-capitalize

        if (value.length > 0) {
            if (gstPattern.test(value)) {
                gstInput.style.borderColor = '#10b981'; // Green
                gstError.style.display = 'none';
            } else {
                gstInput.style.borderColor = '#ef4444'; // Red
                gstError.style.display = 'block';
            }
        } else {
            gstInput.style.borderColor = '';
            gstError.style.display = 'none';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Final GST Validation check before submit
        if (gstInput.required && gstInput.value) {
            const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            if (!gstPattern.test(gstInput.value)) {
                alert('Please enter a valid GST Number.');
                gstInput.focus();
                return;
            }
        }

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
