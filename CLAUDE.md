# CLAUDE.md — saycheer-website (seed)
> Version 1.1 — 2026-11-10
> Changes: constraint 4 wording (the one public contact is the mailto address); host live; scripts line and launch line brought up to date (CC_SESSION_saycheer_schema_fix_v1)
> Previous: Version 1.0 — 2026-11-09 (Initial seed (CC_SESSION_saycheer_site_setup_v1)). Earlier: NONE

Project: SayCheer Photo Booth by Janishammer — stand-alone site, EN + TH, host saycheer.janishammer.com (live).
Owner: Chairit Smittee (Csmittee) — one-person, GitHub browser only, no local terminal.

Governance lives in janishammer-central. Read in order every CC session:
  1. janishammer-central/CLAUDE.md → RULES.md → CC_SKILL.md → relevant .claude/rules/RULES-[domain].md → CC_CHAT_LOG.md (last 3)
  2. This repo: CLAUDE.md → PROJECT_STATE.md → CC_CHAT_LOG.md (last 3)

Constraints (all four, always):
  1. No injector — stand-alone site (HTML-5 exclusion). Never add assets.janishammer.com scripts.
  2. Images via Cloudinary only (CONT-4, cloud dfiomi0lb). Never commit image files.
  3. No secrets, keys or tokens in any file (DEP-1, SEC-1).
  4. No prices, LINE, phone, street address or social links on the page, and no claims. The only public contact is the `mailto:` address info@janishammer.com (the call-to-action address chosen 2026-11-09; the owner may switch it).

Also: no third-party scripts beyond Google Fonts and Google Analytics (SEC-5), no workflows without an order (DEP-7), canonical extensionless (SEO-2),
HTML files under 800 lines (HTML-1); launched 2026-11-10 (`noindex` removed from the two pages; 404.html keeps it).
The private SayCheer repo is the product source — read-only reference, never copied from.
