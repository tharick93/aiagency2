/* ==========================================================================
   STACKLY AI - GLOBAL JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initCustomCursor();
    initScrollEffects();
    initNavbar();
    initPageTransitions();
    initParticles();
    initMouseGlow();
    initScrollReveal();
    initTiltEffect();
});

/* --------------------------------------------------------------------------
   1. LOADING SCREEN
   -------------------------------------------------------------------------- */
function initLoader() {
    const loader = document.querySelector(".loader-wrapper");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("fade-out");
                document.body.style.opacity = "1";
            }, 800); // 800ms to show off the premium loader
        });
        
        // Backup in case load event already fired
        if (document.readyState === "complete") {
            setTimeout(() => {
                loader.classList.add("fade-out");
            }, 800);
        }
    }
}

/* --------------------------------------------------------------------------
   2. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const dot = document.querySelector(".custom-cursor-dot");
    
    if (!cursor || !dot) return;
    
    let mouseX = 0, mouseY = 0; // Current mouse coords
    let cursorX = 0, cursorY = 0; // Lagged cursor coords
    
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant dot movement
        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";
    });
    
    // Smooth outer cursor animation (spring effect)
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15; // Smooth interpolation factor
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Mouse hover states on interactive links
    const interactiveElements = document.querySelectorAll("a, button, select, input, textarea, .faq-header, .tab-btn");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hovered");
        });
        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hovered");
        });
    });
}

/* --------------------------------------------------------------------------
   3. SCROLL PROGRESS & STICKY HEADER
   -------------------------------------------------------------------------- */
function initScrollEffects() {
    const progressBar = document.querySelector(".scroll-progress-bar");
    const backToTop = document.querySelector(".back-to-top");
    const navbar = document.querySelector(".navbar");
    
    window.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        // Progress bar width
        if (progressBar && scrollHeight > 0) {
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + "%";
        }
        
        // Back to top button visibility
        if (backToTop) {
            if (scrollTop > 400) {
                backToTop.classList.add("active");
            } else {
                backToTop.classList.remove("active");
            }
        }
        
        // Sticky Navbar
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        }
    });
}

/* --------------------------------------------------------------------------
   4. NAVIGATION (HAMBURGER MENU)
   -------------------------------------------------------------------------- */
function initNavbar() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navLinks.classList.toggle("open");
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                navLinks.classList.remove("open");
            });
        });
    }
}

/* --------------------------------------------------------------------------
   5. PAGE TRANSITIONS (SMOOTH OVERLAY)
   -------------------------------------------------------------------------- */
function initPageTransitions() {
    const overlay = document.querySelector(".page-transition-overlay");
    if (!overlay) return;
    
    const transitionLinks = document.querySelectorAll("a:not([target='_blank']):not([href^='#']):not([href^='javascript:'])");
    
    transitionLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const destination = link.getAttribute("href");
            if (!destination) return;
            
            e.preventDefault();
            overlay.classList.add("active");
            
            setTimeout(() => {
                window.location.href = destination;
            }, 600); // Wait for sliding overlay to fully cover
        });
    });
}

/* --------------------------------------------------------------------------
   6. MOUSE GLOW EFFECT (GLASS CARDS)
   -------------------------------------------------------------------------- */
function initMouseGlow() {
    const cards = document.querySelectorAll(".glass-card, .service-card, .plan-card, .dashboard-card, .value-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

/* --------------------------------------------------------------------------
   7. SCROLL REVEAL (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once active to make layout clean
                observer.unobserve(entry.target);
            }
        });
    };
    
    const options = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(revealCallback, options);
    
    reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE 3D TILT EFFECT
   -------------------------------------------------------------------------- */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll("[data-tilt]");
    
    tiltElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            const rect = el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left - width/2;
            const mouseY = e.clientY - rect.top - height/2;
            
            // Calculate tilt degrees (max 15 degrees)
            const rX = -(mouseY / (height/2)) * 12;
            const rY = (mouseX / (width/2)) * 12;
            
            el.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

/* --------------------------------------------------------------------------
   9. CANVASES / PARTICLES BACKGROUND
   -------------------------------------------------------------------------- */
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 100 };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Mouse collision effect
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 2;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 2;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 2;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 2;
                }
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }
    
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 16000;
        // Limit max particles for performance
        if (numberOfParticles > 80) numberOfParticles = 80;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2.5) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(0, 242, 254, 0.15)';
            if (Math.random() > 0.5) {
                color = 'rgba(127, 0, 255, 0.15)';
            }
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
    
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                if (distance < 110) {
                    opacityValue = 1 - (distance/110);
                    ctx.strokeStyle = `rgba(127, 0, 255, ${opacityValue * 0.08})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATIONS HELPER
   -------------------------------------------------------------------------- */
function showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }
    
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "✓";
    if (type === "error") icon = "✗";
    
    toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3500);
}

// Make globally available
window.showToast = showToast;
