/**
 * FIXORA — CORE FRONTEND RUNTIME
 * Monochrome Architecture, SVG Theme Toggle Icons, Fixed Scroll-to-Top & Motion
 */

(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const page = document.body.dataset.page || '';
  const isAuth = document.body.classList.contains('auth-page');
  const isDashboard = document.body.classList.contains('dashboard-page');
  const savedTheme = localStorage.getItem('fixora-theme') || 'light';
  const savedDir = localStorage.getItem('fixora-dir') || 'ltr';
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const localToday = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
  };

  root.dataset.theme = savedTheme;
  root.dir = savedDir;

  /* BOLD FIXORA EMBLEM: 3.5px Dial Ring + Solid Geometric F Monogram + Accent Dot */
  const brandMarkSvg = `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true" style="width:34px;height:34px;flex-shrink:0;">
    <circle cx="20" cy="20" r="17.5" stroke="currentColor" stroke-width="3.5"/>
    <path d="M 13.5 11 H 26.5 V 16 H 18.5 V 19 H 24.5 V 24 H 18.5 V 29 H 13.5 V 11 Z" fill="currentColor"/>
    <circle cx="28.5" cy="28.5" r="2.5" fill="var(--accent)"/>
  </svg>`;

  const brandLogoHtml = `<a class="site-brand" href="index.html" aria-label="Fixora Home">${brandMarkSvg}<span>Fixora</span></a>`;

  /* Crisp Standard SVG Icons for Theme Toggle (fa-moon / fa-sun style) */
  const moonIconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`;

  const sunIconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
  </svg>`;

  const navItems = [
    ['about', 'About', 'about.html'],
    ['services', 'Services', 'services.html'],
    ['how-it-works', 'How It Works', 'how-it-works.html'],
    ['pricing', 'Pricing', 'pricing.html'],
    ['testimonials', 'Testimonials', 'testimonials.html'],
    ['contact', 'Contact', 'contact.html']
  ];

  const isCurrent = (key) => page === key ? ' aria-current="page" class="nav-link active"' : ' class="nav-link"';

  /* ==========================================================================
     1. PUBLIC HEADER & GENUINE STICKY NAVIGATION
     ========================================================================== */
  function buildPublicHeader() {
    const headerMount = document.querySelector('[data-site-header]');
    if (!headerMount || isAuth || isDashboard) return;

    const currentTheme = root.dataset.theme || 'light';
    const isDark = currentTheme === 'dark';

    headerMount.innerHTML = `
      <header class="site-header">
        <div class="container header-container">
          ${brandLogoHtml}

          <nav class="nav-desktop" aria-label="Primary Navigation">
            <ul class="nav-links">
              <li class="nav-dropdown">
                <button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-haspopup="true" id="homeDropdownTrigger">
                  <span>Home</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <div class="nav-dropdown-menu" aria-labelledby="homeDropdownTrigger">
                  <a href="index.html" class="nav-dropdown-item${page === 'home' ? ' active' : ''}">Home Page 1</a>
                  <a href="home-2.html" class="nav-dropdown-item${page === 'home-2' ? ' active' : ''}">Home Page 2</a>
                </div>
              </li>
              ${navItems.map(([key, label, href]) => `<li><a href="${href}"${isCurrent(key)}>${label}</a></li>`).join('')}
            </ul>
          </nav>

          <div class="header-actions">
            <button class="nav-toggle-btn hide-on-tablet" type="button" data-theme-toggle aria-label="${isDark ? 'Switch to light mode' : 'Switch to dark mode'}">
              ${isDark ? sunIconSvg : moonIconSvg}
            </button>
            <button class="nav-toggle-btn hide-on-tablet" type="button" data-dir-toggle aria-label="Toggle text direction">
              ${(root.dir || 'ltr').toUpperCase()}
            </button>
            <a class="btn btn-secondary btn-sm hide-on-tablet" href="login.html">Login</a>
            <a class="btn btn-primary btn-sm hide-on-tablet" href="repair-request.html">Request Repair</a>
            <button class="hamburger-btn" type="button" data-drawer-toggle aria-label="Open mobile navigation menu" aria-expanded="false">
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Drawer Backdrop Overlay -->
      <div class="drawer-backdrop" data-drawer-close aria-hidden="true"></div>

      <!-- Offcanvas Mobile & Tablet Navigation Drawer -->
      <aside class="mobile-drawer" id="mobileDrawer" aria-label="Mobile Navigation" aria-hidden="true">
        <div class="drawer-header">
          ${brandLogoHtml}
          <button class="drawer-close-btn" type="button" aria-label="Close navigation menu" data-drawer-close>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="mobile-drawer-links">
          <span class="drawer-section-label">Navigation</span>
          <a href="index.html" class="mobile-drawer-link${page === 'home' ? ' active' : ''}">Home Page 1</a>
          <a href="home-2.html" class="mobile-drawer-link${page === 'home-2' ? ' active' : ''}">Home Page 2</a>
          ${navItems.map(([key, label, href]) => `<a href="${href}" class="mobile-drawer-link${page === key ? ' active' : ''}">${label}</a>`).join('')}
          
          <span class="drawer-section-label" style="margin-top:18px;">Customer Portal</span>
          <div class="drawer-actions-stack">
            <a href="repair-request.html" class="btn btn-primary" style="width:100%;justify-content:center;min-height:46px;">Request Repair</a>
            <a href="dashboard.html" class="btn btn-secondary" style="width:100%;justify-content:center;min-height:46px;">Customer Dashboard</a>
            <a href="login.html" class="btn btn-outline" style="width:100%;justify-content:center;min-height:44px;">Login to Account</a>
          </div>
        </div>

        <div class="drawer-controls">
          <div class="drawer-control-row">
            <span class="drawer-control-label">Display Theme</span>
            <div class="drawer-segmented">
              <button type="button" data-theme-set="light" class="${currentTheme === 'light' ? 'active' : ''}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" style="margin-inline-end:6px;vertical-align:-2px;"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>Light
              </button>
              <button type="button" data-theme-set="dark" class="${currentTheme === 'dark' ? 'active' : ''}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="margin-inline-end:6px;vertical-align:-2px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>Dark
              </button>
            </div>
          </div>
          <div class="drawer-control-row">
            <span class="drawer-control-label">Reading Direction</span>
            <div class="drawer-segmented">
              <button type="button" data-dir-set="ltr" class="${root.dir === 'ltr' ? 'active' : ''}">LTR</button>
              <button type="button" data-dir-set="rtl" class="${root.dir === 'rtl' ? 'active' : ''}">RTL</button>
            </div>
          </div>
        </div>
      </aside>`;
  }

  /* ==========================================================================
     2. STICKY SCROLL HANDLER & DROPDOWN INTERACTIONS
     ========================================================================== */
  function initNavInteractions() {
    const handleScroll = () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      const scrollTopBtn = document.querySelector('.scroll-top-btn');
      if (scrollTopBtn) {
        if (window.scrollY > 450) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Home Dropdown
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
      const trigger = dropdown.querySelector('.nav-dropdown-trigger');
      
      const toggleDropdown = (open) => {
        const isOpen = open !== undefined ? open : !dropdown.classList.contains('open');
        dropdown.classList.toggle('open', isOpen);
        trigger.setAttribute('aria-expanded', String(isOpen));
      };

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) toggleDropdown(false);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('open')) {
          toggleDropdown(false);
          trigger.focus();
        }
      });
    }

    // Mobile & Tablet Drawer
    const drawer = document.getElementById('mobileDrawer');
    const drawerBtn = document.querySelector('[data-drawer-toggle]');
    const backdrop = document.querySelector('.drawer-backdrop');

    if (drawer && drawerBtn) {
      let lastFocusedElement = null;

      const trapFocus = (event) => {
        const focusable = [...drawer.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      };

      const toggleDrawer = (open) => {
        const isOpen = open !== undefined ? open : !drawer.classList.contains('open');
        if (isOpen) lastFocusedElement = document.activeElement;
        drawer.classList.toggle('open', isOpen);
        if (backdrop) backdrop.classList.toggle('open', isOpen);
        document.body.classList.toggle('drawer-open', isOpen);
        drawerBtn.setAttribute('aria-expanded', String(isOpen));
        drawer.setAttribute('aria-hidden', String(!isOpen));
        if (backdrop) backdrop.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
        if (isOpen) drawer.querySelector('a[href], button:not([disabled])')?.focus();
        else if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
      };

      drawerBtn.addEventListener('click', () => toggleDrawer());

      document.querySelectorAll('[data-drawer-close]').forEach(btn => {
        btn.addEventListener('click', () => toggleDrawer(false));
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
          toggleDrawer(false);
          drawerBtn.focus();
        } else if (e.key === 'Tab' && drawer.classList.contains('open')) {
          trapFocus(e);
        }
      });

      drawer.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          if (drawer.classList.contains('open')) toggleDrawer(false);
        });
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && drawer.classList.contains('open')) {
          toggleDrawer(false);
        }
      });
    }
  }

  /* ==========================================================================
     3. PUBLIC FOOTER INJECTION
     ========================================================================== */
  function buildPublicFooter() {
    const footerMount = document.querySelector('[data-site-footer]');
    if (!footerMount || isAuth || isDashboard) return;

    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              ${brandLogoHtml}
              <p>Professional in-home diagnostic and repair service for essential household appliances.</p>
            </div>

            <div class="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="index.html">Home Page 1</a></li>
                <li><a href="home-2.html">Home Page 2</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="how-it-works.html">How It Works</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Customer Portal</h4>
              <ul>
                <li><a href="repair-request.html">Request Repair</a></li>
                <li><a href="dashboard.html">Customer Dashboard</a></li>
                <li><a href="dashboard-history.html">Repair History</a></li>
                <li><a href="dashboard-invoices.html">Invoices</a></li>
                <li><a href="login.html">Login</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Support</h4>
              <ul>
                <li><a href="tel:18005550147">(800) 555-0147</a></li>
                <li><a href="mailto:care@fixora.example">care@fixora.example</a></li>
                <li><span>Mon–Sat: 7am–8pm</span></li>
                <li><a href="contact.html">Service Area</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="privacy.html">Privacy Policy</a></li>
                <li><a href="terms.html">Terms of Service</a></li>
                <li><a href="pricing.html">Estimate Policy</a></li>
                <li><a href="how-it-works.html">90-Day Warranty</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© ${new Date().getFullYear()} Fixora Appliance Repair. All rights reserved.</p>
            <div class="footer-legal-links">
              <a href="privacy.html">Privacy Policy</a>
              <a href="terms.html">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>`;
  }

  /* ==========================================================================
     4. FIXED PHYSICAL SCROLL-TO-TOP BUTTON INJECTION
     ========================================================================== */
  function buildScrollToTop() {
    if (isAuth || isDashboard || document.getElementById('scrollTopBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Scroll to top of page');
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
    document.body.appendChild(btn);

    const onScroll = () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    };

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ==========================================================================
     5. THEME & DIRECTION SWITCHING
     ========================================================================== */
  function updateThemeUI(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('fixora-theme', theme);
    
    // In Light mode: shows Moon icon (action: switch to dark); in Dark mode: shows Sun icon (action: switch to light)
    document.querySelectorAll('[data-theme-toggle]').forEach(b => {
      b.innerHTML = theme === 'dark' ? sunIconSvg : moonIconSvg;
      b.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
    
    document.querySelectorAll('[data-theme-set]').forEach(b => {
      b.classList.toggle('active', b.dataset.themeSet === theme);
    });
  }

  function updateDirUI(dir) {
    root.dir = dir;
    localStorage.setItem('fixora-dir', dir);
    document.querySelectorAll('[data-dir-toggle]').forEach(b => {
      b.textContent = dir.toUpperCase();
    });
    document.querySelectorAll('[data-dir-set]').forEach(b => {
      b.classList.toggle('active', b.dataset.dirSet === dir);
    });
    window.dispatchEvent(new Event('resize'));
  }

  function initThemeAndDirection() {
    const currentTheme = root.dataset.theme || 'light';
    updateThemeUI(currentTheme);
    updateDirUI(root.dir || 'ltr');

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme-toggle]')) {
        const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        updateThemeUI(nextTheme);
      }

      const themeSetBtn = e.target.closest('[data-theme-set]');
      if (themeSetBtn) {
        updateThemeUI(themeSetBtn.dataset.themeSet);
      }

      if (e.target.closest('[data-dir-toggle]')) {
        const nextDir = root.dir === 'rtl' ? 'ltr' : 'rtl';
        updateDirUI(nextDir);
      }

      const dirSetBtn = e.target.closest('[data-dir-set]');
      if (dirSetBtn) {
        updateDirUI(dirSetBtn.dataset.dirSet);
      }
    });
  }

  /* ==========================================================================
     6. ACCORDION (FAQ)
     ========================================================================== */
  function initAccordions() {
    let panelIndex = 0;
    document.querySelectorAll('.accordion').forEach(acc => {
      acc.querySelectorAll('.accordion-btn').forEach(btn => {
        const item = btn.closest('.accordion-item');
        const content = item?.querySelector('.accordion-content');
        if (!item || !content) return;

        const panelId = content.id || `accordion-panel-${++panelIndex}`;
        content.id = panelId;
        btn.setAttribute('aria-controls', panelId);
        content.setAttribute('role', 'region');
        const setState = (open) => {
          item.classList.toggle('active', open);
          btn.setAttribute('aria-expanded', String(open));
          content.setAttribute('aria-hidden', String(!open));
          content.style.maxHeight = open ? `${content.scrollHeight}px` : '';
        };

        setState(item.classList.contains('active'));

        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          acc.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) {
              const otherButton = other.querySelector('.accordion-btn');
              const otherContent = other.querySelector('.accordion-content');
              other.classList.remove('active');
              otherButton?.setAttribute('aria-expanded', 'false');
              otherContent?.setAttribute('aria-hidden', 'true');
              if (otherContent) otherContent.style.maxHeight = '';
            }
          });

          setState(!isOpen);
        });
      });
    });

    window.addEventListener('resize', () => {
      document.querySelectorAll('.accordion-item.active .accordion-content').forEach(content => {
        content.style.maxHeight = `${content.scrollHeight}px`;
      });
    });
  }

  /* ==========================================================================
     7. RESPONSIVE MULTI-CAROUSEL (Desktop Grid / Tablet 2-Card / Mobile 1-Card Slider)
     ========================================================================== */
  function initSliders() {
    document.querySelectorAll('[data-slider]').forEach(slider => {
      const track = slider.querySelector('.testimonial-track, .services-slider-track, .guides-slider-track, .process-slider-track, .slider-track');
      const prev = slider.querySelector('[data-slide-prev]');
      const next = slider.querySelector('[data-slide-next]');
      if (!track || !prev || !next) return;

      let index = 0;
      let startX = 0;
      let isSwiping = false;
      let autoTimer = null;

      const getCardWidth = () => {
        const first = track.querySelector('.testimonial-card, .service-card, .guide-card, .process-step-card, .slider-card');
        if (!first) return 300;
        const gap = parseFloat(window.getComputedStyle(track).gap) || (window.innerWidth >= 640 ? 20 : 16);
        return first.getBoundingClientRect().width + gap;
      };

      const updateSlider = () => {
        if (window.innerWidth > 1024) {
          track.style.transform = 'none';
          return;
        }

        const cards = track.querySelectorAll('.testimonial-card, .service-card, .guide-card, .process-step-card, .slider-card');
        const total = cards.length;
        const visibleCount = window.innerWidth >= 640 ? 2 : 1;
        const maxIndex = Math.max(0, total - visibleCount);
        index = Math.min(Math.max(0, index), maxIndex);
        
        const isRtl = root.dir === 'rtl';
        const shift = index * getCardWidth();
        track.style.transform = `translateX(${isRtl ? shift : -shift}px)`;
      };

      const slideNext = () => {
        const total = track.querySelectorAll('.testimonial-card, .service-card, .guide-card, .process-step-card, .slider-card').length;
        const visibleCount = window.innerWidth >= 640 ? 2 : 1;
        const maxIndex = Math.max(0, total - visibleCount);
        if (index >= maxIndex) {
          index = 0;
        } else {
          index += 1;
        }
        updateSlider();
      };

      const slidePrev = () => {
        const total = track.querySelectorAll('.testimonial-card, .service-card, .guide-card, .process-step-card, .slider-card').length;
        const visibleCount = window.innerWidth >= 640 ? 2 : 1;
        const maxIndex = Math.max(0, total - visibleCount);
        if (index <= 0) {
          index = maxIndex;
        } else {
          index -= 1;
        }
        updateSlider();
      };

      prev.addEventListener('click', () => {
        slidePrev();
      });

      next.addEventListener('click', () => {
        slideNext();
      });

      // Auto-slide on tablet & mobile (4.5s)
      const startAutoSlide = () => {
        stopAutoSlide();
        if (window.innerWidth <= 1024 && !prefersReducedMotion()) {
          autoTimer = setInterval(slideNext, 4500);
        }
      };

      const stopAutoSlide = () => {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      };

      slider.addEventListener('mouseenter', stopAutoSlide);
      slider.addEventListener('mouseleave', startAutoSlide);
      slider.addEventListener('focusin', stopAutoSlide);
      slider.addEventListener('focusout', startAutoSlide);
      slider.addEventListener('pointerenter', stopAutoSlide);
      slider.addEventListener('pointerleave', startAutoSlide);

      // Touch / Swipe support for mobile & tablet
      track.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 1024) return;
        stopAutoSlide();
        startX = e.touches[0].clientX;
        isSwiping = true;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        if (!isSwiping || window.innerWidth > 1024) return;
        const diffX = e.changedTouches[0].clientX - startX;
        const isRtl = root.dir === 'rtl';
        const threshold = 40;

        if (diffX < -threshold) {
          if (isRtl) slidePrev(); else slideNext();
        } else if (diffX > threshold) {
          if (isRtl) slideNext(); else slidePrev();
        }
        isSwiping = false;
        startAutoSlide();
      }, { passive: true });

      window.addEventListener('resize', () => {
        updateSlider();
        startAutoSlide();
      });

      updateSlider();
      startAutoSlide();
    });
  }

  /* ==========================================================================
     8. MULTI-STEP REPAIR REQUEST WIZARD
     ========================================================================== */
  function initRepairWizard() {
    const form = document.querySelector('[data-request-form]');
    if (!form) return;

    const steps = [...form.querySelectorAll('.request-step')];
    const tabs = [...document.querySelectorAll('.wizard-step-tab')];
    let currentStep = 0;

    form.querySelectorAll('input[type="date"]').forEach(input => {
      if (!input.min) input.min = localToday();
    });

    const validateFields = (scope) => {
      let firstInvalid = null;
      scope.querySelectorAll('[required]').forEach(field => {
        let valid;
        if (field.type === 'radio') {
          valid = Boolean(scope.querySelector(`input[type="radio"][name="${CSS.escape(field.name)}"]:checked`));
        } else {
          valid = field.checkValidity() && String(field.value).trim() !== '';
        }
        field.setAttribute('aria-invalid', String(!valid));
        if (!valid && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.reportValidity();
        firstInvalid.focus();
        return false;
      }
      return true;
    };

    const showStep = (n) => {
      steps.forEach((s, idx) => s.style.display = idx === n ? 'block' : 'none');
      tabs.forEach((t, idx) => {
        t.classList.toggle('active', idx === n);
        if (idx === n) t.setAttribute('aria-current', 'step');
        else t.removeAttribute('aria-current');
      });
      currentStep = n;
      window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 100, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    };

    tabs[0]?.setAttribute('aria-current', 'step');
    steps.at(-1)?.setAttribute('role', 'status');
    steps.at(-1)?.setAttribute('aria-live', 'polite');

    form.addEventListener('click', (e) => {
      const choice = e.target.closest('.choice-card');
      if (choice && choice.parentElement.classList.contains('choice-grid')) {
        choice.parentElement.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
        const radio = choice.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      }

      if (e.target.closest('[data-next]')) {
        e.preventDefault();
        if (currentStep < steps.length - 1 && validateFields(steps[currentStep])) showStep(currentStep + 1);
      }

      if (e.target.closest('[data-back]')) {
        e.preventDefault();
        if (currentStep > 0) showStep(currentStep - 1);
      }
    });

    form.addEventListener('submit', (e) => e.preventDefault());
    form.addEventListener('input', (e) => e.target.removeAttribute('aria-invalid'));
    form.addEventListener('change', (e) => e.target.removeAttribute('aria-invalid'));
  }

  /* ==========================================================================
     9. VALIDATED DEMO FORM COMPLETION STATES
     ========================================================================== */
  function initValidatedForms() {
    document.querySelectorAll('form[data-validate][novalidate]:not([data-request-form])').forEach(form => {
      const clearFieldError = (field) => {
        field.removeAttribute('aria-invalid');
        const error = field.closest('.field, .form-group')?.querySelector('.field-error');
        if (error) error.textContent = '';
      };

      form.addEventListener('input', (event) => clearFieldError(event.target));
      form.addEventListener('change', (event) => clearFieldError(event.target));

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let firstInvalid = null;

        form.querySelectorAll('[required]').forEach(field => {
          const valid = field.type === 'radio'
            ? Boolean(form.querySelector(`input[type="radio"][name="${CSS.escape(field.name)}"]:checked`))
            : field.checkValidity() && String(field.value).trim() !== '';
          field.setAttribute('aria-invalid', String(!valid));
          const error = field.closest('.field, .form-group')?.querySelector('.field-error');
          if (error) error.textContent = valid ? '' : (field.validationMessage || 'Please complete this field.');
          if (!valid && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          firstInvalid.reportValidity();
          firstInvalid.focus();
          return;
        }

        const success = form.nextElementSibling;
        form.hidden = true;
        if (success?.classList.contains('confirmation')) success.hidden = false;
        if (success?.classList.contains('form-success')) success.style.display = 'block';
      });
    });
  }

  /* ==========================================================================
     10. SINGLE GLOBAL INTERSECTION OBSERVER
     ========================================================================== */
  function initMotionReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     11. PASSWORD VISIBILITY TOGGLE
     ========================================================================== */
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.form-group')?.querySelector('input');
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.textContent = isPassword ? 'Hide' : 'Show';
      });
    });
  }

  // Lifecycle Initialization
  document.addEventListener('DOMContentLoaded', () => {
    buildPublicHeader();
    buildPublicFooter();
    buildScrollToTop();
    initNavInteractions();
    initThemeAndDirection();
    initAccordions();
    initSliders();
    initRepairWizard();
    initValidatedForms();
    initMotionReveals();
    initPasswordToggles();
  });
})();
