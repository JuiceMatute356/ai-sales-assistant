# Working notes for this repository

Read this before changing anything. It records decisions that have already
been made, so they do not get made again differently.

> This file is committed to a public repository. Keep operational detail,
> credentials, client names and private contact details out of it.

## What this repo is

A case study, not source code. It documents a production WhatsApp sales
assistant running at a South African motor dealership: what it does, what was
hard, and how it is verified. The implementation is deliberately not
published.

Two things live here and nothing else:

- `README.md` — the case study itself
- `cv/Innocent_Mariti_CV.pdf` — the CV the README links to

If a change does not improve one of those two, it probably does not belong.

## Standing decisions

These were settled already. Do not reopen them without being asked.

**The CV is two pages.** It has grown past two before and been pulled back.
New material displaces old material; it does not add a third page.

**Report counts, not percentages.** "28 of 28" and "2,581 executions, one
hard failure" — not "99.9% success". A percentage hides the denominator and
reads as marketing. A count can be checked.

**No phone number and no street-level location in the public copy.** City
and province only. This applies to the CV and the README both.

**CV filenames stay neutral** (`Innocent_Mariti_CV.pdf`), and PDF metadata
is stripped before committing — no generator strings, no author fields
written by whatever tool produced it. When the filename changes, update the
README link in the same change; it has been left dangling before.

**Never commit a superseded PDF alongside its replacement.** One CV file in
`cv/`, ever.

## Publishing rules

Nothing about the real system's internals goes in this repo: no workflow
definitions, prompts, guardrail thresholds, pricing logic, endpoints,
credentials or infrastructure configuration. The system touches customer
data and commercial pricing. The line is "explains rather than reproduces" —
architecture at the level of boxes and arrows is fine, anything runnable is
not.

The live demo is a sandbox against a fictional dealership (Northgate Motors,
fictional stock, fictional pricing). Never describe it as the production
system, and never quote demo figures as production figures.

## Verification figures

The numbers in the README's verification table are dated
(*Figures verified 2026-08-20*). If you change a figure, change the date
with it. If you cannot verify a figure, leave the old one and say so —
do not estimate, and do not quietly refresh the date.

## Tone

The README is written plainly and admits what broke. That is deliberate and
it is the reason it is credible. Keep it. No superlatives, no "cutting
edge", no exclamation marks. Prefer the specific failure over the general
claim.

## Workflow

Development happens on the branch named in the session brief, never directly
on `main`. Commit messages follow the existing style: an area prefix, then
what changed and why, in plain sentences (`CV: report counts rather than
percentages`).
