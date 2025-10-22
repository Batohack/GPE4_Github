// scripts.js - interactions for the academic platform

document.addEventListener('DOMContentLoaded', function(){
    // Nav toggle for mobile
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.querySelector('nav ul');
    navToggle && navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navList.classList.toggle('show');
    });

    // Login modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form');
    const loginStatus = document.getElementById('login-status');

    function openModal(){
        loginModal.setAttribute('aria-hidden','false');
        loginModal.classList.add('show');
        // focus on first input
        const first = loginModal.querySelector('input');
        first && first.focus();
    }
    function closeModal(){
        loginModal.setAttribute('aria-hidden','true');
        loginModal.classList.remove('show');
        loginStatus.textContent = '';
    }

    loginBtn && loginBtn.addEventListener('click', openModal);
    closeLogin && closeLogin.addEventListener('click', closeModal);
    loginModal && loginModal.addEventListener('click', (e)=>{
        if(e.target === loginModal) closeModal();
    });

    loginForm && loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const user = loginForm.user.value.trim();
        // Mock authentication: accept any non-empty user/pass
        if(user){
            loginStatus.textContent = 'Connexion réussie (mode démo).';
            setTimeout(closeModal, 800);
        } else {
            loginStatus.textContent = 'Identifiants invalides.';
        }
    });

    // Contact form (mock submit)
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');
    contactForm && contactForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        contactStatus.textContent = 'Envoi en cours...';
        setTimeout(()=>{
            contactStatus.textContent = 'Message envoyé. Merci !';
            contactForm.reset();
        }, 800);
    });

    // Rating
    const stars = Array.from(document.querySelectorAll('.star'));
    const ratingResult = document.getElementById('rating-result');
    stars.forEach(s => {
        s.addEventListener('click', ()=>{
            const v = parseInt(s.dataset.value,10);
            stars.forEach(st => st.setAttribute('aria-pressed','false'));
            for(let i=0;i<v;i++) stars[i].setAttribute('aria-pressed','true');
            ratingResult.textContent = `${v}/5`;
        });
        s.addEventListener('keydown',(e)=>{
            if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); s.click(); }
        });
    });

    // Search (mock client-side search across titles/content)
    const searchForm = document.getElementById('search-form');
    searchForm && searchForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const q = document.getElementById('search').value.trim().toLowerCase();
        if(!q) return;
        // Basic in-page search: highlight matches in headings and links
        const items = Array.from(document.querySelectorAll('h2,h3,a'));
        items.forEach(it => {
            it.classList.remove('highlight');
            if(it.textContent.toLowerCase().includes(q)){
                it.classList.add('highlight');
                it.scrollIntoView({behavior:'smooth',block:'center'});
            }
        });
    });

    // Keyboard escape to close modal
    document.addEventListener('keydown',(e)=>{
        if(e.key === 'Escape'){
            if(loginModal && loginModal.getAttribute('aria-hidden') === 'false') closeModal();
            if(navList && navList.classList.contains('show')) { navList.classList.remove('show'); navToggle.setAttribute('aria-expanded','false'); }
        }
    });

    // Reveal on scroll using IntersectionObserver
    const revealables = document.querySelectorAll('[data-animate]');
    if('IntersectionObserver' in window && revealables.length){
        const obs = new IntersectionObserver((entries)=>{
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('show');
                    obs.unobserve(entry.target);
                }
            });
        },{rootMargin:'0px 0px -10% 0px',threshold:0.15});
        revealables.forEach(el => el.classList.add('reveal'));
        revealables.forEach(el => obs.observe(el));
    }

    // Back to top button
    const back = document.getElementById('back-to-top');
    window.addEventListener('scroll', ()=>{
        if(window.scrollY > 400) back.classList.add('show'); else back.classList.remove('show');
    });
    back && back.addEventListener('click', ()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    });

});
