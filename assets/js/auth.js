/* ==========================================================================
   STACKLY AI - AUTHENTICATION CLIENT SCRIPTS (LOGIN & SIGNUP)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initInputWrapperFocus();
    initRoleToggle();
    initFormValidation();
    initSocialLogins();
});

/* --------------------------------------------------------------------------
   1. INPUT WRAPPER FOCUS/BLUR HELPERS
   -------------------------------------------------------------------------- */
function initInputWrapperFocus() {
    const inputs = document.querySelectorAll(".input-wrapper input, .input-wrapper select, .input-wrapper textarea");
    
    inputs.forEach(input => {
        const wrapper = input.closest(".input-wrapper");
        if (!wrapper) return;
        
        input.addEventListener("focus", () => {
            wrapper.classList.add("focus");
            wrapper.classList.remove("error");
            const formGroup = wrapper.closest(".form-group");
            if (formGroup) {
                formGroup.classList.remove("has-error");
            }
        });
        
        input.addEventListener("blur", () => {
            wrapper.classList.remove("focus");
            validateField(input); // Validate on blur for real-time feedback
        });
    });
}

/* --------------------------------------------------------------------------
   2. ROLE TOGGLE (USER VS ADMIN)
   -------------------------------------------------------------------------- */
function initRoleToggle() {
    const toggleContainer = document.querySelector(".role-toggle-container");
    if (!toggleContainer) return;
    
    const userBtn = document.getElementById("toggle-user");
    const adminBtn = document.getElementById("toggle-admin");
    const roleInput = document.getElementById("auth-role");
    
    if (userBtn && adminBtn && roleInput) {
        userBtn.addEventListener("click", () => {
            toggleContainer.classList.remove("admin-active");
            userBtn.classList.add("active");
            adminBtn.classList.remove("active");
            roleInput.value = "user";
        });
        
        adminBtn.addEventListener("click", () => {
            toggleContainer.classList.add("admin-active");
            adminBtn.classList.add("active");
            userBtn.classList.remove("active");
            roleInput.value = "admin";
        });
    }
}

/* --------------------------------------------------------------------------
   3. CLIENT FIELD VALIDATIONS
   -------------------------------------------------------------------------- */
function validateField(input) {
    const wrapper = input.closest(".input-wrapper");
    if (!wrapper) return true;
    
    const formGroup = wrapper.closest(".form-group");
    const value = input.value.trim();
    const isRequired = input.hasAttribute("required");
    let isValid = true;
    let errorMsg = "";
    
    // 1. Required Check
    if (isRequired && value === "") {
        isValid = false;
        errorMsg = "This field is required";
    } else if (value !== "") {
        // 2. Specific Field Pattern Validation
        const type = input.getAttribute("type");
        const id = input.getAttribute("id");
        
        if (type === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                isValid = false;
                errorMsg = "Enter a valid email address";
            }
        } 
        else if (id === "phone") {
            const phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(value)) {
                isValid = false;
                errorMsg = "10-digit number starting with 6-9";
            }
        } 
        else if (id === "pincode") {
            const pinPattern = /^\d{6}$/;
            if (!pinPattern.test(value)) {
                isValid = false;
                errorMsg = "Pincode must be exactly 6 digits";
            }
        } 
        else if (id === "dob") {
            // Age calculation
            const dobDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - dobDate.getFullYear();
            const monthDiff = today.getMonth() - dobDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
                age--;
            }
            if (age < 10) {
                isValid = false;
                errorMsg = "Must be at least 10 years old";
            }
        } 
        else if (id === "confirm_password") {
            const passwordInput = document.getElementById("password");
            if (passwordInput && value !== passwordInput.value) {
                isValid = false;
                errorMsg = "Passwords do not match";
            }
        }
    }
    
    // Apply validation classes
    if (!isValid) {
        wrapper.classList.remove("success");
        wrapper.classList.add("error");
        if (formGroup) {
            formGroup.classList.add("has-error");
            let msgEl = formGroup.querySelector(".validation-msg");
            if (!msgEl) {
                msgEl = document.createElement("span");
                msgEl.className = "validation-msg";
                formGroup.appendChild(msgEl);
            }
            msgEl.textContent = errorMsg;
        }
    } else {
        wrapper.classList.remove("error");
        if (value !== "") {
            wrapper.classList.add("success");
        }
        if (formGroup) {
            formGroup.classList.remove("has-error");
        }
    }
    
    return isValid;
}

