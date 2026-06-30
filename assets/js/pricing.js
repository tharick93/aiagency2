/* ==========================================================================
   STACKLY AI - PRICING PAGE INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initBillingToggle();
    initPricingCalculator();
});

/* --------------------------------------------------------------------------
   1. MONTHLY / YEARLY BILLING PLAN TOGGLE
   -------------------------------------------------------------------------- */
function initBillingToggle() {
    const toggle = document.querySelector(".toggle-switch");
    const container = document.querySelector(".plans-section");
    const lblMonthly = document.getElementById("billing-monthly");
    const lblYearly = document.getElementById("billing-yearly");
    
    if (!toggle || !container) return;
    
    toggle.addEventListener("click", () => {
        const isYearly = toggle.classList.toggle("yearly-active");
        
        if (isYearly) {
            container.classList.add("billing-active-yearly");
            lblYearly.classList.add("active");
            lblMonthly.classList.remove("active");
            window.showToast("Yearly billing selected (20% discount applied)", "success");
        } else {
            container.classList.remove("billing-active-yearly");
            lblMonthly.classList.add("active");
            lblYearly.classList.remove("active");
        }
    });
}

/* --------------------------------------------------------------------------
   2. CUSTOM ESTIMATED GPU CALCULATOR
   -------------------------------------------------------------------------- */
function initPricingCalculator() {
    const slider = document.getElementById("gpu-hours-slider");
    const hoursVal = document.getElementById("gpu-hours-val");
    const estPrice = document.getElementById("estimated-cost-val");
    
    if (!slider || !hoursVal || !estPrice) return;
    
    slider.addEventListener("input", (e) => {
        const hours = parseInt(e.target.value);
        hoursVal.textContent = hours + " hours";
        
        // Base rate is $0.80 per GPU hour plus standard Professional model base cost ($299)
        const totalCost = 299 + Math.round(hours * 0.85);
        estPrice.textContent = "$" + totalCost;
    });
}
