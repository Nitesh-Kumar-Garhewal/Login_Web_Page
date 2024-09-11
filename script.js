document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Used to hide previous messages
    
    document.getElementById("message").textContent = "";
    document.getElementById("loadingSpinner").hidden = false;

    // Used to clear previous error messages
    
    document.getElementById("usernameError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.getElementById("rememberMe").checked;

   // Log Username/Email and Password to the console
    
    console.log("Username/Email:", username);
    console.log("Password:", password);

   // Basic client-side validation
    
    let valid = true;
    if (!username) {
      document.getElementById("usernameError").textContent =
        "Username/Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      document.getElementById("usernameError").textContent =
        "Invalid email format.";
      valid = false;
    }

    if (!password) {
      document.getElementById("passwordError").textContent =
        "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters long.";
      valid = false;
    }

    if (!valid) {
      document.getElementById("loadingSpinner").hidden = true;
      return;
    }

    // Send API request
    
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        rememberMe: rememberMe,
      }),
    })
      .then((response) => {
        // Simulate successful response for demonstration
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed.");
        }
      })
      .then((data) => {
        
        // Handle successful login here
        
        document.getElementById("loadingSpinner").hidden = true;
        document.getElementById("message").textContent = "Login successful...!";
        
      })
      .catch((error) => {
        
        // Handle login error here
        
        document.getElementById("loadingSpinner").hidden = true;
        document.getElementById("message").textContent =
          "Login failed. Please try again.";
        
      });
  });

// Show/Hide Password Functionality

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordField = document.getElementById("password");
    const passwordType = passwordField.getAttribute("type");
    const toggleButton = document.getElementById("togglePassword");

    if (passwordType === "password") {
      passwordField.setAttribute("type", "text");
      toggleButton.textContent = "Hide";            // Change text to 'Hide'
    } else {
      passwordField.setAttribute("type", "password");
      toggleButton.textContent = "Show";           // Change text to 'Show'
    }
  });
