/* ==========================================================================
   STACKLY AI - SERVICES PAGE INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initServiceVisualBars();
});

/* --------------------------------------------------------------------------
   1. VISUAL BAR CHART ANIMATION ON VIEWPORT SCROLL
   -------------------------------------------------------------------------- */
function initServiceVisualBars() {
    const charts = document.querySelectorAll(".visual-chart");
    
    if (charts.length === 0) return;
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll(".visual-bar");
                bars.forEach(bar => {
                    const heightVal = bar.getAttribute("data-height");
                    bar.style.height = heightVal + "%";
                });
                observer.unobserve(entry.target); // Animate only once
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.3
    });
    
    charts.forEach(chart => {
        // Set all visual bars to height 0 initially
        const bars = chart.querySelectorAll(".visual-bar");
        bars.forEach(bar => {
            bar.style.height = "0";
        });
        observer.observe(chart);
    });
}
