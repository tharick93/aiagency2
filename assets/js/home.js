/* ==========================================================================
   STACKLY AI - HOME PAGE INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initStatsCounter();
    initSolutionTabs();
    initProjectFiltering();
    initTestimonialCarousel();
    initFaqAccordion();
});

/* --------------------------------------------------------------------------
   1. STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const stats = document.querySelectorAll(".stat-number, .metric-num");
    
    const countUp = (el) => {
        const target = parseFloat(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        const decimals = el.getAttribute("data-decimals") ? parseInt(el.getAttribute("data-decimals")) : 0;
        
        let start = 0;
        const duration = 2000; // 2 seconds animation duration
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = start + easeProgress * (target - start);
            
            el.textContent = currentVal.toFixed(decimals) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target.toFixed(decimals) + suffix;
            }
        };
        
        requestAnimationFrame(updateCount);
    };
    
    // Observer to trigger counter when stats section enters viewport
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

/* --------------------------------------------------------------------------
   2. SOLUTIONS TAB SWITCHER
   -------------------------------------------------------------------------- */
function initSolutionTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            
            // Deactivate all
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            // Activate target
            btn.classList.add("active");
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. PORTFOLIO / PROJECT FILTERING
   -------------------------------------------------------------------------- */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filterValue = btn.getAttribute("data-filter");
            
            // Toggle active button class
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    // Apply fade scale-in animation
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 300); // Sync with CSS transition
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. TESTIMONIAL CAROUSEL SLIDER
   -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
    const track = document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    
    // Create dots dynamic navigation
    slides.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute("data-slide", idx);
        dotsContainer.appendChild(dot);
        
        dot.addEventListener("click", () => {
            goToSlide(idx);
        });
    });
    
    const dots = document.querySelectorAll(".carousel-dot");
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach(d => d.classList.remove("active"));
        dots[currentIndex].classList.add("active");
    }
    
    // Auto loop slide
    let slideInterval = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
    }, 6000); // Shift every 6 seconds
    
    // Reset timer on manual dot interaction
    dotsContainer.addEventListener("click", () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }, 6000);
    });
}

/* --------------------------------------------------------------------------
   5. FAQ ACCORDION COLLAPSER
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach(item => {
        const header = item.querySelector(".faq-header");
        const body = item.querySelector(".faq-body");
        
        if (header && body) {
            header.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                
                // Collapse all active FAQ items first (accordion single mode)
                faqItems.forEach(i => {
                    i.classList.remove("active");
                    const b = i.querySelector(".faq-body");
                    if (b) b.style.maxHeight = null;
                });
                
                if (!isActive) {
                    item.classList.add("active");
                    // Dynamic height transition calculation
                    body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        }
    });
}
