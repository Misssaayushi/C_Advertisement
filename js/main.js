/**
 * C-Advertisements Main JS
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle (if needed down the line, simple alert for now)
    const mobileMenuBtn = document.querySelector('button[aria-label="Open Menu"]');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            alert('Mobile menu to be implemented. Currently in Phase 1.');
        });
    }

    // 2. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Stats Count-Up Animation with Intersection Observer
    const statElements = document.querySelectorAll('.stat-number');
    
    // Function to run the count up
    const runCountUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / target));
        let count = 0;
        
        const timer = setInterval(() => {
            count += 1;
            el.textContent = count;
            if (count >= target) {
                clearInterval(timer);
                el.textContent = target; // Ensure it ends exactly on target
            }
        }, stepTime);
    };

    const statsOptions = {
        threshold: 0.5 // Trigger when stat section is 50% visible
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all stats within this section and animate them
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => runCountUp(stat));
                
                // Unobserve the section after triggering
                observer.unobserve(entry.target);
            }
        });
    }, statsOptions);

    // Observe the stats section
    const statsSection = document.querySelector('section.bg-primary');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // 4. Dark Mode Toggle
    const themeToggleDarkIcons = document.querySelectorAll('#theme-toggle-dark-icon-desktop, #theme-toggle-dark-icon-mobile');
    const themeToggleLightIcons = document.querySelectorAll('#theme-toggle-light-icon-desktop, #theme-toggle-light-icon-mobile');
    const themeToggleBtns = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');

    if (themeToggleBtns.length > 0) {
        if (localStorage.getItem('theme-preference') === 'dark') {
            themeToggleLightIcons.forEach(icon => icon.classList.remove('hidden'));
            document.documentElement.classList.add('dark');
        } else {
            themeToggleDarkIcons.forEach(icon => icon.classList.remove('hidden'));
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                themeToggleDarkIcons.forEach(icon => icon.classList.toggle('hidden'));
                themeToggleLightIcons.forEach(icon => icon.classList.toggle('hidden'));

                if (localStorage.getItem('theme-preference')) {
                    if (localStorage.getItem('theme-preference') === 'light') {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('theme-preference', 'dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('theme-preference', 'light');
                    }
                } else {
                    if (document.documentElement.classList.contains('dark')) {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('theme-preference', 'light');
                    } else {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('theme-preference', 'dark');
                    }
                }
            });
        });
    }

});
