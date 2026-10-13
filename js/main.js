/*
  Gnailed — Interactive Features
  Vanilla JavaScript for responsive navbar, carousel, dark mode, scroll-to-top, tabs, and form validation
*/

// ========================================
// 🔹 1. RESPONSIVE NAVBAR TOGGLE
// ========================================
// Purpose: Collapses navigation into a hamburger menu on mobile devices
// How it works: Toggles visibility of nav links when hamburger button is clicked

const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    // Toggle the 'active' class to show/hide mobile menu
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Update ARIA attribute for accessibility
    const isExpanded = navLinks.classList.contains('active');
    menuBtn.setAttribute('aria-expanded', isExpanded);
  });

  // Close mobile menu when clicking a nav link
  const navLinksItems = navLinks.querySelectorAll('a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}


// ========================================
// 🔹 2. IMAGE CAROUSEL (SLIDER)
// ========================================
// Purpose: Automatically cycles through carousel images with manual navigation
// How it works: Changes active slide every 5 seconds, or when user clicks prev/next buttons

const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselPrevBtn = document.querySelector('.carousel-btn.prev');
const carouselNextBtn = document.querySelector('.carousel-btn.next');
const carouselIndicators = document.querySelectorAll('.carousel-indicators .indicator');

if (carouselSlides.length > 0) {
  let currentSlide = 0;
  const totalSlides = carouselSlides.length;
  let autoPlayInterval;

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and indicators
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    carouselSlides[index].classList.add('active');
    if (carouselIndicators[index]) {
      carouselIndicators[index].classList.add('active');
    }
  }

  // Function to go to next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Function to go to previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Auto-play carousel every 5 seconds
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  // Stop auto-play (useful when user interacts manually)
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Restart auto-play after manual interaction
  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Event listeners for navigation buttons
  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  // Event listeners for indicator dots
  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoPlay();
    });
  });

  // Keyboard navigation for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Pause auto-play when user hovers over carousel
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Start auto-play on page load
  startAutoPlay();
}


// ========================================
// 🔹 3. LIGHT/DARK MODE TOGGLE
// ========================================
// Purpose: Switches between light and dark themes dynamically
// How it works: Toggles 'dark-mode' class on body and saves preference to localStorage

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

if (themeToggle) {
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update icon and save preference
    if (document.body.classList.contains('dark-mode')) {
      if (themeIcon) themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      if (themeIcon) themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
}


// ========================================
// 🔹 4. SCROLL-TO-TOP BUTTON
// ========================================
// Purpose: Shows a button when user scrolls down, clicking it scrolls back to top
// How it works: Button appears after scrolling 300px, smooth scrolls to top on click

const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Smooth scroll to top when clicked
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// ========================================
// 🔹 5. TABBED CONTENT (About Page)
// ========================================
// Purpose: Displays content in tabs that can be switched without reloading
// How it works: Shows/hides tab content based on which tab button is clicked

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0) {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the target tab from data attribute
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}


// ========================================
// 🔹 6. CONTACT FORM VALIDATION
// ========================================
// Purpose: Validates contact form inputs before submission
// How it works: Checks required fields, email format, and displays error messages

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to show error message
  function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      inputElement.classList.add('error');
    }
  }

  // Function to clear error message
  function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
      inputElement.classList.remove('error');
    }
  }

  // Clear errors on input
  const formInputs = contactForm.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      clearError(input.id);
    });
  });

  // Form submission handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear all previous errors
    formInputs.forEach(input => clearError(input.id));
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError('name', 'Please enter your full name');
      isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    if (!email.value.trim()) {
      showError('email', 'Please enter your email address');
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    if (!subject.value) {
      showError('subject', 'Please select a subject');
      isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError('message', 'Please enter your message');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError('message', 'Message must be at least 10 characters long');
      isValid = false;
    }
    
    // If form is valid, simulate submission
    if (isValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;
      
      // Simulate API call (replace with actual submission in production)
      setTimeout(() => {
        // Hide loading state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Show success message
        const successMessage = document.getElementById('form-success');
        if (successMessage) {
          successMessage.style.display = 'block';
        }
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          if (successMessage) {
            successMessage.style.display = 'none';
          }
        }, 5000);
      }, 1500);
    }
  });
}


// ========================================
// 🔹 7. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
// Purpose: Provides smooth scrolling for internal anchor links
// How it works: Intercepts anchor link clicks and scrolls smoothly to target

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only handle actual anchor links, not empty # or close buttons
    if (href && href !== '#' && !this.classList.contains('close')) {
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});


// ========================================
// 🔹 8. DYNAMIC YEAR IN FOOTER
// ========================================
// Purpose: Automatically updates copyright year in footer
// How it works: Sets current year on page load

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ========================================
// 🔹 9. LAZY LOADING IMAGES (Performance)
// ========================================
// Purpose: Improves page load performance by lazy loading images
// How it works: Uses Intersection Observer API to load images when they enter viewport

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
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

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}


// ========================================
// 🔹 10. HEADER SCROLL EFFECT
// ========================================
// Purpose: Adds shadow to header when scrolling for better visibility
// How it works: Adds 'scrolled' class to header after scrolling 50px

const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });
}


// ========================================
// Console message for developers
// ========================================
console.log('%c🎨 Gnailed — Luxury Pre-Loved Fashion', 'font-size: 16px; font-weight: bold; color: #000;');
console.log('%cBuilt with ❤️ using Vanilla JavaScript & Tailwind CSS', 'font-size: 12px; color: #666;');
