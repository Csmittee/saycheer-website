# PROJECT_STATE.md — saycheer-website
> Version 1.3 — 2026-11-10
> Changes: SEO launch (CC_SESSION_saycheer_seo_v1) — noindex removed, sitemap.xml, Organization schema, GA4
> Previous: Version 1.2 — 2026-11-10 (Design v2, CC_SESSION_saycheer_design_v2). Earlier: Version 1.1 — 2026-11-10 (Page v1, CC_SESSION_saycheer_page_v1)

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| Site skeleton (404, robots.txt, _headers) | DONE (pending owner QA) — order 1, owner QA on saycheer-website#1 |
| Design v2 (index.html, th/index.html, style.css) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on this order's site PR (supersedes the page v1 look) |
| Cloudflare Pages + domain saycheer.janishammer.com | QUEUED — owner does the taps after merge (Chat gives the steps) |
| Indexing | DONE (pending owner QA) — NOT VERIFIED LIVE — noindex removed from index.html and th/index.html; 404.html keeps its noindex; owner QA steps 1–2, 9 on this order's site PR |
| Page content / pictures | PARTIAL — page v1 with one hero picture; Thai wording awaits the owner |
| sitemap.xml, robots.txt Sitemap line, Organization JSON-LD | DONE (pending owner QA) — NOT VERIFIED LIVE — sitemap.xml is HAND-WRITTEN (2 URLs, SEO-8 exception for a stand-alone static site with no generator); replace it with a generator if the site ever gets one; owner QA steps 3–7 |
| Google Analytics GA4 (`G-HB2ZXSZY0Z`, property "SayCheer", GA account "Janis Hammer") | DONE (pending owner QA) — NOT VERIFIED LIVE — standard Google tag in the head of both pages (not on 404.html); owner QA step 8 |

## Open markers
- `TODO_OG_IMAGE` — REMOVED in page v1. og:image / twitter:image = `https://res.cloudinary.com/dfiomi0lb/image/upload/v1794246489/Business/Saycheer/website_generated/event_entrance_asean_v2.jpg`.
- SEO-3 DEBT (OPEN) — LocalBusiness needs street address, hours, geo that the owner keeps private; Organization used instead (JSON-LD in both pages, no address / phone / email / social / logo / hours / geo).
- COOKIE NOTICE FOR GA4 (OPEN) — owner decision; next small order. No consent or legal wording written; nothing claimed about whether a notice is required.
- THAI DRAFT INDEXED (OPEN) — the Thai wording is Chat's first draft and the owner has not read it; the owner chose to launch now (chat 2026-11-10); a small order fixes the Thai later.
- Design v2 uses docs/WEB_DESIGN_PATTERNS.md sections 1, 5, 6, 7. Contrast notes (AA): the SEO line above the headline is ink with a teal bar (teal text on cream fails AA); handwriting tag lines are ink; peach is used as text only on ink; peach numerals, bars and the FAQ marker on light backgrounds are decorative.
- Third-party resources now: Google Fonts (Inter, Noto Sans Thai, Caveat, Mali) and Google Analytics (googletagmanager.com; SEC-5 approved list; owner gave the ID). No other script.
- Report only, not changed: both pages already carry a `mailto:` quotation address in the buttons (set in page v1); the card do-not-do says no email on the page — Chat decides.
- Burmese / Lao / Vietnamese pages, LINE button: later orders.

## SEO-10 baseline
launch (owner-reported plan, 2026-11-10): 2 pages submitted for indexing after this order; Search Console numbers (pages known / indexed, impressions, clicks, sitemap status) to be added from the owner's next export (about 2026-11-24). Last audit: none.
