// scripts.js - interactions for the academic platform
document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            navList.classList.toggle('open');
        });

        // close menu on link click
        navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            navList.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }));
    }

    // Reveal elements on scroll using IntersectionObserver
    const revealables = document.querySelectorAll('[data-animate]');
    if ('IntersectionObserver' in window && revealables.length) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

        revealables.forEach(el => io.observe(el));
    } else {
        // fallback
        revealables.forEach(el => el.classList.add('show'));
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});
