// --- 1. LOADING SEQUENCE ---
const loader = document.getElementById('loader');
const loadBar = document.querySelector('.load-bar');
const modelViewer = document.querySelector('#hero-avatar');

let loadProgress = 0;

// Simulate loading with interval
const int = setInterval(() => {
    loadProgress += Math.random() * 10;
    if(loadProgress > 100) loadProgress = 100;
    
    loadBar.style.width = `${loadProgress}%`;
    
    if(loadProgress === 100 && modelViewer.loaded) {
        clearInterval(int);
        revealSite();
    }
}, 200);

// Ensure model is actually loaded before 100%
modelViewer.addEventListener('load', () => {
    modelViewer.loaded = true;
});
// Failsafe
setTimeout(() => { modelViewer.loaded = true; }, 3000);


function revealSite() {
    gsap.to(loader, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
            loader.style.display = 'none';
            initAnimations();
        }
    });
}


// --- 2. CUSTOM CURSOR ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

// Hover Effects for Links
document.querySelectorAll('a, button, .catalog-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(follower, { scale: 2, borderColor: 'var(--accent)', duration: 0.3 });
        gsap.to(cursor, { scale: 0.5, background: 'transparent', duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(follower, { scale: 1, borderColor: 'var(--accent)', duration: 0.3 });
        gsap.to(cursor, { scale: 1, background: 'var(--accent)', duration: 0.3 });
    });
});


// --- 3. GSAP SCROLL ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    
    // Hero Glitch In
    const tl = gsap.timeline();
    tl.from(".meta-tag", { opacity: 0, x: -20, duration: 0.5 })
      .from(".glitch-title", { opacity: 0, y: 50, duration: 0.8, ease: "power4.out" }, "-=0.3")
      .from(".terminal-text", { opacity: 0, duration: 0.5 }, "-=0.5")
      .from(".hero-visual", { opacity: 0, scale: 0.9, duration: 1 }, "-=0.5");

    // About Section Split
    gsap.from(".bio-panel", {
        scrollTrigger: { 
            trigger: "#about", 
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        x: -50, opacity: 0, duration: 1
    });
    gsap.from(".skills-panel", {
        scrollTrigger: { 
            trigger: "#about", 
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        x: 50, opacity: 0, duration: 1
    });

    // Progress Bars Fill
    gsap.utils.toArray('.fill').forEach(fill => {
        gsap.from(fill, {
            scrollTrigger: { 
                trigger: "#about", 
                start: "top 60%",
                toggleActions: "play none none reverse"
            },
            width: "0%", duration: 1.5, ease: "power2.out"
        });
    });

    // Project Catalog Stagger
    gsap.utils.toArray('.catalog-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { 
                trigger: item, 
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50, opacity: 0, duration: 0.6, delay: i * 0.1
        });
    });
}

// --- 4. THEME TOGGLE LOGIC ---
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

themeBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
});

// --- 5. SMOOTH SCROLL NAVIGATION ---
// Select all internal links: Nav items, Hero buttons, Footer links
document.querySelectorAll('nav a, .cyber-btn, .btn-group a, .footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Ensure it's an internal link (starts with #)
        if (href && href.startsWith('#')) {
            e.preventDefault(); // Stop default instant jump
            
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                // GSAP ScrollTo Animation
                gsap.to(window, {
                    duration: 1.5,       // Duration in seconds
                    scrollTo: {
                        y: targetSection,
                        offsetY: 0       // Adjust if you have a sticky header covering content
                    },
                    ease: "power4.inOut" // The "Premium" feel: slow start, fast middle, slow stop
                });
            }
        }
    });
});