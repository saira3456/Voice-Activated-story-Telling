// Function to validate form inputs and open start screen
function validateForm() {
    // Get form input values
    var nameInput = document.getElementById('name').value.trim();
    var emailInput = document.getElementById('email').value.trim();
    var genderInput = document.getElementById('gender').value.trim();
    var birthdateInput = document.getElementById('birthdate').value.trim();
    var passwordInput = document.getElementById('password').value.trim();
  
    // Flag to check if there are any errors
    var hasErrors = false;
  
    // Regular expression patterns
    var namePattern = /^[A-Za-z\s]{3,}$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var passwordPattern = /^.{6,}$/;
  
    // Error messages
    var nameError = document.getElementById('name-error');
    var emailError = document.getElementById('email-error');
    var genderError = document.getElementById('gender-error');
    var birthdateError = document.getElementById('birthdate-error');
    var passwordError = document.getElementById('password-error');
  
    // Clear previous error messages
    nameError.innerText = '';
    emailError.innerText = '';
    genderError.innerText = '';
    birthdateError.innerText = '';
    passwordError.innerText = '';
  
    // Validate name
    if (!namePattern.test(nameInput)) {
        nameError.innerText = 'Name must be loger then 3 characters';
        hasErrors = true;
      }
  
    // Validate email
    if (!emailPattern.test(emailInput)) {
      emailError.innerText = 'Please enter a valid email address';
      hasErrors = true;
    }
  
    // Validate password
    if (!passwordPattern.test(passwordInput)) {
      passwordError.innerText = 'Password must be at least 6 characters long';
      hasErrors = true;
    }
  
    // If there are errors, prevent form submission
    if (hasErrors) {
      return false;
    }
  
    // If all inputs are valid, proceed to start screen
    window.location.href = 'start-screen.html';
    return true; // To prevent form submission
  }
  