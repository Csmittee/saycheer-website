# PROJECT_STATE.md — saycheer-website
> Version 1.7 — 2026-11-10
> Changes: pain-points block row; schema fix verified live (Section 0) (CC_SESSION_saycheer_painpoints_v1)
> Previous: Version 1.6 — 2026-11-10 (Look v3b row; look v3 verified live (Section 0) (CC_SESSION_saycheer_look_v3b)). Earlier: Version 1.5 — 2026-11-10 (status words — CC_SESSION_saycheer_schema_fix_v1: SEO order verified live; schema LocalBusiness (city only); domain live; contact and Thai flags tidied). Earlier: Version 1.4 — 2026-11-10 (Look v3 (CC_SESSION_saycheer_design_v3)). Earlier: Version 1.3 — 2026-11-10 (SEO launch (CC_SESSION_saycheer_seo_v1)). Earlier: Version 1.2 — 2026-11-10 (Design v2, CC_SESSION_saycheer_design_v2). Earlier: Version 1.1 — 2026-11-10 (Page v1, CC_SESSION_saycheer_page_v1)

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| Site skeleton (404, robots.txt, _headers) | DONE (pending owner QA) — order 1, owner QA on saycheer-website#1 |
| Design v2 (index.html, th/index.html, style.css) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on this order's site PR (supersedes the page v1 look) |
| Look v3 (fixed background, splashes, glass, equal neighbours) | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — saycheer-website#5 steps 1–5 PASS, ALL DONE ticked (CC_SESSION_saycheer_design_v3) |
| Look v3b (headline wording, heartbeat picture, balanced closing box, centred footer) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on saycheer-website#7 (merged; ticks not yet read: PENDING)  |
| Pain-points block under hero (picture v2 in Cloudinary) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–4 on this order's site PR; new section `band-pain` (id `pain`) after the hero in both pages, style.css; head, JSON-LD, GA4, sitemap, robots untouched |
| Cloudflare Pages + domain saycheer.janishammer.com | LIVE with SSL since 2026-11-10 (Cloudflare Pages, auto-deploy from main) |
| Indexing | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — noindex removed from index.html and th/index.html; 404.html keeps its noindex (CC_SESSION_saycheer_seo_v1, saycheer-website#4, steps 1–9 PASS) |
| Page content / pictures | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — one hero picture; Thai wording checked by the owner 2026-11-10: nothing wrong, good to go (owner's words) |
| sitemap.xml, robots.txt Sitemap line | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — sitemap.xml is HAND-WRITTEN (2 URLs, SEO-8 exception for a stand-alone static site with no generator); replace it with a generator if the site ever gets one |
| Schema (JSON-LD) | PARTIAL — LocalBusiness with city only (Chonburi, TH); DONE (verified live 2026-11-10 — owner QA passed): CC_SESSION_saycheer_schema_fix_v1, saycheer-website#6 steps 1–3 PASS, ALL DONE (read by CC with the API); streetAddress, openingHours, geo and hasMap are missing on purpose |
| Google Analytics GA4 (`G-HB2ZXSZY0Z`, property "SayCheer", GA account "Janis Hammer") | DONE (verified live 2026-11-10 — owner QA passed, per Chat) — standard Google tag in the head of both pages (not on 404.html) |

## Open markers
- `TODO_OG_IMAGE` — REMOVED in page v1. og:image / twitter:image = `https://res.cloudinary.com/dfiomi0lb/image/upload/v1794246489/Business/Saycheer/website_generated/event_entrance_asean_v2.jpg`.
- SEO-3 PARTIAL DEBT (OPEN) — LocalBusiness has city only; streetAddress, openingHours, geo and hasMap are missing on purpose (owner keeps them private). Replaces the older flag "SEO-3 DEBT (Organization used)".
- COOKIE NOTICE FOR GA4 (OPEN) — owner decision; next small order. No consent or legal wording written; nothing claimed about whether a notice is required.
- Thai wording: checked by the owner 2026-11-10: nothing wrong, good to go (owner's words). Closed (was "THAI DRAFT INDEXED").
- Design v2 uses docs/WEB_DESIGN_PATTERNS.md sections 1, 5, 6, 7. Contrast notes (AA): the SEO line above the headline is ink with a teal bar (teal text on cream fails AA); handwriting tag lines are ink; peach is used as text only on ink; peach numerals, bars and the FAQ marker on light backgrounds are decorative.
- Pain-points block (CC_SESSION_saycheer_painpoints_v1): "Sound familiar?" block directly under the hero (seven questions, "You came to the right place!", feature card "Start it hands-free": say "go" or wave); no price figure and no "tested" claim (owner decision). Picture: Cloudinary public_id `saycheer/group_photo_run_back_v2` (version 1794314122, 1024 x 576 PNG, runner seen from behind; confirmed present with the Cloudinary connector 2026-11-10), delivered with f_auto,q_auto,w_1024. Also in the account, unused: `saycheer/group_photo_run_back_v1` (runner seen from the front) and `saycheer/painpoints_organiser_v1` (rejected: spelling errors in the picture). The new section carries id `pain`, not `why` (the order said why, but `id="why"` is the existing Why SayCheer section and the nav target).
- Look v3b: headline EN "Your guests pose. SayCheer prints the memory." / TH "ให้แขกของคุณโพสต์ท่า แล้วให้ SayCheer พิมพ์ความทรงจำ" (owner chose the version with พิมพ์); heartbeat animation on the hero `<img>` only (reduced-motion turns it off); each button has its own note column; closing box and footer centred; footer left column = wordmark, by Janishammer, Janis Hammer Co., Ltd, Chonburi, Thailand (short lines). Headline sizes lowered so the long wording fits: English clamp(2.9rem, 4.4vw, 3.5rem) from 900px; Thai min(2.6rem, 10.5vw) below 900px and clamp(3.2rem, 4.2vw, 3.6rem) from 900px.
- Look v3 (docs/WEB_DESIGN_PATTERNS.md section 8): fixed `.bg` layer with 12 text splashes (7 below 640px), glass boxes via `color-mix` + `backdrop-filter` inside one `@supports` block with solid fallbacks (no support; reduced transparency), equal-neighbour rule, text never below 15px. Owner decides "not messy" in QA step 1. On phones the splashes are about 25px (the 40%-of-screen limit), smaller than the 2.5rem first asked for.
- Third-party resources now: Google Fonts (Inter, Noto Sans Thai, Caveat, Mali) and Google Analytics (googletagmanager.com; SEC-5 approved list; owner gave the ID). No other script.
- Contact on the page: the only public contact is the `mailto:` address info@janishammer.com (call-to-action address chosen 2026-11-09; the owner may switch it); still no prices, LINE, phone, street address or social links.
- Burmese / Lao / Vietnamese pages, LINE button: later orders.

## SEO-10 baseline
launch (owner-reported plan, 2026-11-10): 2 pages submitted for indexing after this order; Search Console numbers (pages known / indexed, impressions, clicks, sitemap status) to be added from the owner's next export (about 2026-11-24). Last audit: none.
