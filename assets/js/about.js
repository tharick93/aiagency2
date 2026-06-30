/* ==========================================================================
   STACKLY AI - ABOUT PAGE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTimelineReveal();
    initMapCoordPing();
});

/* --------------------------------------------------------------------------
   1. TIMELINE SCROLL REVEAL ACTIVATOR
   -------------------------------------------------------------------------- */
function initTimelineReveal() {
    const timelineItems = document.querySelectorAll(".timeline-item");
    
    if (timelineItems.length === 0) return;
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Optional: apply class to child panel
                const panel = entry.target.querySelector(".timeline-panel");
                if (panel) {
                    panel.style.opacity = "1";
                    panel.style.transform = "translateY(0)";
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    });
    
    timelineItems.forEach(item => {
        // Preset panel styles for scroll entrance
        const panel = item.querySelector(".timeline-panel");
        if (panel) {
            panel.style.opacity = "0";
            panel.style.transform = "translateY(20px)";
            panel.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        }
        observer.observe(item);
    });
}

/* --------------------------------------------------------------------------
   2. GLOBAL MAP COORDINATES SIMULATION
   -------------------------------------------------------------------------- */
function initMapCoordPing() {
    const pingContainer = document.querySelector(".map-coords");
    if (!pingContainer) return;
    
    const offices = [
        { name: "Silicon Valley HQ", lat: "37.7749° N", lng: "122.4194° W", ping: 12 },
        { name: "London Regional", lat: "51.5074° N", lng: "0.1278° W", ping: 48 },
        { name: "Chennai Node", lat: "13.0827° N", lng: "80.2707° E", ping: 76 },
        { name: "Berlin Core", lat: "52.5200° N", lng: "13.4050° E", ping: 35 }
    ];
    
    let activeIdx = 0;
    
    setInterval(() => {
        const office = offices[activeIdx];
        const randomPingVariation = Math.floor(Math.random() * 8) - 4;
        const currentPing = Math.max(5, office.ping + randomPingVariation);
        
        pingContainer.innerHTML = `
            NODE_ACTIVE: <span style="color:#ffffff">${office.name}</span><br>
            COORDS: ${office.lat}, ${office.lng}<br>
            GPU_LATENCY: <span style="color:#00f2fe">${currentPing}ms</span>
        `;
        
        activeIdx = (activeIdx + 1) % offices.length;
    }, 3000); // Rotate office node information every 3 seconds
}
