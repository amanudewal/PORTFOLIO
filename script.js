// --- 0. THEME INIT ---
const body = document.body;

// --- 1. LOADING SEQUENCE ---
const urlParams = new URLSearchParams(window.location.search);
const skipIntro = urlParams.get('skipIntro') === 'true';

const loader = document.getElementById('loader');
const loadBar = document.querySelector('.load-bar');
const modelViewer = document.querySelector('#hero-avatar');

let loadProgress = 0;
let isModelLoaded = false;

if (skipIntro) {
    if (loader) loader.style.display = 'none';
    isModelLoaded = true;
    setTimeout(revealSite, 50);
} else {
    if (modelViewer) {
        modelViewer.addEventListener('load', () => { isModelLoaded = true; });
        setTimeout(() => { isModelLoaded = true; }, 3000);
    } else {
        isModelLoaded = true;
    }

    const loadingInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress >= 100) loadProgress = 100;

        const visualProgress = (loadProgress === 100 && !isModelLoaded) ? 90 : loadProgress;
        if (loadBar) loadBar.style.width = `${visualProgress}%`;

        if (loadProgress === 100 && isModelLoaded) {
            clearInterval(loadingInterval);
            setTimeout(revealSite, 200);
        }
    }, 200);
}

function revealSite() {
    initThreeJS();
    if (loader) {
        if (typeof gsap !== "undefined") {
            gsap.to(loader, {
                opacity: 0, duration: 0.8, ease: "power2.inOut",
                onComplete: () => {
                    loader.style.display = 'none';
                    initAnimations();
                }
            });
        } else {
            loader.style.display = 'none';
            initAnimations();
        }
    } else {
        initAnimations();
    }
}

// --- 2. CUSTOM CURSOR & HOVER ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower && typeof gsap !== "undefined") {
    // 1. Center the elements perfectly using GSAP instead of CSS
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // 2. Setup highly optimized quickTo functions for 60FPS tracking
    let cursorX = gsap.quickTo(cursor, "x", { duration: 0.05, ease: "power3" });
    let cursorY = gsap.quickTo(cursor, "y", { duration: 0.05, ease: "power3" });

    let followerX = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    let followerY = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    // 3. Track mouse movement
    window.addEventListener('mousemove', (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
        followerX(e.clientX);
        followerY(e.clientY);
    });

    // 4. Hover Effects for Interactive Elements (Added the new buttons to this list)
    const interactables = document.querySelectorAll('a, button, .catalog-item, .cyber-input, .footer-links a, .chip, input');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Make the outer ring bigger and hide the inner dot
            gsap.to(follower, {
                width: 60, height: 60,
                backgroundColor: 'rgba(0, 243, 255, 0.1)',
                duration: 0.3
            });
            gsap.to(cursor, { scale: 0, duration: 0.2 });
        });

        el.addEventListener('mouseleave', () => {
            // Revert to default state
            gsap.to(follower, {
                width: 40, height: 40,
                backgroundColor: 'transparent',
                duration: 0.3
            });
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
}

// --- 3. UI SOUND DESIGN ---
const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('click-sound');
const musicBtn = document.getElementById('sound-toggle');
const music = document.getElementById('bg-music');

let soundsEnabled = false;

if (musicBtn && music) {
    musicBtn.addEventListener('click', () => {
        soundsEnabled = !soundsEnabled;
        if (soundsEnabled) {
            music.play();
            musicBtn.textContent = "SOUND [ON]";
        } else {
            music.pause();
            musicBtn.textContent = "SOUND [OFF]";
        }
        playUISound(clickSound);
    });
}

const playUISound = (audioEl) => {
    if (soundsEnabled && audioEl) {
        audioEl.currentTime = 0;
        audioEl.play().catch(e => { }); // Catch error if browser blocks fast rapid plays
    }
}

document.querySelectorAll('a, button, .cyber-btn, .chip, .nav-item').forEach(el => {
    el.addEventListener('mouseenter', () => playUISound(hoverSound));
    el.addEventListener('click', () => playUISound(clickSound));
});


// --- 4. ANIMATIONS & GSAP ---
if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== "undefined") gsap.registerPlugin(ScrollToPlugin);
}

