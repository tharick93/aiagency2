/* ==========================================================================
   STACKLY AI - USER DASHBOARD INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    loadUserSession();
    initDashboardMobileMenu();
    renderUserAnalyticsChart();
    initDashboardLogout();
    initThemeToggle();
});

/* --------------------------------------------------------------------------
   1. USER SESSION LOAD & WELCOME CUSTOMIZATION
   -------------------------------------------------------------------------- */
function loadUserSession() {
    const session = JSON.parse(localStorage.getItem("stackly_session"));
    const signupSession = JSON.parse(localStorage.getItem("stackly_user_session"));
    
    const welcomeTitle = document.getElementById("user-welcome-title");
    const avatarLbl = document.getElementById("user-avatar-lbl");
    const headerName = document.getElementById("user-header-name");
    
    let username = "Developer";
    let email = "client@stackly.com";
    
    if (signupSession && signupSession.firstName) {
        username = signupSession.firstName;
        email = signupSession.email;
    } else if (session && session.email) {
        // Strip email domain to use as username
        username = session.email.split("@")[0];
        email = session.email;
    }
    
    // Capitalize first letter
    username = username.charAt(0).toUpperCase() + username.slice(1);
    
    if (welcomeTitle) welcomeTitle.textContent = `Welcome Back, ${username}!`;
    if (headerName) headerName.textContent = username;
    if (avatarLbl) avatarLbl.textContent = username.slice(0, 2).toUpperCase();
}

/* --------------------------------------------------------------------------
   2. MOBILE MENU SLIDER
   -------------------------------------------------------------------------- */
function initDashboardMobileMenu() {
    const hamburger = document.getElementById("mobile-hamburger-btn");
    const sidebar = document.getElementById("dashboard-sidebar");
    
    if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
        
        // Close sidebar when clicking outside of it on mobile
        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
            }
        });
    }
}

/* --------------------------------------------------------------------------
   3. SVG ANALYTICS LINE CHART RENDERER
   -------------------------------------------------------------------------- */
function renderUserAnalyticsChart() {
    const container = document.getElementById("user-analytics-chart");
    if (!container) return;
    
    // API Inferences daily call logs
    const callLogs = [12, 18, 15, 34, 45, 52, 60];
    const width = 450;
    const height = 180;
    const maxVal = 70;
    
    // Construct polyline points
    let points = "";
    callLogs.forEach((val, idx) => {
        const x = (idx / (callLogs.length - 1)) * width;
        // Inverse height calculation for chart plotting
        const y = height - (val / maxVal) * height;
        points += `${x},${y} `;
    });
    
    // Inline SVG construction
    container.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%;">
            <defs>
                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#7f00ff" stop-opacity="0.0"/>
                </linearGradient>
            </defs>
            <!-- Chart line path -->
            <polyline fill="none" stroke="#00f2fe" stroke-width="3" points="${points.trim()}" />
            <!-- Shadow gradient cover -->
            <path fill="url(#chart-glow)" d="M 0,${height} L ${points.trim()} L ${width},${height} Z" />
            <!-- Chart points indicators -->
            ${callLogs.map((val, idx) => {
                const x = (idx / (callLogs.length - 1)) * width;
                const y = height - (val / maxVal) * height;
                return `<circle cx="${x}" cy="${y}" r="4" fill="#7f00ff" stroke="#00f2fe" stroke-width="2" />`;
            }).join('')}
        </svg>
    `;
}

/* --------------------------------------------------------------------------
   4. LOGOUT EVENT HANDLER
   -------------------------------------------------------------------------- */
function initDashboardLogout() {
    const logoutBtns = document.querySelectorAll(".logout-btn");
    
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("stackly_session");
            window.showToast("Closing active session... Redirecting.", "success");
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);
        });
    });
}

/* --------------------------------------------------------------------------
   5. LIGHT / DARK MODE THEME SWITCHER
   -------------------------------------------------------------------------- */
function initThemeToggle() {
    const themeBtn = document.getElementById("theme-toggle-dashboard");
    if (!themeBtn) return;
    
    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "light") {
            document.documentElement.removeAttribute("data-theme");
            window.showToast("Dark Mode activated", "success");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            window.showToast("Light Mode activated", "success");
        }
    });
}
