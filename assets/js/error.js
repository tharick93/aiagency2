/* ==========================================================================
   STACKLY AI - 404 ERROR PAGE INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initGlitchText();
});

/* --------------------------------------------------------------------------
   1. HIGH-TECH TEXT GLITCH SIMULATION EFFECT
   -------------------------------------------------------------------------- */
function initGlitchText() {
    const errorTitle = document.getElementById("glitch-title");
    if (!errorTitle) return;
    
    const originalText = errorTitle.textContent;
    const chars = "01$#/&%?";
    
    setInterval(() => {
        let glitchedText = originalText.split("").map((char, index) => {
            // 8% chance to glitch each character
            if (Math.random() < 0.08) {
                return chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return char;
        }).join("");
        
        errorTitle.textContent = glitchedText;
        
        // Reset to original text after 150ms
        setTimeout(() => {
            errorTitle.textContent = originalText;
        }, 150);
        
    }, 2500); // Trigger glitch every 2.5 seconds
}
