
function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var emailError = document.getElementById("email-error");
    var passwordError = document.getElementById("password-error");

    // Clear previous errors
    emailError.textContent = "";
    passwordError.textContent = "";

    var valid = true;

    // Email validation
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    if (password.length < 8) {
      passwordError.textContent = "Password must be at least 8 characters long.";
      valid = false;
    }

    if (valid) {
      // Form is valid, redirect to start-screen.html
      window.location.href = "./start-screen.html";
    }
  }
