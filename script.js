/**
 * AURA & CREST BUSINESS CONSULTING - CORE JAVASCRIPT
 * Vanilla ES6+ JavaScript - Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* 1. STICKY HEADER & SCROLL-TO-TOP BUTTON */
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* 2. MOBILE NAVIGATION DRAWER */
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMobileNav = () => {
    if (!mobileDrawer || !mobileToggle) return;
    mobileToggle.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    if (!mobileDrawer || !mobileToggle) return;
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) closeMobileNav(); else openMobileNav();
    });
  }

  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* 3. STATS COUNTER ANIMATION */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const easeOutQuad = (t) => t * (2 - t);
    const animateCounter = (element) => {
      const target = parseFloat(element.getAttribute('data-target'));
      const duration = parseInt(element.getAttribute('data-duration') || '2000', 10);
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentVal = target * easedProgress;

        element.textContent = Math.floor(currentVal).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString();
        }
      };
      requestAnimationFrame(updateCounter);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach((stat) => statsObserver.observe(stat));
  }

  /* 4. FAQ ACCORDION */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (btn && panel) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question-btn');
            const otherPanel = other.querySelector('.faq-answer-panel');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = '0px';
          }
        });

        if (isActive) {
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = '0px';
        } else {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  });

  /* 5. PORTFOLIO FILTER & LIGHTBOX */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.classList.add('hidden'); }, 300);
          }
        });
      });
    });
  }

  if (lightboxModal && galleryItems.length > 0) {
    const openLightbox = (item) => {
      const img = item.querySelector('img');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const cat = item.querySelector('.gallery-category-tag')?.textContent || '';
      const desc = item.getAttribute('data-description') || 'Comprehensive advisory and execution delivered by Aura & Crest.';

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = cat;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      lightboxModal.classList.add('open');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    };

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => openLightbox(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(item);
        }
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) closeLightbox();
    });
  }

  /* 6. CONTACT FORM VALIDATION */
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');

  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const serviceInput = document.getElementById('contactService');
    const messageInput = document.getElementById('contactMessage');
    const consentInput = document.getElementById('contactConsent');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    const setFieldError = (input, message) => {
      input.classList.add('is-invalid');
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (feedback) { feedback.textContent = message; feedback.classList.add('visible'); }
    };

    const clearFieldError = (input) => {
      input.classList.remove('is-invalid');
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (feedback) { feedback.textContent = ''; feedback.classList.remove('visible'); }
    };

    [nameInput, emailInput, phoneInput, serviceInput, messageInput].forEach((input) => {
      if (input) input.addEventListener('input', () => clearFieldError(input));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'Please enter your full name (minimum 2 characters).');
        isValid = false;
      } else clearFieldError(nameInput);

      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else clearFieldError(emailInput);

      if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.replace(/[\s\-\(\)]/g, ''))) {
        setFieldError(phoneInput, 'Please provide a valid contact number (10+ digits).');
        isValid = false;
      } else clearFieldError(phoneInput);

      if (!serviceInput.value) {
        setFieldError(serviceInput, 'Please choose a primary service requirement.');
        isValid = false;
      } else clearFieldError(serviceInput);

      if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
        setFieldError(messageInput, 'Please provide more project context (minimum 15 characters).');
        isValid = false;
      } else clearFieldError(messageInput);

      if (consentInput && !consentInput.checked) {
        setFieldError(consentInput, 'You must agree to the privacy policy to proceed.');
        isValid = false;
      } else if (consentInput) clearFieldError(consentInput);

      if (isValid) {
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Transmitting Inquiry...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          if (contactAlert) {
            contactAlert.className = 'form-alert success';
            contactAlert.innerHTML = `<strong>Inquiry Received!</strong> Thank you, ${nameInput.value.trim().split(' ')[0]}. An executive partner will review your requirements and respond within 24 business hours.`;
            contactAlert.style.display = 'block';
            contactAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          contactForm.reset();
        }, 1200);
      } else {
        if (contactAlert) {
          contactAlert.className = 'form-alert error';
          contactAlert.innerHTML = `<strong>Attention Required:</strong> Please correct the highlighted fields above before submitting.`;
          contactAlert.style.display = 'block';
        }
      }
    });
  }

  /* 7. NEWSLETTER FORM HANDLER */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('.newsletter-input');
      const feedback = form.querySelector('.newsletter-feedback');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        if (feedback) {
          feedback.textContent = 'Please enter a valid business email.';
          feedback.style.color = '#EF4444';
          feedback.classList.add('visible');
        }
        return;
      }

      if (feedback) {
        feedback.textContent = 'Thank you! You are subscribed to our quarterly briefing.';
        feedback.style.color = '#10B981';
        feedback.classList.add('visible');
      }
      emailInput.value = '';
      setTimeout(() => { if (feedback) feedback.classList.remove('visible'); }, 5000);
    });
  });

  /* 8. BLOG SEARCH & FILTER */
  const blogSearchInput = document.getElementById('blogSearchInput');
  const blogCards = document.querySelectorAll('.blog-card');
  if (blogSearchInput && blogCards.length > 0) {
    blogSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      blogCards.forEach((card) => {
        const title = card.querySelector('.blog-title')?.textContent.toLowerCase() || '';
        const excerpt = card.querySelector('.blog-excerpt')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.blog-category-badge')?.textContent.toLowerCase() || '';
        card.style.display = (title.includes(query) || excerpt.includes(query) || category.includes(query)) ? 'flex' : 'none';
      });
    });
  }

  /* 9. SCROLL REVEAL ANIMATIONS */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.15 });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }
});
