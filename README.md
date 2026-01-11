AMAN.SYS // V2.0 - 3D Cyber-Brutalist Portfolio

🌐 Overview

AMAN.SYS is a high-performance, immersive developer portfolio designed with a Cyber-Brutalist aesthetic. It moves away from traditional clean designs to embrace raw industrial grids, kinetic typography, and a "terminal-chic" interface.

This project showcases my work as an AI Architect and Flutter Developer, featuring a fully interactive 3D hero section, physics-based scroll animations, and a robust dark/light theming system.

Note: Replace 'https://www.google.com/search?q=assets/poster.png' with an actual screenshot of your site.

⚡ Key Features

3D Identity: An interactive 3D avatar rendered via Google's <model-viewer>, complete with mouse-tracking and environment lighting.

Cyber-Void Aesthetic: A custom design system featuring deep navy backgrounds, acid green/electric cyan accents, and raw grid overlays.

GSAP Motion Engine:

Smooth Scroll: Heavy, physics-based scrolling for a premium feel.

ScrollTriggers: Staggered text reveals and progress bars that animate as you explore.

Kinetic UI: Infinite marquees and magnetic cursor effects.

Dynamic Theming: One-click toggle between "System Dark" and "Clean Light" modes using advanced CSS variables.

Fully Responsive: Adaptive layouts that switch from complex grids on desktop to stacked, touch-friendly interfaces on mobile.

🛠️ Technical Stack

Category

Technology

Purpose

Core

HTML5, CSS3

Semantic structure and variable-based styling

Logic

JavaScript (ES6+)

State management, loaders, and event handling

3D Engine

<model-viewer>

Optimized WebGL rendering for GLB assets

Animation

GSAP 3

GreenSock Animation Platform (Core + ScrollTrigger + ScrollTo)

Typography

Google Fonts

'Koulen' (Headings) & 'Space Mono' (Body)

📂 Project Structure

/
├── index.html          # Main application structure & content
├── style.css           # Visual styling, responsiveness, and theme definitions
├── script.js           # GSAP animations, loader logic, and interactions
└── assets/
    └── model.glb       # 3D Character Model (Required)



🚀 How to Run Locally

To view the 3D elements correctly, you must run this project on a local server (browsers block 3D models file access for security).

Clone the Repository:

git clone [https://github.com/amanudewal/PORTFOLIO.git](https://github.com/amanudewal/PORTFOLIO.git)



Navigate to the Directory:

cd PORTFOLIO



Start a Local Server:

VS Code: Right-click index.html and select "Open with Live Server".

Python: python -m http.server

Node.js: npx serve

🎨 Customization Guide

Want to use this template? Here is how to make it yours:

Change Identity: Open index.html and replace "AMAN_UDEWAL" and the project details with your own.

Swap the 3D Model:

Get a .glb file (e.g., from ReadyPlayerMe).

Rename it to model.glb.

Replace the file in the assets/ folder.

Adjust Colors: Open style.css and modify the :root variables:

:root {
    --accent: #ff0055; /* Change your main accent color */
    --bg: #000000;     /* Change background color */
}

