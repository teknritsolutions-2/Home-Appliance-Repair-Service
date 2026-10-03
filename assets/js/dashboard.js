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

  // Invoice selection stays entirely client-side in this static demo.
  const invoiceData = {
    'INV-10426': {
      date: 'June 14, 2026',
      equipment: 'Whirlpool Washer (Model WFW5605MW) · Issue: Drain Failure',
      total: '$286.42',
      note: 'Installed replacement OEM drain pump assembly, cleared lint from drain hose, and verified two consecutive rinse/spin drain cycles. Backed by standard service and parts coverage.',
      lines: [
        ['Diagnostic In-Home Inspection', '1', '$89.00'],
        ['Drain Pump Replacement Labor', '1', '$115.00'],
        ['OEM Whirlpool Drain Pump Assembly', '1', '$63.00'],
        ['Applicable State & Local Tax', '—', '$19.42']
      ]
    },
    'INV-09818': {
      date: 'February 03, 2026',
      equipment: 'Bosch Dishwasher (Model SHPM65Z55N) · Issue: Slow Fill',
      total: '$241.85',
      note: 'Replaced the water inlet valve, verified the fill rate, and completed a full leak check and wash cycle. Backed by standard service and parts coverage.',
      lines: [
        ['Diagnostic In-Home Inspection', '1', '$89.00'],
        ['Inlet Valve Replacement Labor', '1', '$95.00'],
        ['OEM Bosch Water Inlet Valve', '1', '$42.00'],
        ['Applicable State & Local Tax', '—', '$15.85']
      ]
    },
    'INV-08207': {
      date: 'September 21, 2025',
      equipment: 'GE Dryer (Model GFD55ESSNWW) · Issue: No Heat',
      total: '$318.74',
      note: 'Installed a replacement heating element, tested the thermal controls, and confirmed proper vent airflow and drying temperature. Backed by standard service and parts coverage.',
      lines: [
        ['Diagnostic In-Home Inspection', '1', '$89.00'],
        ['Heating Element Replacement Labor', '1', '$110.00'],
        ['OEM GE Heating Element', '1', '$98.00'],
        ['Applicable State & Local Tax', '—', '$21.74']
      ]
    }
  };

  const invoiceButtons = [...document.querySelectorAll('[data-invoice-select]')];
  const invoiceMeta = document.querySelector('[data-invoice-meta]');
  const invoiceEquipment = document.querySelector('[data-invoice-equipment]');
  const invoiceLines = document.querySelector('[data-invoice-lines]');
  const invoiceTotal = document.querySelector('[data-invoice-total]');
  const invoiceNote = document.querySelector('[data-invoice-note]');

  const selectInvoice = (button) => {
    const id = button.dataset.invoiceSelect;
    const invoice = invoiceData[id];
    if (!invoice || !invoiceMeta || !invoiceEquipment || !invoiceLines || !invoiceTotal || !invoiceNote) return;

    invoiceButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    invoiceMeta.textContent = `${id} · ${invoice.date}`;
    invoiceEquipment.textContent = invoice.equipment;
    invoiceTotal.textContent = invoice.total;
    invoiceNote.textContent = invoice.note;
    invoiceLines.replaceChildren(...invoice.lines.map(([description, quantity, amount]) => {
      const row = document.createElement('tr');
      const descriptionCell = document.createElement('td');
      const quantityCell = document.createElement('td');
      const amountCell = document.createElement('td');
      descriptionCell.textContent = description;
      quantityCell.textContent = quantity;
      amountCell.textContent = amount;
      amountCell.className = 'invoice-amount';
      row.append(descriptionCell, quantityCell, amountCell);
      return row;
    }));
  };

  invoiceButtons.forEach(button => button.addEventListener('click', () => selectInvoice(button)));

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
