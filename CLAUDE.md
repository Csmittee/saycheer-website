# CLAUDE.md — saycheer-website (seed)
> Version 1.0 — 2026-11-09
> Changes: Initial seed (CC_SESSION_saycheer_site_setup_v1)
> Previous: NONE

Project: SayCheer Photo Booth by Janishammer — stand-alone site, EN + TH, planned host saycheer.janishammer.com.
Owner: Chairit Smittee (Csmittee) — one-person, GitHub browser only, no local terminal.

Governance lives in janishammer-central. Read in order every CC session:
  1. janishammer-central/CLAUDE.md → RULES.md → CC_SKILL.md → relevant .claude/rules/RULES-[domain].md → CC_CHAT_LOG.md (last 3)
  2. This repo: CLAUDE.md → PROJECT_STATE.md → CC_CHAT_LOG.md (last 3)

Constraints (all four, always):
  1. No injector — stand-alone site (HTML-5 exclusion). Never add assets.janishammer.com scripts.
  2. Images via Cloudinary only (CONT-4, cloud dfiomi0lb). Never commit image files.
  3. No secrets, keys or tokens in any file (DEP-1, SEC-1).
  4. No prices, LINE, phone or street address on the page; no email, social links or claims either.

Also: no third-party scripts (SEC-5), no workflows without an order (DEP-7), canonical extensionless (SEO-2),
HTML files under 800 lines (HTML-1), pages stay `noindex` until the launch order removes it.
The private SayCheer repo is the product source — read-only reference, never copied from.