function initAnimations() {
    if (typeof gsap === "undefined") return;

    if (document.querySelector(".hero-text") || document.querySelector(".hero-content")) {
        const tl = gsap.timeline();
        tl.from(".meta-tag", { opacity: 0, x: -20, duration: 0.5 })
            .from(".glitch-title", { opacity: 0, y: 50, duration: 0.8, ease: "power4.out" }, "-=0.3")
            .from(".interactive-terminal", { opacity: 0, x: -50, duration: 0.5 }, "-=0.5") // Added Terminal to timeline
            .from(".hero-visual", { opacity: 0, scale: 0.9, duration: 1 }, "-=0.5");
    }

    if (document.querySelector("#about")) {
        gsap.from(".bio-panel", { scrollTrigger: { trigger: "#about", start: "top 70%", toggleActions: "play reverse play reverse" }, x: -50, opacity: 0, duration: 1 });
        gsap.from(".skills-panel", { scrollTrigger: { trigger: "#about", start: "top 70%", toggleActions: "play reverse play reverse" }, x: 50, opacity: 0, duration: 1 });
    }

    // Timeline Animations
    if (document.querySelector(".timeline")) {
        gsap.from(".timeline .line", { scrollTrigger: { trigger: ".timeline", start: "top 80%" }, height: 0, duration: 1.5, ease: "power3.out" });
        gsap.from(".timeline-item", { scrollTrigger: { trigger: ".timeline", start: "top 80%" }, y: 50, opacity: 0, duration: 0.8, stagger: 0.3, ease: "power3.out" });
    }

    gsap.utils.toArray('.catalog-item').forEach((item, i) => {
        gsap.from(item, { scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play reverse play reverse" }, y: 50, opacity: 0, duration: 0.6, delay: (i % 3) * 0.1 });
    });

    gsap.utils.toArray('.content-block, .data-card, .dashboard-header').forEach((item, i) => {
        gsap.from(item, { scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play reverse play reverse" }, y: 30, opacity: 0, duration: 0.5, delay: 0.1 });
    });
}

// --- 5. GITHUB LIVE STATS API ---
// Fetches your live repository count directly from GitHub
fetch('https://api.github.com/users/amanudewal')
    .then(res => res.json())
    .then(data => {
        const repoBox = document.getElementById('gh-repos');
        if (repoBox && data.public_repos) {
            // Animates the number counting up
            gsap.to(repoBox, {
                innerHTML: data.public_repos,
                duration: 2,
                snap: { innerHTML: 1 },
                scrollTrigger: { trigger: "#about", start: "top 80%" }
            });
        }
    }).catch(err => console.log("GitHub API Limit Reached or Offline"));


// --- 6. THREE.JS PARTICLE BACKGROUND ---
function initThreeJS() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // Adjust for density
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5; // Spread particles
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // We use a white color with opacity so the CSS Blend Modes can color them dynamically based on theme/overclock
    const material = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff, transparent: true, opacity: 0.5 });
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 2;

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        // Base rotation
        particlesMesh.rotation.y += 0.001;

        // Mouse interaction shifts the matrix slightly
        if (typeof gsap !== "undefined") {
            gsap.to(particlesMesh.rotation, {
                x: -mouseY * 0.5,
                y: mouseX * 0.5,
                duration: 2
            });
        }

        // Make sure particles match the active CSS Accent Color dynamically
        const currentAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        if (currentAccent) material.color.set(currentAccent);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Auto-initialize ThreeJS particles on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}


// --- 7. THEME TOGGLE LISTENER ---
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);

        // Trigger a HUD spike if the feature exists
        if (typeof spikeHUD === 'function') spikeHUD(100);
    });
}

// --- 8. SMOOTH SCROLL ---
document.querySelectorAll('nav a, .cyber-btn').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                if (typeof gsap !== "undefined" && gsap.to) {
                    gsap.to(window, { duration: 1.5, scrollTo: { y: target.offsetTop, autoKill: true }, ease: "power3.inOut", overwrite: 'auto' });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});

