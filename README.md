# C-Advertisements - Outdoor Advertising Agency

A modern, clean, and professional 5-page service website built for **C-Advertisements**, a premier outdoor advertising agency.

## 🌟 Features

*   **5-Page Structure:** Home (`index.html`), About, Services, Portfolio, and Contact pages.
*   **Modern Design:** Built with a premium `#800180` (purple) theme, subtle gradients, and soft shadows.
*   **Dark Mode Support:** Fully integrated dark mode with customized lighter purple (`#d98cd9`) text overrides ensuring perfect readability across themes.
*   **Scroll Animations:** Smooth component reveal animations and a dynamic stat count-up powered by Vanilla JS `IntersectionObserver`.
*   **Tailwind CSS Integration:** Rapid, utility-first styling implemented directly via the Tailwind CSS CDN.
*   **Core Services Refined:** Tailored completely to focus on *Outdoor-Ads*, *Mall-Ads*, *Cinema-Ads*, and *Indoor-Branding*.
*   **Fully Responsive:** Fluid layouts designed mobile-first, looking excellent on all device sizes.

## 📁 Project Structure

```text
/
├── css/
│   └── style.css       # Custom scrollbars, keyframe animations, and base overrides
├── js/
│   └── main.js         # IntersectionObservers for scroll reveals and stat count-up
├── index.html          # Homepage (Hero, Stats, Who We Are, Services, Portfolio)
├── about.html          # Company mission and story
├── services.html       # Detailed 4-grid service breakdowns
├── portfolio.html      # Image gallery of past campaigns
└── contact.html        # Interactive contact form and details
```

## 🚀 How to Run

Since this is a static site without any build steps (Tailwind runs via CDN), you can run it immediately in your browser:

1.  **Direct Open:** Simply double-click `index.html` to open it in your default web browser.
2.  **VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
3.  **Local Server (Python):** If you have Python installed, open your terminal in the project directory and run:
    ```bash
    python -m http.server 8000
    ```
    Then visit `http://localhost:8000` in your browser.

## 🎨 Design Tokens & Typography

- **Primary Color:** `#800180` (Deep Purple)
- **Primary Lighter (Dark Mode):** `#d98cd9` (Lavender)
- **Typography:** `Outfit` (Headings and Body text)
- **Icons:** Phosphor Web Icons (loaded via CDN)
- **Animations:** Custom fade-up reveals and sliding arrow hovers.
