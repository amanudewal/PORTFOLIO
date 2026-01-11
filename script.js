// --- 0. THEME INIT (RUNS ASAP) ---
const body = document.body;
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// --- 1. LOADING SEQUENCE ---
const loader = document.getElementById('loader');
const loadBar = document.querySelector('.load-bar');
const modelViewer = document.querySelector('#hero-avatar');

let loadProgress = 0;

const int = setInterval(() => {
    loadProgress += Math.random() * 10;
    if(loadProgress > 100) loadProgress = 100;
    if (loadBar) loadBar.style.width = `${loadProgress}%`;
    
    // On main page wait for model, on other pages just proceed
    const isModelReady = modelViewer ? modelViewer.loaded : true;

    if(loadProgress === 100 && isModelReady) {
        clearInterval(int);
        revealSite();
    }
}, 200);

if (modelViewer) {
    modelViewer.addEventListener('load', () => { modelViewer.loaded = true; });
    setTimeout(() => { modelViewer.loaded = true; }, 3000);
}

function revealSite() {
    if (loader) {
        gsap.to(loader, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
                loader.style.display = 'none';
                initAnimations();
            }
        });
    } else {
        initAnimations();
    }
}

// --- 2. CUSTOM CURSOR & HOVER ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

// Check if elements exist before running
if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    document.querySelectorAll('a, button, .catalog-item, .cyber-input, .footer-links a').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 2, borderColor: 'var(--accent)', duration: 0.3 });
            gsap.to(cursor, { scale: 0.5, background: 'transparent', duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, borderColor: 'var(--accent)', duration: 0.3 });
            gsap.to(cursor, { scale: 1, background: 'var(--accent)', duration: 0.3 });
        });
    });
}

// --- 3. ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    if (document.querySelector(".hero-text")) {
        const tl = gsap.timeline();
        tl.from(".meta-tag", { opacity: 0, x: -20, duration: 0.5 })
          .from(".glitch-title", { opacity: 0, y: 50, duration: 0.8, ease: "power4.out" }, "-=0.3")
          .from(".terminal-text", { opacity: 0, duration: 0.5 }, "-=0.5")
          .from(".hero-visual", { opacity: 0, scale: 0.9, duration: 1 }, "-=0.5");
    }

    if (document.querySelector("#about")) {
        gsap.from(".bio-panel", { scrollTrigger: { trigger: "#about", start: "top 70%" }, x: -50, opacity: 0, duration: 1 });
        gsap.from(".skills-panel", { scrollTrigger: { trigger: "#about", start: "top 70%" }, x: 50, opacity: 0, duration: 1 });
    }
    
    gsap.utils.toArray('.catalog-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 85%" },
            y: 50, opacity: 0, duration: 0.6, delay: i * 0.1
        });
    });
    
    // Project page animations
    gsap.utils.toArray('.content-block').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 85%" },
            y: 30, opacity: 0, duration: 0.5, delay: i * 0.1
        });
    });
}

// --- 4. THEME TOGGLE LISTENER ---
const themeBtn = document.getElementById('theme-toggle');

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

// --- 5. SMOOTH SCROLL ---
document.querySelectorAll('nav a, .cyber-btn').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                gsap.to(window, { duration: 1.5, scrollTo: { y: target, offsetY: 0 }, ease: "power4.inOut" });
            }
        }
    });
});

// --- 6. SOUND & EMAIL ---
const musicBtn = document.getElementById('sound-toggle');
const music = document.getElementById('bg-music');
if (musicBtn && music) {
    musicBtn.addEventListener('click', () => {
        if (music.paused) { music.play(); musicBtn.textContent = "SOUND [ON]"; }
        else { music.pause(); musicBtn.textContent = "SOUND [OFF]"; }
    });
}

const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const s = document.getElementById('emailSubject').value;
        const b = document.getElementById('emailBody').value;
        window.location.href = `mailto:udewal.aman@gmail.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;
    });
}