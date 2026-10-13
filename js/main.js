/*
  Gnailed â€” Interactive Features  (2026 Edition)
  Vanilla JavaScript â€” Mobile-first, accessible, performant
*/

'use strict';

// ============================================================
// ðŸ”¹ 1. RESPONSIVE NAVBAR TOGGLE
// ============================================================
const menuBtn  = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    // Lock body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}


// ============================================================
// ðŸ”¹ 2. IMAGE CAROUSEL
// ============================================================
const carouselSlides     = document.querySelectorAll('.carousel-slide');
const carouselPrevBtn    = document.querySelector('.carousel-btn.prev');
const carouselNextBtn    = document.querySelector('.carousel-btn.next');
const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');

if (carouselSlides.length > 0) {
  let currentSlide = 0;
  const total = carouselSlides.length;
  let autoPlayTimer;

  function showSlide(index) {
    carouselSlides.forEach(s => s.classList.remove('active'));
    carouselIndicators.forEach(i => i.classList.remove('active'));
    carouselSlides[index].classList.add('active');
    if (carouselIndicators[index]) carouselIndicators[index].classList.add('active');
  }

  function nextSlide() { currentSlide = (currentSlide + 1) % total; showSlide(currentSlide); }
  function prevSlide() { currentSlide = (currentSlide - 1 + total) % total; showSlide(currentSlide); }

  function startAutoPlay() { autoPlayTimer = setInterval(nextSlide, 5000); }
  function stopAutoPlay()  { clearInterval(autoPlayTimer); }
  function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

  carouselPrevBtn?.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
  carouselNextBtn?.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });

  carouselIndicators.forEach((ind, i) => {
    ind.addEventListener('click', () => { currentSlide = i; showSlide(i); resetAutoPlay(); });
  });

  // Touch/swipe support
  const carouselEl = document.querySelector('.carousel-container');
  if (carouselEl) {
    let touchStartX = 0;
    carouselEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carouselEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? nextSlide() : prevSlide(); resetAutoPlay(); }
    }, { passive: true });
    carouselEl.addEventListener('mouseenter', stopAutoPlay);
    carouselEl.addEventListener('mouseleave', startAutoPlay);
  }

  // Keyboard support
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { prevSlide(); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
  });

  startAutoPlay();
}


// ============================================================
// ðŸ”¹ 3. LIGHT / DARK MODE TOGGLE (Solar SVGs via CSS)
// ============================================================
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  const saved = localStorage.getItem('gnailed-theme') || 'light';
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('gnailed-theme', isDark ? 'dark' : 'light');
    themeToggle.blur();
  });

  // Ensure button resets cleanly on touch release
  ['touchend', 'pointerup'].forEach(evt => {
    themeToggle.addEventListener(evt, () => {
      setTimeout(() => themeToggle.blur(), 50);
    });
  });
}


// ============================================================
// 4. SCROLL-TO-TOP BUTTON
// ============================================================
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  const onScroll = () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollTopBtn.blur();
  });
}


// ============================================================
// ðŸ”¹ 5. HEADER SCROLL EFFECT
// ============================================================
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}


// ============================================================
// ðŸ”¹ 6. SCROLL-REVEAL (IntersectionObserver)
// ============================================================
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}


// ============================================================
// ðŸ”¹ 7. HERO PARALLAX (scroll-driven, requestAnimationFrame)
// ============================================================
const heroMedia = document.querySelector('.hero-media');
if (heroMedia) {
  let rafId;
  const onHeroScroll = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      // Subtle parallax â€” moves at 30% of scroll speed
      heroMedia.style.transform = `translateY(${scrollY * 0.30}px)`;
    });
  };
  window.addEventListener('scroll', onHeroScroll, { passive: true });
}


// ============================================================
// 8. PRODUCT CARDS (Tap to open, tap again to return to normal)
// ============================================================
const productTiles = document.querySelectorAll('.tile');

if (productTiles.length > 0) {
  productTiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      // Allow direct clicks on Buy Now button and detail zoom preview link to navigate
      if (e.target.closest('.buy-now') || e.target.closest('.tile-zoom-preview')) {
        return;
      }

      e.preventDefault();
      const wasActive = tile.classList.contains('is-active');

      // Close all cards
      productTiles.forEach(t => t.classList.remove('is-active'));

      // If this card was not already active, open it.
      // If it WAS active, it remains closed, returning the card to its normal state!
      if (!wasActive) {
        tile.classList.add('is-active');
      }
    });
  });

  // Clicking outside closes any open product card
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tile')) {
      productTiles.forEach(t => t.classList.remove('is-active'));
    }
  });
}


// ============================================================
// 9. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#' && !this.classList.contains('close')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = siteHeader ? siteHeader.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});


// ============================================================
// ðŸ”¹ 9. TABBED CONTENT (About page)
// ============================================================
const tabButtons  = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });
}


// ============================================================
// ðŸ”¹ 10. CONTACT FORM VALIDATION
// ============================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(id, msg) {
    const el = document.getElementById(`${id}-error`);
    const input = document.getElementById(id);
    if (el && input) { el.textContent = msg; el.style.display = 'block'; input.classList.add('error'); }
  }
  function clearError(id) {
    const el = document.getElementById(`${id}-error`);
    const input = document.getElementById(id);
    if (el && input) { el.textContent = ''; el.style.display = 'none'; input.classList.remove('error'); }
  }

  contactForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input.id));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    if (!name?.value.trim())   { showError('name', 'Please enter your full name'); isValid = false; }
    if (!email?.value.trim())  { showError('email', 'Please enter your email address'); isValid = false; }
    else if (!emailRegex.test(email.value.trim())) { showError('email', 'Please enter a valid email address'); isValid = false; }
    if (!subject?.value)       { showError('subject', 'Please select a subject'); isValid = false; }
    if (!message?.value.trim()) { showError('message', 'Please enter your message'); isValid = false; }
    else if (message.value.trim().length < 10) { showError('message', 'Message must be at least 10 characters'); isValid = false; }

    if (isValid) {
      const submitBtn  = contactForm.querySelector('.submit-btn');
      const btnText    = submitBtn?.querySelector('.btn-text');
      const btnLoading = submitBtn?.querySelector('.btn-loading');
      if (btnText)    btnText.style.display    = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (submitBtn)  submitBtn.disabled       = true;

      setTimeout(() => {
        if (btnText)    btnText.style.display    = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
        if (submitBtn)  submitBtn.disabled       = false;

        const success = document.getElementById('form-success');
        if (success) {
          success.style.display = 'block';
          setTimeout(() => { success.style.display = 'none'; }, 5000);
        }
        contactForm.reset();
      }, 1500);
    }
  });
}


// ============================================================
// ðŸ”¹ 11. DYNAMIC YEAR IN FOOTER
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ============================================================
// ðŸ”¹ 12. LAZY LOADING IMAGES (data-src pattern)
// ============================================================
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}


// ============================================================
// 13. FOOTER ACCORDIONS (Mobile Tap to Expand/Collapse)
// ============================================================
document.querySelectorAll('.footer-accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.innerWidth >= 768) return;

    const accordion = btn.closest('.footer-accordion');
    if (!accordion) return;

    const isOpen = accordion.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});


// ============================================================
// Dev console badge
// ============================================================
console.log('%cGnailed â€” Luxury Pre-Loved Fashion', 'font-size:15px;font-weight:700;color:#e8000d;');
console.log('%cVanilla JS â€” 2026 Edition', 'font-size:11px;color:#888;');

