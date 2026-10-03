# Home Appliance Repair Service

An on-demand home appliance repair service website featuring public service pages and a responsive customer dashboard for submitting repair requests, tracking technician/job status, reviewing repair history and invoices, and rating completed services.

## Features

- Responsive public website
- Home Page 1 and Home Page 2
- Appliance service pages
- How It Works
- Pricing guide
- Testimonials
- Contact
- Light/Dark mode
- LTR/RTL support
- Responsive navigation
- Customer dashboard
- Repair request workflow
- Repair status tracking
- Repair history
- Invoices
- Ratings
- Profile/settings

## Technologies

- HTML5
- CSS3 (Vanilla CSS with CSS Custom Properties, Grid, and Flexbox)
- JavaScript (ES6+)

## Project Structure

```
Home Appliance Repair Service/
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── dashboard.css
│   │   ├── dark-mode.css
│   │   └── rtl.css
│   ├── js/
│   │   ├── main.js
│   │   └── dashboard.js
│   └── images/
├── pages/
│   ├── index.html
│   ├── home-2.html
│   ├── about.html
│   ├── services.html
│   ├── service-details.html
│   ├── how-it-works.html
│   ├── pricing.html
│   ├── testimonials.html
│   ├── blog.html
│   ├── blog-details.html
│   ├── contact.html
│   ├── faq.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── repair-request.html
│   ├── privacy.html
│   ├── terms.html
│   ├── 404.html
│   ├── dashboard.html
│   ├── dashboard-request-repair.html
│   ├── dashboard-active-repairs.html
│   ├── dashboard-history.html
│   ├── dashboard-invoices.html
│   ├── dashboard-ratings.html
│   └── dashboard-profile.html
├── documentation/
│   └── customization.md
├── .github/
│   └── workflows/
│       └── pages.yml
└── README.md
```

## Getting Started

Serve the project root with any standard static HTTP server:

```bash
python3 -m http.server 8080
```

Open the canonical source homepage at `http://localhost:8080/pages/index.html`.

## GitHub Pages

GitHub Actions publishes the site without adding deployment-only files to the
source root. During deployment, `.github/workflows/pages.yml` copies `assets/`
and `pages/` into `${{ runner.temp }}/published-site` and generates a temporary
root redirect to the canonical `pages/index.html` homepage.
