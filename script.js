document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Project filtering
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project-card');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(c => {
        const types = c.dataset.type.split(' ');
        if (filter === 'all' || types.includes(filter)) {
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav on click
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // Theme toggle (dark/light)
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    themeBtn.textContent = document.documentElement.classList.contains('light') ? '☀️' : '🌙';
  });

  // Contact form submission simulation
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.textContent = 'Message sent — thank you! I will reply soon.';
        form.reset();
      }, 900);
    });
  }

  // GSAP animations (if included)
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-text h1', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' });
    gsap.from('.hero-card', { y: 30, opacity: 0, duration: 0.9, delay: 0.2, ease: 'power2.out' });

    // Section fade-in on scroll
    gsap.utils.toArray('.section').forEach(section => {
      gsap.from(section, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: section, start: 'top 85%' }
      });
    });

    // Project cards staggered animation
    gsap.from('.project-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      scrollTrigger: { trigger: '.projects', start: 'top 85%' }
    });
  }
});
