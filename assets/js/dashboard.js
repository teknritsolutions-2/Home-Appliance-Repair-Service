(() => {
  'use strict';

  const root = document.documentElement;
  const page = document.body.dataset.page || 'dashboard';
  const pageTitle = document.body.dataset.title || 'Dashboard';

  /* Unified Brand Mark */
  const brandMarkSvg = `<svg viewBox="0 0 40 40" fill="none" aria-hidden="true" style="width:34px;height:34px;flex-shrink:0;">
    <circle cx="20" cy="20" r="17.5" stroke="currentColor" stroke-width="3.5"/>
    <path d="M 13.5 11 H 26.5 V 16 H 18.5 V 19 H 24.5 V 24 H 18.5 V 29 H 13.5 V 11 Z" fill="currentColor"/>
    <circle cx="28.5" cy="28.5" r="2.5" fill="var(--accent)"/>
  </svg>`;

  const links = [
    ['dashboard', '⌂', 'Overview', 'dashboard.html'],
    ['dashboard-request', '＋', 'Request Repair', 'dashboard-request-repair.html'],
    ['dashboard-active', '◉', 'Active Repairs', 'dashboard-active-repairs.html'],
    ['dashboard-history', '↶', 'Repair History', 'dashboard-history.html'],
    ['dashboard-invoices', '▤', 'Invoices', 'dashboard-invoices.html'],
    ['dashboard-ratings', '★', 'Ratings', 'dashboard-ratings.html'],
    ['dashboard-profile', '⚙', 'Profile & Settings', 'dashboard-profile.html']
  ];

  const brand = `<a class="site-brand" href="index.html" aria-label="Fixora Home">${brandMarkSvg}<span>Fixora</span></a>`;

  const nav = () => `
    <ul class="dash-nav">
      ${links.map(([key, icon, label, href]) => `
        <li>
          <a href="${href}"${page === key ? ' aria-current="page"' : ''}>
            <span aria-hidden="true">${icon}</span>
            ${label}
          </a>
        </li>`).join('')}
    </ul>`;

  const controls = `
    <div class="control-group">
      <span>Color Theme</span>
      <div class="segmented" data-theme-segment>
        <button type="button" data-theme="light">Light</button>
        <button type="button" data-theme="dark">Dark</button>
      </div>
    </div>
    <div class="control-group">
      <span>Reading Direction</span>
      <div class="segmented" data-dir-segment>
        <button type="button" data-dir="ltr">LTR</button>
        <button type="button" data-dir="rtl">RTL</button>
      </div>
    </div>
    <div style="margin-top:14px;">
      <a class="btn btn-secondary" href="login.html" style="width:100%;font-size:0.85rem;justify-content:center;">Logout</a>
    </div>`;

  // 1. Mount Desktop Sidebar
  const sidebar = document.querySelector('[data-dash-sidebar]');
  if (sidebar) {
    sidebar.innerHTML = `
      ${brand}
      ${nav()}
      <div class="dash-sidebar-bottom">
        ${controls}
      </div>`;
  }

  // 2. Mount Topbar
  const topbar = document.querySelector('[data-dash-topbar]');
  if (topbar) {
    topbar.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;">
        <button class="dash-menu" type="button" aria-label="Open navigation menu" aria-controls="dashboardDrawer" aria-expanded="false" data-dash-menu-btn>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
        ${brand}
        <h1>${pageTitle}</h1>
      </div>
      <div class="user-controls">
        <span class="user-name">Alex Morgan</span>
        <div class="avatar" aria-label="User avatar">AM</div>
        <a class="btn btn-secondary btn-logout" href="login.html">Logout</a>
      </div>`;
  }

  // 3. Mount Mobile/Tablet Drawer & Overlay
  let overlay = document.querySelector('.dash-overlay');
  let drawer = document.querySelector('.dash-drawer');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'dash-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'dash-drawer';
    drawer.id = 'dashboardDrawer';
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
      <div class="drawer-top">
        ${brand}
        <button class="icon-btn" type="button" aria-label="Close navigation menu" data-dash-drawer-close>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      ${nav()}
      <div class="dash-sidebar-bottom" style="margin-top:auto;padding-top:20px;border-top:1px solid var(--dark-border);">
        ${controls}
      </div>`;
    document.body.appendChild(drawer);
  }

  // Drawer Open / Close
  const menuButton = document.querySelector('[data-dash-menu-btn]');
  let lastFocusedElement = null;

  const trapDrawerFocus = (event) => {
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

  const openDrawer = () => {
    lastFocusedElement = document.activeElement;
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    drawer.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    menuButton?.setAttribute('aria-expanded', 'true');
    drawer.querySelector('a[href], button:not([disabled])')?.focus();
  };

  const closeDrawer = () => {
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
    drawer.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-dash-menu-btn]')) {
      if (document.body.classList.contains('drawer-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    } else if (e.target.closest('[data-dash-drawer-close]') || e.target.classList.contains('dash-overlay')) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!document.body.classList.contains('drawer-open')) return;
    if (event.key === 'Escape') closeDrawer();
    else if (event.key === 'Tab') trapDrawerFocus(event);
  });

  // Clean resize handling (1440 -> 768 -> 390 -> 768 -> 1440)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeDrawer();
    }
  });

  // Theme & Direction Handlers
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('fixora-theme', theme);
    document.querySelectorAll('[data-theme-segment] button').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === theme);
    });
  };

  const applyDir = (dir) => {
    root.dir = dir;
    localStorage.setItem('fixora-dir', dir);
    document.querySelectorAll('[data-dir-segment] button').forEach(b => {
      b.classList.toggle('active', b.dataset.dir === dir);
    });
  };

  const currentTheme = localStorage.getItem('fixora-theme') || 'light';
  const currentDir = localStorage.getItem('fixora-dir') || 'ltr';

  applyTheme(currentTheme);
  applyDir(currentDir);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme]');
    if (t) applyTheme(t.dataset.theme);

    const d = e.target.closest('[data-dir]');
    if (d) applyDir(d.dataset.dir);
  });

  document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.min) {
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      input.min = date.toISOString().slice(0, 10);
    }
  });

  // Table filter functionality
  const filterSelect = document.querySelector('[data-filter-status]');
  if (filterSelect) {
    filterSelect.addEventListener('change', () => {
      const val = filterSelect.value.toLowerCase();
      document.querySelectorAll('tbody tr').forEach(row => {
        if (val === 'all') {
          row.style.display = '';
          return;
        }
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(val) ? '' : 'none';
      });
    });
  }
})();
