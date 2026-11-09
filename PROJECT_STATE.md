# PROJECT_STATE.md — saycheer-website
> Version 1.2 — 2026-11-10
> Changes: Design v2 (CC_SESSION_saycheer_design_v2) — new structure and look of the page, style.css rewritten
> Previous: Version 1.1 — 2026-11-10 (Page v1, CC_SESSION_saycheer_page_v1)

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| Site skeleton (404, robots.txt, _headers) | DONE (pending owner QA) — order 1, owner QA on saycheer-website#1 |
| Design v2 (index.html, th/index.html, style.css) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on this order's site PR (supersedes the page v1 look) |
| Cloudflare Pages + domain saycheer.janishammer.com | QUEUED — owner does the taps after merge (Chat gives the steps) |
| Indexing | PARTIAL — pages carry `noindex, follow` until the launch order removes it |
| Page content / pictures | PARTIAL — page v1 with one hero picture; Thai wording awaits the owner |
| sitemap.xml, SEO files | QUEUED — order 3 (robots.txt has no Sitemap line yet) |

## Open markers
- `TODO_OG_IMAGE` — REMOVED in page v1. og:image / twitter:image = `https://res.cloudinary.com/dfiomi0lb/image/upload/v1794246489/Business/Saycheer/website_generated/event_entrance_asean_v2.jpg`.
- SEO-3 DEBT — homepage LocalBusiness schema needs streetAddress, openingHours, geo: owner keeps the street line private and gave no public hours; order 3 proposes Organization schema (name, url) and asks for a RULES-seo decision under WF-7 if needed.
- Thai wording is a first draft; the owner reads it before launch.
- Design v2 uses docs/WEB_DESIGN_PATTERNS.md sections 1, 5, 6, 7. Contrast notes (AA): the SEO line above the headline is ink with a teal bar (teal text on cream fails AA); handwriting tag lines are ink; peach is used as text only on ink; peach numerals, bars and the FAQ marker on light backgrounds are decorative.
- Pages stay `noindex, follow` until the SEO order (order 3).

## SEO-10 baseline
none yet — site not live (no pages known / indexed, no impressions or clicks, no sitemap, no audit).
