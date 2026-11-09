# PROJECT_STATE.md — saycheer-website
> Version 1.1 — 2026-11-10
> Changes: Page v1 (CC_SESSION_saycheer_page_v1) — real EN + TH page, style.css, og:image set, TODO_OG_IMAGE removed
> Previous: Version 1.0 — 2026-11-09 (Initial, CC_SESSION_saycheer_site_setup_v1)

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| Site skeleton (404, robots.txt, _headers) | DONE (pending owner QA) — order 1, owner QA on saycheer-website#1 |
| Page v1 (index.html, th/index.html, style.css) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on this order's site PR |
| Cloudflare Pages + domain saycheer.janishammer.com | QUEUED — owner does the taps after merge (Chat gives the steps) |
| Indexing | PARTIAL — pages carry `noindex, follow` until the launch order removes it |
| Page content / pictures | PARTIAL — page v1 with one hero picture; Thai wording awaits the owner |
| sitemap.xml, SEO files | QUEUED — order 3 (robots.txt has no Sitemap line yet) |

## Open markers
- `TODO_OG_IMAGE` — REMOVED in page v1. og:image / twitter:image = `https://res.cloudinary.com/dfiomi0lb/image/upload/v1794246489/Business/Saycheer/website_generated/event_entrance_asean_v2.jpg`.
- SEO-3 DEBT — homepage LocalBusiness schema needs streetAddress, openingHours, geo: owner keeps the street line private and gave no public hours; order 3 proposes Organization schema (name, url) and asks for a RULES-seo decision under WF-7 if needed.
- Thai wording is a first draft; the owner reads it before launch.
- Pages stay `noindex, follow` until the SEO order (order 3).

## SEO-10 baseline
none yet — site not live (no pages known / indexed, no impressions or clicks, no sitemap, no audit).
