# Customization Guide

## Brand system

The visual system is token-driven. Change color, surface, type scale, border, radius and shadow variables in `assets/css/style.css`; mirror any contrast-sensitive changes in `dark-mode.css`.

## Shared navigation and footer

Public navigation, mobile drawer and footer markup are assembled in `assets/js/main.js`. This keeps all public pages synchronized. Authentication and customer portal pages intentionally use separate shells.

## Adding a public page

1. Copy the semantic document shell from an existing inner page.
2. Set a unique title and meta description.
3. Set `data-page` on the body for active navigation.
4. Keep one H1 and a logical heading hierarchy.
5. Use local images with meaningful alt text and explicit dimensions.
6. Add the page to the appropriate shared navigation list inside `assets/js/main.js`.

## Forms and integration

Current forms demonstrate accessible client-side validation and successful UI states. Connect submission handlers to a secure backend, add CSRF protection, validate on the server and never trust client-provided values.

## Portal integration

Replace the example repair, invoice and customer records with authenticated API responses. Enforce authorization for every portal resource; hiding a navigation item is not access control.

## Browser support

The template targets current Chrome, Safari, Firefox and Edge. Test sticky headers, drawers, printing, date inputs, RTL and form integration in the production browser matrix.

## Photography credits

- Emmanuel Ikwuegbu on Unsplash — electrical service technician (`_2AlIm-F6pw`)
- Theme Photos on Unsplash — repair tools (`Klby0nxseY8`)
- Naomi Hébert on Unsplash — residential kitchen (`MP0bgaS_d1c`)
- Emmanuel Ikwuegbu on Unsplash — household appliances (`FXpJW_wdMdk`)
- Bulat843 on Pexels — appliance technician photographs (`38190070`, `34734504`, `32588555`)
- Lisa Anna on Unsplash — built-in oven and kitchen photographs (`pKf0buNgOIU`, `wXLn2A7RLOQ`)

All production copies are downloaded locally in `assets/images/`. Reconfirm license terms before redistributing the template as a commercial stock-photo bundle.
