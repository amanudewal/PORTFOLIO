AMAN.SYS // V2.0 - 3D Cyber-Brutalist Portfolio

A high-performance, immersive developer portfolio designed with a Cyber-Brutalist aesthetic. This project fuses high-fidelity 3D rendering with kinetic typography, physics-based scroll animations, and a raw industrial design system to showcase work in AI, Media Forensics, and Mobile Architecture.

🚀 Live Demo

[Insert your GitHub Pages Link Here]

⚡ Key Features

3D Hero Identity: Interactive GLB avatar rendered via <model-viewer> with mouse-tracking capabilities and kinetic entry animations.

Cyber-Void Design System: A custom "Dark Mode" palette featuring Deep Navy (#030b16) and Electric Cyan (#00f3ff) accents.

GSAP Motion Engine:

Smooth Scroll: Custom physics-based scrolling navigation using ScrollToPlugin.

Staggered Reveals: Complex timeline animations triggered by scroll positions.

Glitch Effects: Hover states and text animations that mimic digital noise.

Communication Hub: A dedicated contact section featuring a "Buy Me a Coffee" style email composer and direct social links.

Project Case Studies: Dedicated detail pages for individual projects (Deepfake Detector, Mental Health AI, Gen-AI).

Dynamic Theming: Instant toggle between "System Dark" and "Clean Light" modes with localStorage persistence.

Responsive Architecture: Fluid layouts that scale seamlessly from Mobile devices to 4K Desktops.

🛠️ Technical Stack

Component

Technology

Description

Core

HTML5, CSS3

Semantic markup and CSS Custom Properties (Variables)

Logic

JavaScript (ES6+)

Theme logic, loader sequences, and event handling

3D Engine

<model-viewer>

Google's web component for optimized glTF/GLB rendering

Animation

GSAP 3

GreenSock Animation Platform (Core + ScrollTrigger + ScrollTo)

Typography

Google Fonts

'Koulen' (Headers) & 'Space Mono' (Body)

📂 Project Structure

/
├── index.html                  # Main landing page
├── project-deepfake.html       # Case Study: Deepfake Detector
├── project-mental-health.html  # Case Study: Mental Health AI
├── project-gen-ai.html         # Case Study: Cinematic Gen AI
├── style.css                   # Global styles & responsive logic
├── script.js                   # Animations, Cursor, Loader & Theme logic
└── assets/
    ├── model.glb               # 3D Avatar file
    ├── bg-music.mp3            # Background audio
    └── Aman_Resume.pdf         # Resume file


💻 How to Run Locally

If you want to view or edit this project on your machine, follow these steps.

Prerequisites: You need Git installed. You also need a local server (VS Code Live Server extension is recommended) because browsers block 3D models from loading directly due to CORS security policies.

Clone the repository:

git clone [https://github.com/amanudewal/PORTFOLIO.git](https://github.com/amanudewal/PORTFOLIO.git)


Navigate to the directory:

cd PORTFOLIO


Start a Local Server:

VS Code: Right-click index.html and select "Open with Live Server".

Python: python -m http.server

Node.js: npx serve

🎨 Customization Guide

Change Identity: Open index.html and replace "AMAN_UDEWAL" and the project details with your own.

Swap the 3D Model:

Get a .glb file (e.g., from ReadyPlayerMe).

Rename it to model.glb.

Replace the file in the assets/ folder.

Configure Contact:

Open index.html and search for the <form id="emailForm">.

Change the value inside window.location.href in script.js to your email address.

📡 Contact

GitHub: @amanudewal

LinkedIn: Aman Ramakant Udewal

Email: udewal.aman@gmail.com

Engineered by Aman Ramakant Udewal © 2026