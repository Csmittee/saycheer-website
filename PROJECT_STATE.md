# PROJECT_STATE.md — saycheer-website
> Version 1.5 — 2026-11-10
> Changes: status words — CC_SESSION_saycheer_schema_fix_v1: SEO order verified live; schema LocalBusiness (city only); domain live; contact and Thai flags tidied
> Previous: Version 1.4 — 2026-11-10 (Look v3 (CC_SESSION_saycheer_design_v3)). Earlier: Version 1.3 — 2026-11-10 (SEO launch (CC_SESSION_saycheer_seo_v1)). Earlier: Version 1.2 — 2026-11-10 (Design v2, CC_SESSION_saycheer_design_v2). Earlier: Version 1.1 — 2026-11-10 (Page v1, CC_SESSION_saycheer_page_v1)

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| Site skeleton (404, robots.txt, _headers) | DONE (pending owner QA) — order 1, owner QA on saycheer-website#1 |
| Design v2 (index.html, th/index.html, style.css) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on this order's site PR (supersedes the page v1 look) |
| Look v3 (fixed background, splashes, glass, equal neighbours) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on this order's site PR; style.css rewritten, body of both pages changed, head, JSON-LD, GA4, sitemap, robots untouched |
| Cloudflare Pages + domain saycheer.janishammer.com | LIVE with SSL since 2026-11-10 (Cloudflare Pages, auto-deploy from main) |
| Indexing | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — noindex removed from index.html and th/index.html; 404.html keeps its noindex (CC_SESSION_saycheer_seo_v1, saycheer-website#4, steps 1–9 PASS) |
| Page content / pictures | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — one hero picture; Thai wording checked by the owner 2026-11-10: nothing wrong, good to go (owner's words) |
| sitemap.xml, robots.txt Sitemap line | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — sitemap.xml is HAND-WRITTEN (2 URLs, SEO-8 exception for a stand-alone static site with no generator); replace it with a generator if the site ever gets one |
| Schema (JSON-LD) | PARTIAL — LocalBusiness with city only (Chonburi, TH) written by CC_SESSION_saycheer_schema_fix_v1, DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–3 on this order's site PR; the Organization block verified live earlier is replaced; streetAddress, openingHours, geo and hasMap are missing on purpose |
| Google Analytics GA4 (`G-HB2ZXSZY0Z`, property "SayCheer", GA account "Janis Hammer") | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — standard Google tag in the head of both pages (not on 404.html) |

## Open markers
- `TODO_OG_IMAGE` — REMOVED in page v1. og:image / twitter:image = `https://res.cloudinary.com/dfiomi0lb/image/upload/v1794246489/Business/Saycheer/website_generated/event_entrance_asean_v2.jpg`.
- SEO-3 PARTIAL DEBT (OPEN) — LocalBusiness has city only; streetAddress, openingHours, geo and hasMap are missing on purpose (owner keeps them private). Replaces the older flag "SEO-3 DEBT (Organization used)".
- COOKIE NOTICE FOR GA4 (OPEN) — owner decision; next small order. No consent or legal wording written; nothing claimed about whether a notice is required.
- Thai wording: checked by the owner 2026-11-10: nothing wrong, good to go (owner's words). Closed (was "THAI DRAFT INDEXED").
- Design v2 uses docs/WEB_DESIGN_PATTERNS.md sections 1, 5, 6, 7. Contrast notes (AA): the SEO line above the headline is ink with a teal bar (teal text on cream fails AA); handwriting tag lines are ink; peach is used as text only on ink; peach numerals, bars and the FAQ marker on light backgrounds are decorative.
- Look v3 (docs/WEB_DESIGN_PATTERNS.md section 8): fixed `.bg` layer with 12 text splashes (7 below 640px), glass boxes via `color-mix` + `backdrop-filter` inside one `@supports` block with solid fallbacks (no support; reduced transparency), equal-neighbour rule, text never below 15px. Owner decides "not messy" in QA step 1. On phones the splashes are about 25px (the 40%-of-screen limit), smaller than the 2.5rem first asked for.
- Third-party resources now: Google Fonts (Inter, Noto Sans Thai, Caveat, Mali) and Google Analytics (googletagmanager.com; SEC-5 approved list; owner gave the ID). No other script.
- Contact on the page: the only public contact is the `mailto:` address info@janishammer.com (call-to-action address chosen 2026-11-09; the owner may switch it); still no prices, LINE, phone, street address or social links.
- Burmese / Lao / Vietnamese pages, LINE button: later orders.

## SEO-10 baseline
launch (owner-reported plan, 2026-11-10): 2 pages submitted for indexing after this order; Search Console numbers (pages known / indexed, impressions, clicks, sitemap status) to be added from the owner's next export (about 2026-11-24). Last audit: none.
