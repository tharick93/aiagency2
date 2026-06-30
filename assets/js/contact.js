/* ==========================================================================
   STACKLY AI - CONTACT PAGE INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
    initCalendarScheduler();
    initLiveChatWidget();
});

/* --------------------------------------------------------------------------
   1. CONTACT FORM REAL-TIME VALIDATION & SUBMISSION
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    
    // Auto numbers only for phone field
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, "");
        });
    }
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simple client validate check
        const email = document.getElementById("email").value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            window.showToast("Please enter a valid email address", "error");
            return;
        }
        
        window.showToast("Sending message... Connection Secure.", "success");
        
        setTimeout(() => {
            window.showToast("Message sent successfully! Our team will reply in 1 hour.", "success");
            form.reset();
        }, 1500);
    });
}

/* --------------------------------------------------------------------------
   2. SCHEDULER CALENDAR DAY SELECTION
   -------------------------------------------------------------------------- */
function initCalendarScheduler() {
    const dates = document.querySelectorAll(".cal-date:not(.empty)");
    
    dates.forEach(date => {
        date.addEventListener("click", () => {
            dates.forEach(d => d.classList.remove("active"));
            date.classList.add("active");
            
            const selectedDateVal = date.textContent;
            window.showToast(`Selected July ${selectedDateVal} for consultation consultation call.`, "success");
        });
    });
}

/* --------------------------------------------------------------------------
   3. SIMULATED LIVE CHAT BOT WIDGET
   -------------------------------------------------------------------------- */
function initLiveChatWidget() {
    const chatBody = document.getElementById("chat-body");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    
    if (!chatBody || !chatInput || !sendBtn) return;
    
    function appendMessage(text, sender) {
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble ${sender}`;
        bubble.textContent = text;
        chatBody.appendChild(bubble);
        
        // Auto scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    function handleSend() {
        const msg = chatInput.value.trim();
        if (msg === "") return;
        
        appendMessage(msg, "user");
        chatInput.value = "";
        
        // Simulate bot answer
        setTimeout(() => {
            let botReply = "Thank you for connecting! I am Stackly Bot. To review custom GPU pricing, please sign up or deploy a free sandbox.";
            if (msg.toLowerCase().includes("pricing") || msg.toLowerCase().includes("cost")) {
                botReply = "Our pricing starts at $99/mo for the Sandbox tier. Let me know if you would like me to trigger our onboarding wizard.";
            } else if (msg.toLowerCase().includes("hello") || msg.toLowerCase().includes("hi")) {
                botReply = "Hello! I am the Stackly AI autonomous assistant. How can I help you scale today?";
            }
            appendMessage(botReply, "bot");
        }, 1000);
    }
    
    sendBtn.addEventListener("click", handleSend);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    });
}
