/**
 * NARESH KUMAR - PORTFOLIO INTERACTION ENGINE
 * Vanilla ES6+, High-performance, Accessible, Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initStickyHeader();
  initMobileNav();
  initActiveNavSpy();
  initContactForm();
  initResumeToast();
  initBackToTop();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Sticky Glassmorphic Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggleBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Active Navigation Indicator on Scroll
   -------------------------------------------------------------------------- */
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-links .mobile-nav-link');

  function updateActiveLink() {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    // Desktop
    desktopLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });

    // Mobile
    mobileLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* --------------------------------------------------------------------------
   5. Contact Form Validation & Friendly Mock Submission
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmitBtn');

  if (!form || !statusEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      showStatus('Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please provide a valid email address.', 'error');
      return;
    }

    // Construct WhatsApp message text
    const formattedText = `*New Portfolio Contact Message*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Subject:* ${subject}\n\n` +
      `*Message:*\n${message}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=919940171486&text=${encodeURIComponent(formattedText)}`;

    // UI Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg> Opening WhatsApp...`;
    }

    setTimeout(() => {
      showStatus('Redirecting to WhatsApp with your prefilled message...', 'success');
      
      // Open WhatsApp chat in a new tab/window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>Send Message to WhatsApp</span>`;
      }
    }, 600);
  });

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = `form-status ${type}`;
    statusEl.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        statusEl.style.display = 'none';
      }, 7000);
    }
  }
}

/* --------------------------------------------------------------------------
   7. Toast Notification Utility & Resume Download Handler
   -------------------------------------------------------------------------- */
function showToast(message, duration = 3800) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

function initResumeToast() {
  const resumeButtons = document.querySelectorAll('.action-download-resume');
  resumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Check if the href points to an actual file or placeholder
      const href = btn.getAttribute('href');
      if (!href || href === '#' || href === '#resume') {
        e.preventDefault();
        showToast('Resume link placeholder. Add your PDF file to assets/resume/ to enable direct download!');
      } else {
        showToast('Initiating resume download for Naresh Kumar...');
      }
    });
  });

  // Copy email buttons
  const copyEmailButtons = document.querySelectorAll('.action-copy-email');
  copyEmailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'nareshchan4@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied to clipboard: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   9. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}
