sign_in_up = function(options) {
    // Check if user is signed in
    if (parse.check_if_user_signed_in().bool) {
        // If signed in, do nothing
    } else {
        // If not signed in, create sign-in form
        const html = `...` // Creates basic structure with logo and containers

        // Create Email Input
        const input_email = document.createElement("input");
        input_email.id = "input_email";
        input_email.placeholder = "email...";

        // Create Password Input with Eye Toggle
        const input_password = document.createElement("input");
        input_password.id = "input_password";
        input_password.type = "password";

        // Add event listeners for email/password
        // - Enter key support
        // - Email lowercase conversion
        // - Password reset functionality

        // Create Sign In/Up buttons
        const sign_in_button = document.createElement("button");
        const sign_up_button = document.createElement("button");

        // Sign In click handler
        sign_in_button.addEventListener("click", function() {
            // Validate inputs
            // Call Parse sign in
            // Handle success/failure
        });

        // Sign Up click handler
        sign_up_button.addEventListener("click", function() {
            // First click: Show confirm password
            // Second click: Validate and submit
        });

        // Helper Functions
        function validate_input(elem) {
            // Basic empty check
        }

        function sign_up(options) {
            // Call Parse user creation
        }

        function sign_in(options) {
            // Call Parse authentication
        }
    }
}