// --- 9. PROJECT FILTER CHIPS ---
const chips = document.querySelectorAll('.filter-chips .chip');
const catalogItems = document.querySelectorAll('.catalog-item');

if (chips.length > 0) {
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filterValue = chip.getAttribute('data-filter');
            catalogItems.forEach(item => {
                const category = item.getAttribute('data-category') || "";
                if (filterValue === 'all' || category.includes(filterValue)) {
                    item.style.display = 'grid';
                    if (typeof gsap !== "undefined") gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
                } else {
                    item.style.display = 'none';
                }
            });
            if (window.innerWidth <= 768) {
                catalogItems.forEach(item => { if (item.style.display === 'grid') item.style.display = 'flex'; });
            }
        });
    });
}

// Make catalog items globally clickable (especially for mobile where the action arrow is hidden)
catalogItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Prevent double navigation if they actually clicked the a tag itself (on desktop)
        if (e.target.closest('a')) return;
        const link = item.querySelector('.cat-action a');
        if (link) window.location.href = link.href;
    });
    // Add visual feedback class on hover
    item.style.cursor = 'pointer';
});

// --- 10. TESTIMONIAL CAROUSEL ---
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const switchSlide = () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    if (typeof gsap !== "undefined") gsap.fromTo(slides[currentSlide], { autoAlpha: 0, x: 20 }, { autoAlpha: 1, x: 0, duration: 0.5 });
};

if (slides.length > 0) {
    slides[0].classList.add('active');
    setInterval(() => {
        if (typeof gsap !== "undefined") gsap.to(slides[currentSlide], { autoAlpha: 0, duration: 0.5, onComplete: switchSlide });
        else switchSlide();
    }, 5000);
}

// --- 11. BACK TO TOP BUTTON ---
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) backToTopBtn.classList.add('show');
        else backToTopBtn.classList.remove('show');
    });
    backToTopBtn.addEventListener('click', () => {
        if (typeof gsap !== "undefined" && gsap.to) gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power4.inOut" });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --- 12. AVATAR ANIMATION LOGIC ---
function playAvatarAnimation(animName) {
    const model = document.querySelector('#hero-avatar');
    if (model) {
        // Change the animation
        model.animationName = animName;
        model.play({ repetitions: 1 }); // Play once

        // Return to "Idle" after the animation finishes
        setTimeout(() => {
            model.animationName = "Idle";
            model.play();
        }, 2000);
    }
}

// Attach the animation to buttons
document.querySelectorAll('nav a, .cyber-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playAvatarAnimation("Pointing"); // Replace "Pointing" with your exact file name
    });
});

// ==========================================================
// V2.5 ADDITIONS - DO NOT REMOVE ANYTHING ABOVE THIS LINE
// ==========================================================

// --- 13. SYSTEM OVERCLOCK (COLOR PROTOCOL) ---
const colorBtn = document.getElementById('color-cycle');
const protocols = [
    { name: "CYAN", color: "#00f3ff" },
    { name: "ULTRAVIOLET", color: "#8a2be2" },
    { name: "PLASMA", color: "#b026ff" },
    { name: "OVERRIDE", color: "#ff003c" }
];
let currentProtocol = 0;

if (colorBtn) {
    colorBtn.addEventListener('click', () => {
        currentProtocol = (currentProtocol + 1) % protocols.length;
        const newColor = protocols[currentProtocol].color;

        // Update CSS Variable globally
        document.documentElement.style.setProperty('--accent', newColor);
        colorBtn.textContent = `OVERCLOCK [${protocols[currentProtocol].name}]`;

        // Spike HUD on color change
        if (typeof spikeHUD === 'function') spikeHUD(100);
    });
}


// --- 14. INTERACTIVE TERMINAL (CLI) ---
const cliInput = document.getElementById('cli-input');
const cliOutput = document.getElementById('cli-output');

