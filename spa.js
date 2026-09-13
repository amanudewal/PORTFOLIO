// SPA Router and Glitch Transitions
// This script intercepts internal links and dynamically loads the <main> content
// without full page reloads, keeping background music and 3D effects seamless.

document.addEventListener('DOMContentLoaded', () => {
    initSPA();
});

function initSPA() {
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;

        let href = link.getAttribute('href');
        
        // Ignore external links, mailto, and target blank
        if (!href || href.startsWith('http') || href.startsWith('mailto') || link.target === '_blank') return;

        // If it's an anchor link ON THE SAME PAGE, let default behavior happen or smooth scroll
        if (href.startsWith('#')) {
            // Already handled by GSAP ScrollToPlugin in script.js
            return; 
        }

        e.preventDefault();
        
        // Close mobile drawer if it's open
        if (typeof closeMobileDrawer === 'function') {
            closeMobileDrawer();
        } else {
            document.body.classList.remove('mobile-menu-open');
            const drawer = document.getElementById('mobile-drawer');
            const backdrop = document.getElementById('mobile-menu-backdrop');
            if(drawer) drawer.classList.remove('active');
            if(backdrop) backdrop.classList.remove('active');
        }

        navigateTo(href);
    });

    window.addEventListener('popstate', () => {
        navigateTo(window.location.pathname.split('/').pop() || 'portfolio.html', false);
    });
}

async function navigateTo(url, pushState = true) {
    if (pushState) {
        history.pushState({}, '', url);
    }

    const mainEl = document.querySelector('main');
    
    // Play Out Transition (Glitch/Fade)
    if (typeof gsap !== 'undefined') {
        await new Promise(resolve => {
            gsap.to(mainEl, {
                opacity: 0,
                y: 20,
                filter: "contrast(200%) hue-rotate(90deg)",
                duration: 0.4,
                ease: "power2.in",
                onComplete: resolve
            });
        });
    }

    try {
        const response = await fetch(url);
        const text = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // 1. Update Title
        document.title = doc.title;
        
        // 2. Replace <main> Content
        const newMain = doc.querySelector('main');
        if (newMain && mainEl) {
            // Clean up old ScrollTriggers
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.getAll().forEach(t => t.kill());
            }

            mainEl.innerHTML = newMain.innerHTML;
            mainEl.className = newMain.className; // sync any classes on main

            // 3. Update Navigation Links (Keep Buttons Intact!)
            updateNavLinks(doc);

            // 4. Re-initialize Page Scripts for new content
            reinitializeDynamicContent();

            // 5. Scroll to top
            window.scrollTo(0, 0);
        }
    } catch (error) {
        console.error('SPA Navigation Error:', error);
        window.location.href = url; // Fallback to hard load
    }

    // Play In Transition
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(mainEl, 
            { opacity: 0, y: -20, filter: "contrast(200%) hue-rotate(-90deg)" },
            { opacity: 1, y: 0, filter: "contrast(100%) hue-rotate(0deg)", duration: 0.6, ease: "power2.out", clearProps: "filter" }
        );
    } else {
        mainEl.style.opacity = 1;
    }
}

function updateNavLinks(newDoc) {
    // Desktop Nav
    const oldDesktopNav = document.querySelector('.desktop-nav');
    const newDesktopNav = newDoc.querySelector('.desktop-nav');
    if (oldDesktopNav && newDesktopNav) {
        const oldButtons = Array.from(oldDesktopNav.querySelectorAll('button'));
        const newLinks = Array.from(newDesktopNav.querySelectorAll('a'));
        
        oldDesktopNav.innerHTML = '';
        newLinks.forEach(a => oldDesktopNav.appendChild(a));
        oldButtons.forEach(btn => oldDesktopNav.appendChild(btn));
    }

    // Mobile Nav
    const oldMobileNav = document.querySelector('.mobile-nav-list');
    const newMobileNav = newDoc.querySelector('.mobile-nav-list');
    if (oldMobileNav && newMobileNav) {
        const oldMobileButtons = Array.from(oldMobileNav.querySelectorAll('button'));
        const newMobileLinks = Array.from(newMobileNav.querySelectorAll('a'));
        
        oldMobileNav.innerHTML = '';
        newMobileLinks.forEach(a => oldMobileNav.appendChild(a));
        oldMobileButtons.forEach(btn => oldMobileNav.appendChild(btn));
    }
}

function reinitializeDynamicContent() {
    // 1. Restart GSAP Animations
    if (typeof initAnimations === 'function') {
        setTimeout(() => {
            initAnimations();
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 100);
    }

    // 2. Re-bind UI Sounds & Hover Effects for NEW elements in <main>
    const mainEl = document.querySelector('main');
    const newInteractables = mainEl.querySelectorAll('a, button, .catalog-item, .cyber-input, .chip');
    
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    newInteractables.forEach(el => {
        // Hover effects
        el.addEventListener('mouseenter', () => {
            if(follower && cursor && typeof gsap !== "undefined") {
                gsap.to(follower, { width: 60, height: 60, backgroundColor: 'rgba(0, 243, 255, 0.1)', duration: 0.3 });
                gsap.to(cursor, { scale: 0, duration: 0.2 }); 
            }
            if (typeof playUISound === 'function' && typeof hoverSound !== 'undefined') {
                playUISound(hoverSound);
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if(follower && cursor && typeof gsap !== "undefined") {
                gsap.to(follower, { width: 40, height: 40, backgroundColor: 'transparent', duration: 0.3 });
                gsap.to(cursor, { scale: 1, duration: 0.2 }); 
            }
        });

        // Click sounds
        el.addEventListener('click', () => {
            if (typeof playUISound === 'function' && typeof clickSound !== 'undefined') {
                playUISound(clickSound);
            }
        });
    });
}
