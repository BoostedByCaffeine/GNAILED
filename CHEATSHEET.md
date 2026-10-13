# 🎨 Gnailed Project - Effects & Features Cheatsheet
## Complete Guide with Logical Explanations

> **A comprehensive reference for all JavaScript functions, Bootstrap effects, and interactive features in the Gnailed luxury fashion website project.**

### 📌 Quick Stats
- **10 JavaScript Features** with detailed logic explanations
- **5 Bootstrap Components** with usage examples
- **459 Lines** of vanilla JavaScript (no libraries!)
- **Bootstrap 5.3.2** for utilities and responsive design
- **All custom-built** interactive components

---

## Table of Contents
1. [JavaScript Functions with Logic](#javascript-functions-with-logic)
2. [Bootstrap Effects & Components](#bootstrap-effects--components)
3. [CSS Hover Effects](#css-hover-effects)
4. [Animation Effects](#animation-effects)
5. [Quick Reference](#quick-reference)

---

## JavaScript Functions with Logic

### 1. 🍔 Responsive Navbar Toggle
**Feature:** Mobile hamburger menu
**Location:** `js/main.js` (Lines 12-44)

**HTML Elements:**
```html
<button id="menu-btn" class="menu-toggle">
  <span class="hamburger"></span>
</button>
<nav id="nav-links" class="primary-nav">
```

**JavaScript Code:**
```javascript
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuBtn.classList.toggle('active');
  const isExpanded = navLinks.classList.contains('active');
  menuBtn.setAttribute('aria-expanded', isExpanded);
});
```

**🧠 Logical Explanation:**
1. **DOM Selection:** First, we grab references to the menu button and navigation links using `getElementById()`
2. **Event Listener:** We attach a click event to the menu button
3. **Toggle Logic:** When clicked, `classList.toggle('active')` adds the class if it doesn't exist, removes it if it does
4. **State Check:** We check if the menu is now open by seeing if 'active' class exists
5. **Accessibility Update:** We update `aria-expanded` to tell screen readers whether the menu is open (true) or closed (false)
6. **Outside Click Detection:** A separate event listener on the document checks if clicks happen outside both the button and menu, then closes the menu
7. **Auto-close on Navigation:** When any nav link is clicked, the menu automatically closes for better UX

**Why this approach?**
- **Toggle instead of if/else:** More concise and handles both open/close states automatically
- **ARIA attributes:** Makes the site accessible to screen readers
- **Outside click:** Improves UX by allowing users to close menu intuitively

---

### 2. 🎠 Image Carousel (Slider)
**Feature:** Auto-playing image carousel with manual controls
**Location:** `js/main.js` (Lines 53-148)

**HTML Elements:**
```html
<div class="carousel-container">
  <div class="carousel-slide active">
    <img src="carouselPics/carouselPic1.png">
  </div>
  <button class="carousel-btn prev">‹</button>
  <button class="carousel-btn next">›</button>
  <div class="carousel-indicators">
    <button class="indicator active" data-slide="0"></button>
  </div>
</div>
```

**JavaScript Functions:**
```javascript
// Show specific slide
function showSlide(index) {
  carouselSlides.forEach(slide => slide.classList.remove('active'));
  carouselIndicators.forEach(indicator => indicator.classList.remove('active'));
  carouselSlides[index].classList.add('active');
  carouselIndicators[index].classList.add('active');
}

// Navigate to next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

// Navigate to previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Auto-play every 5 seconds
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}
```

**🧠 Logical Explanation:**

**Core Logic - Slide Management:**
1. **State Variable:** `currentSlide` tracks which slide is visible (0-indexed)
2. **Total Slides:** We count all `.carousel-slide` elements to know the range
3. **Active Class Pattern:** Only one slide has `active` class at a time, making it visible via CSS

**showSlide() Function Logic:**
1. **Clear All:** First, remove `active` from ALL slides and indicators using `forEach()`
2. **Set One:** Then add `active` only to the target slide and its corresponding indicator
3. **Why this works:** CSS shows elements with `active` class, hides others

**Navigation Logic - Modulo Math:**
```javascript
// Next: (currentSlide + 1) % totalSlides
// If currentSlide = 3 and totalSlides = 4:
// (3 + 1) % 4 = 0  → wraps back to first slide

// Previous: (currentSlide - 1 + totalSlides) % totalSlides
// If currentSlide = 0 and totalSlides = 4:
// (0 - 1 + 4) % 4 = 3  → wraps to last slide
```
**Why modulo?** Creates infinite loop: last slide → first slide, first slide → last slide

**Auto-Play Logic:**
1. **setInterval:** Calls `nextSlide()` every 5000ms (5 seconds)
2. **Store Reference:** Save interval ID in `autoPlayInterval` variable
3. **Why store it?** So we can stop/restart the interval later

**Pause/Resume Logic:**
1. **stopAutoPlay():** Uses `clearInterval(autoPlayInterval)` to stop the timer
2. **resetAutoPlay():** Stops current timer, then starts fresh one
3. **Why reset?** Prevents multiple timers running simultaneously after user interaction

**Event Handling:**
- **Prev/Next Buttons:** Call respective functions + reset auto-play
- **Indicator Dots:** Jump directly to specific slide using `data-slide` attribute
- **Keyboard:** Arrow keys trigger prev/next for accessibility
- **Hover Events:** `mouseenter` pauses, `mouseleave` resumes (better UX when reading)

**Why this approach?**
- **Modulo arithmetic:** Elegant infinite loop without complex if/else
- **Single source of truth:** `currentSlide` variable controls everything
- **Separation of concerns:** `showSlide()` handles display, navigation functions handle logic
- **User-friendly:** Auto-play pauses when user interacts, preventing jarring transitions

---

### 3. 🌓 Light/Dark Mode Toggle
**Feature:** Theme switcher with localStorage persistence
**Location:** `js/main.js` (Lines 157-183)

**HTML Elements:**
```html
<button id="theme-toggle" class="theme-toggle">
  <span class="theme-icon">🌙</span>
</button>
```

**JavaScript Code:**
```javascript
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});
```

**🧠 Logical Explanation:**

**Persistence Logic - localStorage:**
1. **Read on Load:** `localStorage.getItem('theme')` retrieves saved preference
2. **Default Fallback:** `|| 'light'` provides default if no preference exists
3. **localStorage API:** Browser's built-in key-value storage that persists across sessions
4. **Why localStorage?** Survives page refreshes, browser closes, even computer restarts

**Initialization Logic:**
```javascript
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.textContent = '☀️';
}
```
- **Runs on page load:** Checks saved preference BEFORE user sees anything
- **Applies immediately:** Prevents "flash" of wrong theme
- **Icon sync:** Updates icon to match theme (sun for dark mode = "click to go light")

**Toggle Logic Flow:**
1. **Toggle Class:** `classList.toggle('dark-mode')` switches the class on `<body>`
2. **Check State:** `contains('dark-mode')` determines current state
3. **Conditional Updates:**
   - If dark mode active → Show sun icon ☀️ + save 'dark' to localStorage
   - If light mode active → Show moon icon 🌙 + save 'light' to localStorage
4. **Save Preference:** `localStorage.setItem()` stores choice for next visit

**CSS Connection:**
```css
/* CSS responds to the class */
body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
```
- **Single class controls everything:** All dark mode styles use `.dark-mode` selector
- **Cascade effect:** Child elements inherit or respond to parent's dark-mode class

**Why this approach?**
- **Persistent UX:** User's choice remembered forever (until they clear browser data)
- **Performance:** localStorage is synchronous and instant
- **Simple state management:** One class on `<body>` controls entire theme
- **Icon logic:** Sun in dark mode = "click for light", intuitive for users

---

### 4. ⬆️ Scroll-to-Top Button
**Feature:** Floating button that appears when scrolling down
**Location:** `js/main.js` (Lines 192-211)

**HTML Elements:**
```html
<button id="scroll-top" class="scroll-top-btn">↑</button>
```

**JavaScript Code:**
```javascript
const scrollTopBtn = document.getElementById('scroll-top');

// Show/hide based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// Smooth scroll to top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
```

**🧠 Logical Explanation:**

**Scroll Detection Logic:**
1. **window.pageYOffset:** Returns vertical scroll position in pixels from top
2. **Threshold Check:** `> 300` means button appears after scrolling 300px down
3. **Why 300px?** Balances visibility (not too early) and usefulness (not too late)
4. **Continuous Monitoring:** Scroll event fires repeatedly as user scrolls

**Visibility Toggle:**
```javascript
if (window.pageYOffset > 300) {
  scrollTopBtn.classList.add('visible');  // Show button
} else {
  scrollTopBtn.classList.remove('visible');  // Hide button
}
```
- **Conditional class:** CSS uses `.visible` class to control opacity/transform
- **Add vs Remove:** More efficient than toggling (we know exact state needed)

**Smooth Scroll Logic:**
```javascript
window.scrollTo({
  top: 0,              // Destination: top of page
  behavior: 'smooth'   // Animation type
});
```
- **Native API:** Browser handles animation automatically
- **top: 0:** Scrolls to very top of document
- **behavior: 'smooth':** Creates animated scroll instead of instant jump
- **Why smooth?** Better UX, less jarring, helps user maintain orientation

**Performance Consideration:**
- **Scroll events fire frequently:** Can trigger hundreds of times per second
- **Lightweight operation:** Only checks number and adds/removes class
- **No debouncing needed:** Operation is so simple it doesn't impact performance

**Why this approach?**
- **Progressive enhancement:** Button only appears when needed
- **Native smooth scroll:** No animation library required
- **Simple threshold:** Easy to adjust based on page design

---

### 5. 📑 Tabbed Content
**Feature:** Tab switching without page reload
**Location:** `js/main.js` (Lines 220-241)

**HTML Elements:**
```html
<button class="tab-btn active" data-tab="tab1">Tab 1</button>
<button class="tab-btn" data-tab="tab2">Tab 2</button>

<div id="tab1" class="tab-content active">Content 1</div>
<div id="tab2" class="tab-content">Content 2</div>
```

**JavaScript Code:**
```javascript
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    // Remove active from all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active to clicked tab
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});
```

**🧠 Logical Explanation:**

**Data Attribute Pattern:**
```html
<button data-tab="tab1">  <!-- Button stores target ID -->
<div id="tab1">            <!-- Content has matching ID -->
```
- **data-tab attribute:** Custom HTML5 data attribute links button to content
- **Naming convention:** Button's `data-tab` value matches content's `id`
- **Why this pattern?** Scalable - add new tabs without changing JavaScript

**Tab Switching Algorithm:**
1. **Get Target:** `getAttribute('data-tab')` reads which content to show
2. **Clear All States:** Remove `active` from ALL buttons and content panels
3. **Set New State:** Add `active` to clicked button and target content
4. **CSS Handles Display:** `.active` class controls visibility

**Why "Clear All, Then Set One"?**
```javascript
// Step 1: Deactivate everything
tabButtons.forEach(btn => btn.classList.remove('active'));
tabContents.forEach(content => content.classList.remove('active'));

// Step 2: Activate only the target
button.classList.add('active');
document.getElementById(targetTab).classList.add('active');
```
- **Guarantees single active tab:** Impossible to have multiple tabs open
- **Simpler than tracking state:** No need to remember "previous" tab
- **Idempotent:** Running twice produces same result

**Event Delegation Alternative (Not Used Here):**
```javascript
// Could use single listener on parent instead of forEach
// Current approach is clearer for beginners
```

**Why this approach?**
- **Declarative:** HTML declares relationships via data attributes
- **No hardcoded IDs:** JavaScript doesn't need to know specific tab names
- **Easy to extend:** Add more tabs by just adding HTML
- **Clean state management:** Always exactly one active tab

---

### 6. ✉️ Contact Form Validation
**Feature:** Client-side form validation with error messages
**Location:** `js/main.js` (Lines 250-367)

**HTML Elements:**
```html
<form id="contact-form">
  <input type="text" id="name">
  <span id="name-error" class="error-message"></span>
  
  <input type="email" id="email">
  <span id="email-error" class="error-message"></span>
  
  <select id="subject"></select>
  <span id="subject-error" class="error-message"></span>
  
  <textarea id="message"></textarea>
  <span id="message-error" class="error-message"></span>
  
  <button class="submit-btn">
    <span class="btn-text">Submit</span>
    <span class="btn-loading">Loading...</span>
  </button>
</form>
<div id="form-success">Success message</div>
```

**JavaScript Functions:**
```javascript
// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Show error
function showError(inputId, message) {
  const errorElement = document.getElementById(`${inputId}-error`);
  const inputElement = document.getElementById(inputId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  inputElement.classList.add('error');
}

// Clear error
function clearError(inputId) {
  const errorElement = document.getElementById(`${inputId}-error`);
  const inputElement = document.getElementById(inputId);
  errorElement.textContent = '';
  errorElement.style.display = 'none';
  inputElement.classList.remove('error');
}

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate all fields
  // Show loading state
  // Simulate API call
  // Show success message
  // Reset form
});
```

**🧠 Logical Explanation:**

**Regex Pattern Matching:**
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```
- **^** = Start of string
- **[^\s@]+** = One or more characters that are NOT whitespace or @
- **@** = Literal @ symbol
- **[^\s@]+** = Domain name (no spaces or @)
- **\.** = Literal dot (escaped)
- **[^\s@]+** = Top-level domain (.com, .org, etc.)
- **$** = End of string
- **Why regex?** Validates email format without server-side check

**Error Display Logic:**
```javascript
function showError(inputId, message) {
  const errorElement = document.getElementById(`${inputId}-error`);
  const inputElement = document.getElementById(inputId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  inputElement.classList.add('error');
}
```
1. **Template literal:** `${inputId}-error` creates error element ID dynamically
2. **Set message:** Updates error text content
3. **Make visible:** Changes display from 'none' to 'block'
4. **Visual feedback:** Adds 'error' class to input (typically red border)

**Validation Flow:**
1. **preventDefault():** Stops form from submitting to server
2. **Clear all errors:** Start fresh each validation attempt
3. **Validate each field:** Check one by one, set `isValid = false` if any fail
4. **Conditional submission:** Only proceed if `isValid === true`

**Loading State Pattern:**
```javascript
btnText.style.display = 'none';      // Hide "Submit" text
btnLoading.style.display = 'inline';  // Show "Loading..." text
submitBtn.disabled = true;            // Prevent double-submission
```
- **Why disable button?** Prevents user from clicking multiple times
- **Visual feedback:** User knows something is happening

**Async Simulation:**
```javascript
setTimeout(() => {
  // Hide loading, show success, reset form
}, 1500);
```
- **setTimeout:** Simulates network delay (1.5 seconds)
- **Real implementation:** Would use `fetch()` or `axios` for actual API call

**Real-time Error Clearing:**
```javascript
input.addEventListener('input', () => {
  clearError(input.id);
});
```
- **input event:** Fires as user types
- **Immediate feedback:** Error disappears when user starts correcting
- **Better UX:** User doesn't have to resubmit to see error is fixed

**Validation Rules:**
- ✅ Name: Required, cannot be empty (`!name.value.trim()`)
- ✅ Email: Required + regex match (`!emailRegex.test(email.value)`)
- ✅ Subject: Required select option (`!subject.value`)
- ✅ Message: Required + min 10 chars (`message.value.trim().length < 10`)
- ✅ Shows loading state during submission
- ✅ Displays success message for 5 seconds
- ✅ Clears errors on input

**Why this approach?**
- **Client-side validation:** Instant feedback, no server round-trip
- **Reusable functions:** `showError()` and `clearError()` work for any field
- **Progressive enhancement:** Form still works if JavaScript fails (server validates)
- **User-friendly:** Errors clear as user types, not just on resubmit

---

### 7. 🔗 Smooth Scroll for Anchor Links
**Feature:** Smooth scrolling for internal page links
**Location:** `js/main.js` (Lines 376-393)

**HTML Elements:**
```html
<a href="#about">About</a>
<a href="#services">Services</a>
<a href="#shop">Shop</a>
```

**JavaScript Code:**
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
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
```

**🧠 Logical Explanation:**

**CSS Selector Logic:**
```javascript
'a[href^="#"]'  // Selects all <a> tags where href STARTS WITH #
```
- **Attribute selector:** `[href^="#"]` means "href begins with #"
- **Catches all anchors:** `#about`, `#services`, `#contact`, etc.
- **Why this selector?** Targets only internal page links, not external URLs

**Filtering Logic:**
```javascript
if (href && href !== '#' && !this.classList.contains('close'))
```
1. **href exists:** Ensures link has href attribute
2. **Not empty anchor:** Excludes `href="#"` (often used for JavaScript triggers)
3. **Not close button:** Excludes lightbox close buttons that also use `#`
- **Why filter?** Prevents breaking other functionality that uses `#`

**Scroll Behavior:**
```javascript
target.scrollIntoView({
  behavior: 'smooth',  // Animated scroll
  block: 'start'       // Align target to top of viewport
});
```
- **scrollIntoView():** Native browser API for scrolling to elements
- **behavior: 'smooth':** CSS scroll-behavior animation
- **block: 'start':** Positions element at top (vs 'center', 'end', 'nearest')

**preventDefault() Logic:**
```javascript
e.preventDefault();  // Stop default jump behavior
```
- **Why prevent default?** Browser normally jumps instantly to anchor
- **We want smooth scroll:** So we block default and use our own method
- **URL still updates:** Browser history still records the # change

**Why this approach?**
- **Progressive enhancement:** Works even if JavaScript fails (falls back to instant scroll)
- **Selective application:** Only affects internal anchors, not all links
- **Native API:** Uses browser's built-in smooth scrolling

---

### 8. 📅 Dynamic Year in Footer
**Feature:** Auto-updates copyright year
**Location:** `js/main.js` (Lines 402-405)

**HTML Elements:**
```html
<small>© <span id="year">2025</span> Gnailed. All rights reserved.</small>
```

**JavaScript Code:**
```javascript
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
```

**🧠 Logical Explanation:**

**Date Object:**
```javascript
new Date()           // Creates Date object with current date/time
.getFullYear()       // Extracts 4-digit year (e.g., 2025)
```
- **new Date():** JavaScript's built-in date constructor
- **getFullYear():** Returns current year as number
- **Why not hardcode?** Automatically updates every year without code changes

**Defensive Check:**
```javascript
if (yearElement) { ... }
```
- **Null check:** Ensures element exists before accessing it
- **Why needed?** Script runs on all pages, but element might not exist on every page
- **Prevents errors:** Avoids "Cannot set property of null" error

**textContent vs innerHTML:**
- **textContent used:** Safer, only sets text (no HTML parsing)
- **innerHTML alternative:** Would allow HTML injection (security risk)
- **Best practice:** Use textContent for plain text

**Why this approach?**
- **Set and forget:** Never needs manual updating
- **Runs on load:** Executes immediately when page loads
- **Universal:** Works on any page with the element

---

### 9. 🖼️ Lazy Loading Images
**Feature:** Performance optimization for images
**Location:** `js/main.js` (Lines 414-432)

**HTML Elements:**
```html
<img data-src="path/to/image.jpg" alt="Description">
```

**JavaScript Code:**
```javascript
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

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
```

**🧠 Logical Explanation:**

**Feature Detection:**
```javascript
if ('IntersectionObserver' in window) { ... }
```
- **Check browser support:** Not all browsers support IntersectionObserver
- **Graceful degradation:** If not supported, images load normally (via src attribute)
- **Why check?** Prevents errors in older browsers

**IntersectionObserver API:**
```javascript
new IntersectionObserver((entries, observer) => { ... })
```
- **Modern browser API:** Detects when elements enter/exit viewport
- **entries:** Array of observed elements and their intersection status
- **observer:** Reference to the observer itself (for cleanup)
- **Callback fires:** Whenever observed element's visibility changes

**Intersection Logic:**
```javascript
if (entry.isIntersecting) { ... }
```
- **isIntersecting:** Boolean - true when element enters viewport
- **Viewport:** Visible area of browser window
- **Threshold:** Default 0% - triggers as soon as 1 pixel is visible

**Image Loading Sequence:**
```javascript
const img = entry.target;              // 1. Get the image element
if (img.dataset.src) {                 // 2. Check if data-src exists
  img.src = img.dataset.src;           // 3. Copy data-src to src (triggers load)
  img.removeAttribute('data-src');     // 4. Clean up data attribute
  observer.unobserve(img);             // 5. Stop observing (already loaded)
}
```

**Why This Sequence?**
1. **data-src → src:** Browser only downloads when `src` is set
2. **Remove attribute:** Cleanup, prevents re-loading
3. **unobserve:** Performance - stop watching loaded images

**Setup Phase:**
```javascript
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```
- **Select all lazy images:** Find images with `data-src` attribute
- **Start observing:** Tell observer to watch each image
- **Automatic:** Observer handles everything from here

**Performance Benefits:**
```
Without lazy loading:
- Page loads: 100 images × 500KB = 50MB downloaded immediately
- Slow initial load, wasted bandwidth for images user never sees

With lazy loading:
- Page loads: Only visible images (maybe 5 × 500KB = 2.5MB)
- Fast initial load, images load as user scrolls
- Saves bandwidth, improves perceived performance
```

**Why this approach?**
- **Native API:** No library needed, built into modern browsers
- **Automatic:** Once set up, handles everything
- **Performance:** Dramatically reduces initial page load time
- **User experience:** Page becomes interactive faster

---

### 10. 📜 Header Scroll Effect
**Feature:** Adds shadow to header when scrolling
**Location:** `js/main.js` (Lines 441-451)

**HTML Elements:**
```html
<header class="site-header">
```

**JavaScript Code:**
```javascript
const siteHeader = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
});
```

**🧠 Logical Explanation:**

**Scroll Position Detection:**
```javascript
window.pageYOffset > 50
```
- **pageYOffset:** Pixels scrolled from top of page
- **50px threshold:** Small enough to trigger quickly, large enough to avoid flicker
- **Why 50?** Balances responsiveness with avoiding trigger on tiny scrolls

**State Management:**
```javascript
if (scrolled > 50) {
  siteHeader.classList.add('scrolled');     // Add shadow
} else {
  siteHeader.classList.remove('scrolled');  // Remove shadow
}
```
- **Binary state:** Either scrolled or not, no in-between
- **CSS controls appearance:** JavaScript only manages state class
- **Separation of concerns:** Logic in JS, styling in CSS

**CSS Connection:**
```css
.site-header {
  /* Default: no shadow */
  box-shadow: none;
  transition: box-shadow 0.3s ease;
}

.site-header.scrolled {
  /* Scrolled: add shadow for depth */
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

**UX Purpose:**
1. **Visual hierarchy:** Shadow creates depth, separates header from content
2. **Scroll indicator:** Subtle cue that page has scrolled
3. **Improved readability:** Header stands out against content below
4. **Professional feel:** Common pattern in modern web design

**Performance Note:**
- **Scroll events fire frequently:** 100+ times per second while scrolling
- **Lightweight operation:** Only checks number and toggles class
- **No reflow/repaint from JS:** CSS transition handles animation
- **Browser optimized:** Modern browsers handle scroll events efficiently

**Why this approach?**
- **Progressive enhancement:** Header works without JavaScript
- **Simple threshold:** Easy to understand and modify
- **CSS animations:** Smooth transition handled by browser
- **Common pattern:** Users expect this behavior on modern sites

---

## Bootstrap Effects & Components

### 📦 What is Bootstrap?
Bootstrap 5.3.2 is a CSS framework that provides pre-built components and utility classes. This project uses Bootstrap for:
- **Responsive grid system**
- **Spacing utilities** 
- **JavaScript components** (though most are custom-built)

**CDN Links Used:**
```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JavaScript Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

---

### 1. 📐 Container System
**Bootstrap Class:** `.container`
**Location:** Used throughout `index.html`

**HTML Example:**
```html
<div class="container header-inner px-3 px-sm-4">
  <!-- Content -->
</div>
```

**🧠 How It Works:**
```css
/* Bootstrap provides: */
.container {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

/* Responsive breakpoints: */
@media (min-width: 576px) { .container { max-width: 540px; } }
@media (min-width: 768px) { .container { max-width: 720px; } }
@media (min-width: 992px) { .container { max-width: 960px; } }
@media (min-width: 1200px) { .container { max-width: 1140px; } }
@media (min-width: 1400px) { .container { max-width: 1320px; } }
```

**Logic:**
1. **Fluid width** up to max-width at each breakpoint
2. **Auto margins** center the container
3. **Responsive:** Width adapts to screen size
4. **Gutter padding:** Prevents content from touching edges

**Custom Override:**
```css
/* style.css overrides Bootstrap: */
.container { 
  max-width: 1200px;  /* Custom max width */
  width: 92%;         /* Custom fluid width */
}
```

---

### 2. 📏 Spacing Utilities
**Bootstrap Classes:** `px-3`, `px-sm-4`, `py-5`, etc.
**Location:** Throughout HTML

**HTML Example:**
```html
<div class="container px-3 px-sm-4">
  <!-- px-3 = padding-left and padding-right: 1rem (16px) -->
  <!-- px-sm-4 = on screens ≥576px, padding becomes 1.5rem (24px) -->
</div>
```

**🧠 Bootstrap Spacing System:**
```
Format: {property}{sides}-{size}
        {property}{sides}-{breakpoint}-{size}

Properties:
  m = margin
  p = padding

Sides:
  t = top
  b = bottom
  l = left
  r = right
  x = left + right
  y = top + bottom
  (blank) = all sides

Sizes:
  0 = 0
  1 = 0.25rem (4px)
  2 = 0.5rem (8px)
  3 = 1rem (16px)
  4 = 1.5rem (24px)
  5 = 3rem (48px)

Breakpoints:
  sm = ≥576px
  md = ≥768px
  lg = ≥992px
  xl = ≥1200px
  xxl = ≥1400px
```

**Examples Used in Project:**
```html
<!-- Horizontal padding -->
<div class="px-3">  
  /* padding-left: 1rem; padding-right: 1rem; */
</div>

<!-- Responsive padding -->
<div class="px-3 px-sm-4">
  /* Mobile: 1rem padding */
  /* Tablet+: 1.5rem padding */
</div>
```

**Logic:**
- **Mobile-first:** Base class applies to all sizes
- **Responsive modifiers:** Larger screens get more padding
- **Utility-first:** No need to write custom CSS for spacing

---

### 3. 🎯 Responsive Breakpoints
**How Bootstrap Breakpoints Work:**

```css
/* Bootstrap's breakpoint system */
/* xs (extra small) - default, no prefix needed */
/* Applies to screens < 576px */

/* sm (small) - tablets */
@media (min-width: 576px) { ... }

/* md (medium) - small laptops */
@media (min-width: 768px) { ... }

/* lg (large) - desktops */
@media (min-width: 992px) { ... }

/* xl (extra large) - large desktops */
@media (min-width: 1200px) { ... }

/* xxl (extra extra large) - huge screens */
@media (min-width: 1400px) { ... }
```

**Usage in Project:**
```html
<!-- Padding increases on larger screens -->
<div class="px-3 px-sm-4">
  <!-- Mobile (xs): padding-x = 1rem -->
  <!-- Tablet+ (sm): padding-x = 1.5rem -->
</div>
```

**🧠 Mobile-First Logic:**
1. **Base class** (`px-3`) applies to ALL screen sizes
2. **Breakpoint class** (`px-sm-4`) OVERRIDES base at ≥576px
3. **Cascading:** Larger breakpoints inherit from smaller ones
4. **Why mobile-first?** Most users are on mobile, optimize for that first

---

### 4. 🔧 Bootstrap JavaScript Components
**What's Included:** Bootstrap Bundle includes:
- Modal
- Dropdown
- Collapse
- Tooltip
- Popover
- Carousel (not used - custom implementation instead)
- Offcanvas
- Scrollspy

**Used in This Project:** 
❌ **None of Bootstrap's JS components are actively used**
- Custom carousel implementation instead of Bootstrap's
- Custom mobile menu instead of Bootstrap's collapse
- Custom form validation instead of Bootstrap's

**Why Include Bootstrap JS Then?**
- **Future-proofing:** Available if needed later
- **Small overhead:** Minified bundle is relatively small
- **Standard practice:** Common to include full Bootstrap

---

### 5. 🎨 Bootstrap vs Custom CSS
**This project uses a HYBRID approach:**

| Feature | Bootstrap | Custom CSS |
|---------|-----------|------------|
| Container | ✅ (overridden) | ✅ |
| Spacing utilities | ✅ | ❌ |
| Grid system | ❌ (not used) | ✅ (custom flexbox) |
| Components | ❌ | ✅ (all custom) |
| Carousel | ❌ | ✅ (custom JS) |
| Forms | ❌ | ✅ (custom validation) |
| Buttons | ❌ | ✅ (custom styles) |

**Why This Approach?**
- **Bootstrap utilities:** Quick spacing without writing CSS
- **Custom components:** More control over design and behavior
- **Performance:** Only use what you need
- **Learning:** Custom JS teaches more than using Bootstrap's pre-built components

---

## CSS Hover Effects

### 🔘 Button Hover Effects
**Location:** Typically in `style.css`

**Common Button Classes:**
```css
.button-primary:hover {
  /* Scale up, change color, add shadow */
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.button-ghost:hover {
  /* Border/background transition */
  background-color: rgba(0,0,0,0.1);
}

.text-link:hover {
  /* Underline or color change */
  text-decoration: underline;
  color: #000;
}
```

---

### 🖼️ Card Hover Effects
**Location:** `style.css` - Card components

**Card Classes:**
```css
.card:hover {
  /* Lift effect with shadow */
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.card-media img:hover {
  /* Image zoom effect */
  transform: scale(1.1);
  transition: transform 0.3s ease;
}
```

**HTML:**
```html
<article class="card">
  <div class="card-media">
    <img src="pics/chromehearts.jpg">
  </div>
  <div class="card-body">
    <h3>Chrome Hearts Tees & Hoodies</h3>
  </div>
</article>
```

---

### 🔍 Lightbox Effect (CSS-Only)
**Location:** `index.html` (Lines 204-209)

**HTML Structure:**
```html
<!-- Trigger -->
<a href="#zoom1" class="tile-image-wrapper">
  <img src="pics/newarrival1.jpg">
</a>

<!-- Lightbox -->
<div id="zoom1" class="lightbox">
  <a class="close" href="#">Close</a>
  <img src="pics/newarrival1.jpg">
</div>
```

**CSS (Typical Implementation):**
```css
.lightbox {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
}

.lightbox:target {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox img {
  max-width: 90%;
  max-height: 90%;
}
```

**How it works:**
- Uses `:target` pseudo-class
- Clicking image link changes URL to `#zoom1`
- Lightbox with `id="zoom1"` becomes visible
- No JavaScript required!

---

### 🎯 Navigation Hover Effects

**Primary Nav:**
```css
.primary-nav a:hover {
  color: #000;
  border-bottom: 2px solid #000;
}

.primary-nav a.active {
  font-weight: 600;
  border-bottom: 2px solid #000;
}
```

**HTML:**
```html
<nav class="primary-nav">
  <ul>
    <li><a href="index.html" class="active">Home</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>
```

---

## Animation Effects

### 🎬 Carousel Slide Transitions
**CSS Animation:**
```css
.carousel-slide {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}
```

---

### ⚡ Scroll-to-Top Button Animation
**CSS:**
```css
.scroll-top-btn {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.scroll-top-btn.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

---

### 🎨 Theme Toggle Animation
**CSS:**
```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
```

---

## Quick Reference Table

| Feature | HTML Element | JavaScript Function | CSS Class |
|---------|-------------|-------------------|-----------|
| Mobile Menu | `#menu-btn`, `#nav-links` | `menuBtn.addEventListener('click')` | `.active` |
| Carousel | `.carousel-slide` | `showSlide(index)` | `.active` |
| Dark Mode | `#theme-toggle` | `themeToggle.addEventListener('click')` | `.dark-mode` |
| Scroll Top | `#scroll-top` | `window.addEventListener('scroll')` | `.visible` |
| Tabs | `.tab-btn`, `.tab-content` | `button.addEventListener('click')` | `.active` |
| Form Validation | `#contact-form` | `contactForm.addEventListener('submit')` | `.error` |
| Smooth Scroll | `a[href^="#"]` | `anchor.addEventListener('click')` | N/A |
| Lazy Load | `img[data-src]` | `IntersectionObserver` | N/A |
| Header Shadow | `.site-header` | `window.addEventListener('scroll')` | `.scrolled` |
| Lightbox | `.lightbox` | CSS-only (`:target`) | `:target` |

---

## Event Listeners Summary

```javascript
// Click Events
menuBtn.addEventListener('click')           // Mobile menu toggle
carouselPrevBtn.addEventListener('click')   // Previous slide
carouselNextBtn.addEventListener('click')   // Next slide
indicator.addEventListener('click')         // Jump to slide
themeToggle.addEventListener('click')       // Theme switch
scrollTopBtn.addEventListener('click')      // Scroll to top
tabButtons.addEventListener('click')        // Switch tabs
anchor.addEventListener('click')            // Smooth scroll

// Scroll Events
window.addEventListener('scroll')           // Scroll-to-top visibility
window.addEventListener('scroll')           // Header shadow effect

// Mouse Events
carouselContainer.addEventListener('mouseenter')  // Pause carousel
carouselContainer.addEventListener('mouseleave')  // Resume carousel

// Keyboard Events
document.addEventListener('keydown')        // Carousel arrow keys

// Form Events
contactForm.addEventListener('submit')      // Form validation
input.addEventListener('input')             // Clear errors

// Document Events
document.addEventListener('click')          // Close menu on outside click
```

---

## Tips & Best Practices

### ✅ Accessibility
- All interactive elements have `aria-label` attributes
- Keyboard navigation supported (arrow keys for carousel)
- ARIA attributes updated dynamically (`aria-expanded`)
- Semantic HTML structure

### ⚡ Performance
- Lazy loading images with Intersection Observer
- Debounced scroll events
- CSS transitions instead of JavaScript animations
- LocalStorage for theme persistence

### 🎨 User Experience
- Smooth scrolling for better navigation
- Visual feedback on all interactions
- Loading states for async operations
- Auto-play carousel pauses on hover
- Mobile-responsive design

---

## File Structure

```
Valois_Olano_Midterm/
├── index.html              # Main HTML with all sections
├── style.css               # All CSS styles and hover effects
├── js/
│   └── main.js            # All JavaScript functions (459 lines)
├── pics/                   # Product images
├── carouselPics/          # Carousel images
└── CHEATSHEET.md          # This file!
```

---

## 📊 Summary: Logic Patterns Used

### **1. State Management Patterns**
- **Toggle Pattern:** Mobile menu, dark mode (add/remove class)
- **Single Active Pattern:** Carousel, tabs (clear all, set one)
- **Threshold Pattern:** Scroll-to-top, header shadow (check position)
- **Persistence Pattern:** Dark mode (localStorage)

### **2. Event Handling Patterns**
- **Direct Binding:** Most buttons (`addEventListener` on specific element)
- **Event Delegation:** Could be used for tabs (not implemented)
- **Outside Click Detection:** Mobile menu closes when clicking outside
- **Keyboard Events:** Carousel arrow key navigation

### **3. Validation Patterns**
- **Regex Matching:** Email validation
- **Required Fields:** Check for empty values
- **Length Validation:** Minimum character count
- **Real-time Feedback:** Clear errors as user types

### **4. Performance Patterns**
- **Lazy Loading:** IntersectionObserver for images
- **Feature Detection:** Check browser support before using APIs
- **Debouncing:** (Could be added to scroll events)
- **CSS Animations:** Offload to GPU instead of JavaScript

### **5. Modular Math**
- **Carousel Navigation:** `(current + 1) % total` for infinite loop
- **Prevents Out-of-Bounds:** Always stays within valid range

### **6. Bootstrap Utility Patterns**
- **Mobile-First:** Base classes apply to all, breakpoints override
- **Spacing System:** Consistent rem-based spacing scale
- **Responsive Breakpoints:** sm, md, lg, xl, xxl
- **Container System:** Centered, max-width responsive layout

---

## 🎯 Key Takeaways

### **JavaScript Logic Principles:**
1. **Separation of Concerns:** JS manages state, CSS handles appearance
2. **Defensive Programming:** Check if elements exist before accessing
3. **Progressive Enhancement:** Features work without JS when possible
4. **Single Source of Truth:** One variable/class controls each feature
5. **Modulo Arithmetic:** Elegant solution for circular navigation
6. **Event Delegation:** Efficient for multiple similar elements
7. **Feature Detection:** Check browser support before using modern APIs

### **Bootstrap Integration:**
1. **Hybrid Approach:** Use utilities, build custom components
2. **Override When Needed:** Custom CSS takes precedence
3. **Mobile-First:** Start with mobile, enhance for larger screens
4. **Utility Classes:** Faster than writing custom CSS for spacing
5. **Semantic HTML:** Bootstrap works best with proper HTML structure

### **Performance Considerations:**
1. **Lazy Loading:** Only load images when needed
2. **CSS Transitions:** Smoother than JavaScript animations
3. **Lightweight Operations:** Scroll handlers should be fast
4. **Browser APIs:** Use native features when available
5. **Minimal Dependencies:** Vanilla JS is fast and lightweight

---

**Created for:** Gnailed — Luxury Pre-Loved Fashion Website  
**Last Updated:** October 28, 2025  
**JavaScript Framework:** Vanilla JS (No dependencies!)  
**CSS Framework:** Bootstrap 5.3.2 + Custom CSS  
**Total JavaScript Functions:** 10 major features  
**Total Lines of JS:** 459 lines  
**Bootstrap Classes Used:** Container, Spacing Utilities (px-*, py-*)  
**Custom Components:** All interactive features built from scratch