if (cliInput && cliOutput) {
    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = cliInput.value.trim().toLowerCase();
            cliInput.value = '';

            // Play sound if function exists
            if (typeof playUISound === 'function') playUISound(clickSound);

            // Append user command
            cliOutput.innerHTML += `<br><span style="color:var(--text)">visitor@aman.sys:~$ ${command}</span><br>`;

            // Process command
            setTimeout(() => {
                let response = "";
                switch (command) {
                    case 'help': response = "> AVAILABLE COMMANDS:<br>> whoami<br>> skills.exe<br>> fetch projects<br>> download resume<br>> clear"; break;
                    case 'whoami': response = "> AMAN UDEWAL. App Developer & Software Engineer. BTech Computer Engineering (2026)."; break;
                    case 'skills.exe': response = "> LOADING ARSENAL... [FLUTTER, DART, PYTHON, FLASK, REACT.JS, NEXT.JS, FIREBASE, BERT, BART NLP]"; if (typeof spikeHUD === 'function') spikeHUD(80); break;
                    case 'fetch projects': response = "> REDIRECTING TO SELECTED_WORKS..."; setTimeout(() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' }), 1000); break;
                    case 'download resume': response = "> INITIATING DOWNLOAD (AMAN_RESUME.PDF)..."; window.open('AMAN_RAMAKANT_UDEWAL_FlowCV_Resume_2026-08-19.pdf', '_blank'); break;
                    case 'clear': cliOutput.innerHTML = "> SYSTEM CLEARED."; return;
                    case '': return;
                    default: response = `> Command not found: '${command}'. Type 'help' for protocols.`;
                }
                cliOutput.innerHTML += `<span style="color:var(--accent)">${response}</span>`;
                cliOutput.scrollTop = cliOutput.scrollHeight;
            }, 300);
        }
    });
}


// --- 15. EMBEDDED AI ASSISTANT ---
const aiToggle = document.getElementById('ai-toggle');
const aiPanel = document.getElementById('ai-panel');
const aiInput = document.getElementById('ai-input');
const aiLog = document.getElementById('ai-chat-log');

if (aiToggle && aiPanel) {
    aiToggle.addEventListener('click', () => {
        const isHidden = window.getComputedStyle(aiPanel).display === 'none';
        aiPanel.style.display = isHidden ? 'flex' : 'none';
        if (isHidden && aiInput) aiInput.focus();

        // Play sound if function exists
        if (typeof playUISound === 'function') playUISound(clickSound);
    });

    if (aiInput) {
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && aiInput.value.trim() !== '') {
                const query = aiInput.value.trim();
                aiInput.value = '';

                aiLog.innerHTML += `<p class="user-msg">${query}</p>`;
                aiLog.scrollTop = aiLog.scrollHeight;

                // Mock NLP processing
                setTimeout(() => {
                    const q = query.toLowerCase();
                    let reply = "I am restricted to discussing Aman's professional profile. Ask about his skills or projects.";

                    if (q.includes('nexus')) {
                        reply = "NEXUS is a premium cross-platform audio app developed by Aman using Flutter & Python, featuring Spotify link processing and an offline music player with Day/Night themes.";
                    } else if (q.includes('summify')) {
                        reply = "Summify is an AI-powered document summarization app built by Aman with Flutter & Python Flask, integrating BERT and BART NLP models.";
                    } else if (q.includes('python') || q.includes('ai') || q.includes('nlp') || q.includes('bert')) {
                        reply = "Aman leverages Python & Flask for backend services and AI workflows, incorporating BERT & BART models for text summarization.";
                    } else if (q.includes('flutter') || q.includes('app') || q.includes('mobile')) {
                        reply = "Aman builds responsive cross-platform applications using Flutter & Dart (Riverpod, BLoC, Provider) with Firebase & REST API integration.";
                    } else if (q.includes('education') || q.includes('college') || q.includes('sandipani')) {
                        reply = "Aman is a Computer Engineering student at Sandipani Technical Campus Of Engineering, Latur (08/2022 - 06/2026).";
                    } else if (q.includes('hire') || q.includes('contact')) {
                        reply = "You can reach Aman via email at udewal.aman@gmail.com or phone at +91 87675 69330, or view his official resume in COMM_HUB.";
                    }

                    aiLog.innerHTML += `<p class="ai-msg">> ${reply}</p>`;
                    aiLog.scrollTop = aiLog.scrollHeight;

                    // Spike HUD on AI reply
                    if (typeof spikeHUD === 'function') spikeHUD(60);
                }, 800);
            }
        });
    }
}


