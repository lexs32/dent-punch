/**
 * DENT PUNCH — Main Interactive Script
 * Autovera Framer Architecture & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initServicesAccordion();
  initBeforeAfterSlider();
  initReviewsCarousel();
  initBookingForm();
});

/* ==========================================================================
   1. NAVBAR SCROLL & AUTOVERA MENU TOGGLE
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('navbar');
  const toggleBtn = document.getElementById('menuToggle');
  const dropdown = document.getElementById('navDropdown');
  if (!toggleBtn || !dropdown) return;

  // Toggle Autovera dropdown menu and morph 3 lines
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = toggleBtn.classList.toggle('menu-open');
    dropdown.classList.toggle('active', isOpen);
    if (header) header.classList.toggle('menu-open', isOpen);
  });

  // Close dropdown on item click
  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('menu-open');
      dropdown.classList.remove('active');
      if (header) header.classList.remove('menu-open');
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleBtn.classList.remove('menu-open');
      dropdown.classList.remove('active');
      if (header) header.classList.remove('menu-open');
    }
  });
}

function initMobileMenu() {
  // Unified under initNavbar for Autovera
}

/* ==========================================================================
   3. SERVICES ACCORDION (Autovera 001 - 005)
   ========================================================================== */
function initServicesAccordion() {
  const items = document.querySelectorAll('.service-item');
  if (!items.length) return;

  items.forEach(item => {
    const header = item.querySelector('.service-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isExpanded = item.classList.contains('expanded');

      // Close all items
      items.forEach(other => {
        other.classList.remove('expanded');
        const sym = other.querySelector('.toggle-symbol');
        if (sym) sym.textContent = '+';
      });

      // If it wasn't expanded, open it
      if (!isExpanded) {
        item.classList.add('expanded');
        const sym = item.querySelector('.toggle-symbol');
        if (sym) sym.textContent = '−';
      }
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE BEFORE & AFTER SLIDER (Lexus F-Sport Fender)
   ========================================================================== */
function initBeforeAfterSlider() {
  const slider = document.getElementById('baSlider');
  const beforeImg = document.getElementById('baBeforeImg');
  const afterImg = document.getElementById('baAfterImg');
  if (!slider || !beforeImg || !afterImg) return;

  let isDragging = false;

  const updatePos = (clientX) => {
    const rect = slider.getBoundingClientRect();
    let x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    slider.style.setProperty('--ba-pos', `${percentage.toFixed(2)}%`);
  };

  // Mouse events
  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updatePos(e.clientX);
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updatePos(e.clientX);
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch events
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updatePos(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updatePos(e.touches[0].clientX);
  }, { passive: true });
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   5. REVIEWS CAROUSEL (Autovera Nav Buttons)
   ========================================================================== */
function initReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('prevReview');
  const nextBtn = document.getElementById('nextReview');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.review-framer-card');
  if (!cards.length) return;

  let currentIndex = 0;

  function getStep() {
    const card = cards[0];
    const style = window.getComputedStyle(card);
    const width = card.offsetWidth;
    const gap = 24;
    return width + gap;
  }

  function updateSlide() {
    const maxIndex = cards.length - 1;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const step = getStep();
    track.style.transform = `translateX(-${currentIndex * step}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop back
    }
    updateSlide();
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = cards.length - 1; // loop to end
    }
    updateSlide();
  });

  window.addEventListener('resize', updateSlide);
}

/* ==========================================================================
   6. QUICK BOOKING FORM
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('dentBookingForm');
  const successBanner = document.getElementById('formSuccessMsg');
  const submitBtn = document.getElementById('submitBtn');
  if (!form || !successBanner) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitBtn) {
      submitBtn.textContent = 'Processing...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      form.style.display = 'none';
      successBanner.style.display = 'flex';
      if (submitBtn) {
        submitBtn.textContent = 'Book Now';
        submitBtn.disabled = false;
      }
    }, 600);
  });
}
