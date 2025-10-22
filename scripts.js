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

    // Theme & palette controls (persist preferences)
    (function(){
        const root = document.documentElement;
        const themeToggle = document.getElementById('theme-toggle');
        const paletteSelect = document.getElementById('palette-select');

        function applyTheme(t){
            root.setAttribute('data-theme', t);
            try{ localStorage.setItem('site-theme', t); }catch(e){}
            if(themeToggle) themeToggle.setAttribute('aria-pressed', String(t === 'dark'));
        }

        function applyPalette(p){
            root.setAttribute('data-palette', p);
            try{ localStorage.setItem('site-palette', p); }catch(e){}
        }

        const savedTheme = (function(){ try{return localStorage.getItem('site-theme')}catch(e){return null} })();
        const savedPalette = (function(){ try{return localStorage.getItem('site-palette')}catch(e){return 'default'} })() || 'default';
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
        applyPalette(savedPalette);
        if(paletteSelect) paletteSelect.value = savedPalette;

        themeToggle && themeToggle.addEventListener('click', ()=>{
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });

        paletteSelect && paletteSelect.addEventListener('change', ()=>{
            applyPalette(paletteSelect.value);
        });

    })();