// --- 16. LIVE DIAGNOSTICS HUD ---
const cpuBar = document.getElementById('cpu-bar');
const memBar = document.getElementById('mem-bar');

function jitterHUD() {
    if (cpuBar && memBar) {
        // Randomly hover between 10% and 40%
        cpuBar.style.height = `${Math.floor(Math.random() * 30) + 10}%`;
        memBar.style.height = `${Math.floor(Math.random() * 30) + 10}%`;
    }
}
setInterval(jitterHUD, 2000);

// Function to spike HUD on user interaction
function spikeHUD(intensity = 90) {
    if (cpuBar && memBar) {
        cpuBar.style.height = `${intensity}%`;
        memBar.style.height = `${intensity - 10}%`;
        setTimeout(jitterHUD, 500);
    }
}

// Spike on global clicks and scroll milestones
document.addEventListener('click', () => spikeHUD(60));
window.addEventListener('scroll', () => { if (window.scrollY % 500 < 50) spikeHUD(70); });


// ==========================================================
// --- 17. SILENT VISITOR TRACKING PROTOCOL ---
// ==========================================================
function triggerVisitorAlert() {
    // Check if we already logged this user during this browser session
    if (!sessionStorage.getItem('sys_visitor_logged')) {

        // YOUR SECRET TOPIC NAME HERE (Must match the app exactly)
        const secretTopic = "aman_sys_alert_98x7z_portfolio_log";

        // Grab some basic non-invasive data
        const time = new Date().toLocaleTimeString();
        const platform = navigator.platform || "Unknown OS";

        // Send the Push Notification via ntfy
        fetch(`https://ntfy.sh/${secretTopic}`, {
            method: 'POST',
            body: `Visitor detected at ${time}. OS: ${platform}`,
            headers: {
                'Title': 'AMAN.SYS // NEW VISITOR',
                'Tags': 'rotating_light,eye', // Adds emojis to the notification
                'Priority': 'default'
            }
        }).catch(err => {
            // Silently fail if they have ad-blockers preventing fetch
            console.log("Tracking ping suppressed.");
        });

        // Lock it so it doesn't fire again until they close their browser
        sessionStorage.setItem('sys_visitor_logged', 'true');
    }
}

// Initialize the tracker once the window loads
window.addEventListener('load', () => {
    // Add a slight delay so it doesn't slow down the visual page loading
    setTimeout(triggerVisitorAlert, 2000);
});

// --- MOBILE NAVIGATION DRAWER & 3D RECENT CARD CONTROLLER ---
const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
const mobileCloseBtn = document.getElementById('mobile-menu-close');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const siteWrapper = document.getElementById('site-wrapper');

let savedScrollY = 0;

function openMobileDrawer(e) {
    if (e) e.stopPropagation();
    if (mobileDrawer && mobileBackdrop) {
        savedScrollY = window.scrollY;
        document.body.classList.add('mobile-menu-open');

        // Translate main content up to preserve visual scroll position inside the 100vh wrapper
        const mainEl = document.querySelector('main');
        if (mainEl) mainEl.style.transform = `translateY(-${savedScrollY}px)`;

        mobileDrawer.classList.add('active');
        mobileBackdrop.classList.add('active');
        if (typeof playUISound === 'function' && typeof clickSound !== 'undefined') playUISound(clickSound);
    }
}

function closeMobileDrawer() {
    if (mobileDrawer && mobileBackdrop) {
        document.body.classList.remove('mobile-menu-open');

        // Restore normal flow and native scroll position
        const mainEl = document.querySelector('main');
        if (mainEl) mainEl.style.transform = '';
        window.scrollTo(0, savedScrollY);

        mobileDrawer.classList.remove('active');
        mobileBackdrop.classList.remove('active');
        if (typeof playUISound === 'function' && typeof clickSound !== 'undefined') playUISound(clickSound);
    }
}

if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', openMobileDrawer);
if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileDrawer);
if (siteWrapper) {
    siteWrapper.addEventListener('click', (e) => {
        if (document.body.classList.contains('mobile-menu-open')) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileDrawer();
        }
    });
}

mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const targetHref = item.getAttribute('href');
        if (targetHref && targetHref.startsWith('#')) {
            e.preventDefault();
            closeMobileDrawer();
            setTimeout(() => {
                const targetSection = document.querySelector(targetHref);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    history.replaceState(null, null, targetHref);
                }
            }, 300); // Delay allows site-wrapper to restore to auto height
        } else {
            closeMobileDrawer();
        }
    });
});

// Dynamic Active State Highlighting for Navigation
const pageSections = document.querySelectorAll('section[id]');
const navHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const targetHash = `#${id}`;

            // Update Mobile Drawer
            mobileNavItems.forEach(navItem => {
                navItem.classList.remove('highlight');
                if (navItem.getAttribute('href') === targetHash) {
                    navItem.classList.add('highlight');
                }
            });

            // Update Desktop Nav
            const desktopNavItems = document.querySelectorAll('.desktop-nav .nav-item[href^="#"]');
            desktopNavItems.forEach(navItem => {
                navItem.classList.remove('highlight');
                if (navItem.getAttribute('href') === targetHash) {
                    navItem.classList.add('highlight');
                }
            });
        }
    });
}, { threshold: 0.3 });

pageSections.forEach(section => {
    navHighlightObserver.observe(section);
});

// Touch Swipe Gesture Handling (Swipe Right to Open, Swipe Left to Close)
let touchStartX = 0;
let touchStartY = 0;
let isSwiping = false;

window.addEventListener('touchstart', (e) => {
    if (window.innerWidth > 880) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
    if (!isSwiping || window.innerWidth > 880) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX;
    const diffY = Math.abs(currentY - touchStartY);

    if (Math.abs(diffX) > diffY && Math.abs(diffX) > 25) {
        if (!document.body.classList.contains('mobile-menu-open') && diffX > 40 && touchStartX < 70) {
            openMobileDrawer();
            isSwiping = false;
        } else if (document.body.classList.contains('mobile-menu-open') && diffX < -40) {
            closeMobileDrawer();
            isSwiping = false;
        }
    }
}, { passive: true });

window.addEventListener('touchend', () => {
    isSwiping = false;
});

// Mobile Controls Sync
const mobileColorCycle = document.getElementById('mobile-color-cycle');
const mobileSoundToggle = document.getElementById('mobile-sound-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

const desktopColorCycle = document.getElementById('color-cycle');
const desktopSoundToggle = document.getElementById('sound-toggle');
const desktopThemeToggle = document.getElementById('theme-toggle');

if (mobileColorCycle && desktopColorCycle) {
    mobileColorCycle.addEventListener('click', () => { desktopColorCycle.click(); });
}
if (mobileSoundToggle && desktopSoundToggle) {
    mobileSoundToggle.addEventListener('click', () => {
        desktopSoundToggle.click();
        const icon = mobileSoundToggle.querySelector('i');
        if (icon) icon.className = desktopSoundToggle.textContent.includes('ON') ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    });
}
if (mobileThemeToggle && desktopThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => { desktopThemeToggle.click(); });
}

// --- 16. GLOBAL UI SOUND EFFECTS ---
(function initGlobalAudio() {
    const globalHoverSound = new Audio('assets/Hover.wav');
    globalHoverSound.volume = 0.2;
    const globalClickSound = new Audio('assets/click.mp3');
    globalClickSound.volume = 0.4;

    // Attach to all interactive elements in the main portfolio
    document.querySelectorAll('a, button, .cyber-btn, .chip, .nav-item, .project-card, .social-icon').forEach(el => {
        el.addEventListener('mouseenter', () => {
            globalHoverSound.currentTime = 0;
            globalHoverSound.play().catch(() => { }); // Catch autoplay blocks silently
        });

        el.addEventListener('click', () => {
            globalClickSound.currentTime = 0;
            globalClickSound.play().catch(() => { });
        });
    });

    // Provide the playUISound function for the CLI terminal
    window.clickSound = globalClickSound;
    window.playUISound = function (soundObj) {
        if (soundObj) {
            soundObj.currentTime = 0;
            soundObj.play().catch(() => { });
        }
    };
})();