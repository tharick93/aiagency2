/* ==========================================================================
   STACKLY AI - ADMIN DASHBOARD INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    loadAdminSession();
    initAdminMobileMenu();
    renderAdminRevenueChart();
    initAdminLogout();
    initThemeToggle();
});

/* --------------------------------------------------------------------------
   1. LOAD ADMIN SESSION & CONTEXT
   -------------------------------------------------------------------------- */
function loadAdminSession() {
    const session = JSON.parse(localStorage.getItem("stackly_session"));
    const welcomeTitle = document.getElementById("admin-welcome-title");
    
    let adminName = "System Operations";
    
    if (session && session.email) {
        // Strip email domain
        adminName = session.email.split("@")[0];
    }
    
    // Capitalize name
    adminName = adminName.charAt(0).toUpperCase() + adminName.slice(1);
    
    if (welcomeTitle) welcomeTitle.textContent = `Welcome Back, ${adminName}!`;
}

/* --------------------------------------------------------------------------
   2. MOBILE MENU SLIDER
   -------------------------------------------------------------------------- */
function initAdminMobileMenu() {
    const hamburger = document.getElementById("mobile-hamburger-btn");
    const sidebar = document.getElementById("dashboard-sidebar");
    
    if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
        
        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
            }
        });
    }
}

/* --------------------------------------------------------------------------
   3. SVG REVENUE/LEADS BAR CHART RENDERER
   -------------------------------------------------------------------------- */
function renderAdminRevenueChart() {
    const container = document.getElementById("admin-revenue-chart");
    if (!container) return;
    
    // Monthly revenue in $k from Jan to Jun
    const revenues = [42, 65, 80, 110, 140, 185];
    const width = 450;
    const height = 180;
    const maxVal = 200;
    
    // Construct polyline points
    let points = "";
    revenues.forEach((val, idx) => {
        const x = (idx / (revenues.length - 1)) * width;
        const y = height - (val / maxVal) * height;
        points += `${x},${y} `;
    });
    
    container.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%;">
            <defs>
                <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#ff007f" stop-opacity="0.0"/>
                </linearGradient>
            </defs>
            <!-- Chart line path -->
            <polyline fill="none" stroke="#8b5cf6" stroke-width="3" points="${points.trim()}" />
            <!-- Shadow gradient cover -->
            <path fill="url(#chart-glow)" d="M 0,${height} L ${points.trim()} L ${width},${height} Z" />
            <!-- Chart points indicators -->
            ${revenues.map((val, idx) => {
                const x = (idx / (revenues.length - 1)) * width;
                const y = height - (val / maxVal) * height;
                return `<circle cx="${x}" cy="${y}" r="4" fill="#ff007f" stroke="#8b5cf6" stroke-width="2" />`;
            }).join('')}
        </svg>
    `;
}

/* --------------------------------------------------------------------------
   4. LOGOUT EVENT HANDLER
   -------------------------------------------------------------------------- */
function initAdminLogout() {
    const logoutBtns = document.querySelectorAll(".logout-btn");
    
    logoutBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("stackly_session");
            window.showToast("Closing secure terminal session... Redirecting.", "success");
            
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