function initFormValidation() {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    
    // Prevent typing non-digits in mobile and pin
    const numInputs = document.querySelectorAll("#phone, #pincode");
    numInputs.forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/\D/g, "");
        });
    });
    
    // Sign Up submission
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const fields = signupForm.querySelectorAll("input, select, textarea");
            
            fields.forEach(field => {
                const isValid = validateField(field);
                if (!isValid) isFormValid = false;
            });
            
            const terms = document.getElementById("terms");
            if (terms && !terms.checked) {
                window.showToast("Please agree to the Terms & Conditions", "error");
                isFormValid = false;
            }
            
            if (isFormValid) {
                window.showToast("Registration successful! Redirecting...", "success");
                
                // Mocks storing profile details
                const signupData = {
                    firstName: document.getElementById("firstname").value,
                    lastName: document.getElementById("lastname").value,
                    email: document.getElementById("email").value,
                    role: "user"
                };
                localStorage.setItem("stackly_user_session", JSON.stringify(signupData));
                
                setTimeout(() => {
                    const overlay = document.querySelector(".page-transition-overlay");
                    if (overlay) {
                        overlay.classList.add("active");
                        setTimeout(() => { window.location.href = "login.html"; }, 600);
                    } else {
                        window.location.href = "login.html";
                    }
                }, 1500);
            } else {
                window.showToast("Please correct the highlighted errors", "error");
            }
        });
    }
    
    // Login submission
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            const fields = loginForm.querySelectorAll("input:not([type='checkbox'])");
            
            fields.forEach(field => {
                const isValid = validateField(field);
                if (!isValid) isFormValid = false;
            });
            
            if (isFormValid) {
                const email = document.getElementById("email").value;
                const role = document.getElementById("auth-role").value;
                
                window.showToast(`Login successful as ${role}! Redirecting...`, "success");
                
                // Set fake active session
                localStorage.setItem("stackly_session", JSON.stringify({
                    email: email,
                    role: role,
                    loggedIn: true,
                    time: new Date().toISOString()
                }));
                
                setTimeout(() => {
                    const targetPage = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
                    const overlay = document.querySelector(".page-transition-overlay");
                    if (overlay) {
                        overlay.classList.add("active");
                        setTimeout(() => { window.location.href = targetPage; }, 600);
                    } else {
                        window.location.href = targetPage;
                    }
                }, 1500);
            } else {
                window.showToast("Please enter valid credentials", "error");
            }
        });
    }
}

/* --------------------------------------------------------------------------
   4. SOCIAL OAUTH CONNECTS
   -------------------------------------------------------------------------- */
function initSocialLogins() {
    const socialBtns = document.querySelectorAll(".social-auth-btn");
    socialBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const provider = btn.textContent.trim();
            window.showToast(`Connecting with ${provider}...`, "success");
            
            setTimeout(() => {
                // Determine destination
                const roleInput = document.getElementById("auth-role");
                const role = roleInput ? roleInput.value : "user";
                const dest = role === "admin" ? "admin-dashboard.html" : "user-dashboard.html";
                
                localStorage.setItem("stackly_session", JSON.stringify({
                    email: `oauth_user@${provider.toLowerCase()}.com`,
                    role: role,
                    loggedIn: true,
                    time: new Date().toISOString()
                }));
                
                window.showToast(`Authenticated via ${provider}!`, "success");
                
                setTimeout(() => {
                    window.location.href = dest;
                }, 800);
            }, 1200);
        });
    });
}
