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
│   │   ├── dashboard.js
│   │   └── plugins/
│   ├── images/
│   └── fonts/
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
└── README.md
```

## Getting Started

Serve the project root with any standard static HTTP server and navigate to `pages/index.html`:

```bash
python3 -m http.server 8080
```

Visit `http://localhost:8080/pages/index.html`.
