# FULL HANDOVER — Chery Westrand × BCI Security fleet proposal

_Last updated: 2 October 2026. Branch: `claude/gallant-babbage-7ulve8`._

## 1. Who / context

- **Me:** Innocent Mariti — **Vehicle Lifestyle Advisor, Fleet Sales, CMH Westrand** (authorised
  Chery dealer). Work email **nse9420@cmh.co.za**, mobile 073 567 2508.
  Dealer address: Cnr Hendrik Potgieter & Cascades Roads, Little Falls, Roodepoort.
- **My manager:** Theuhan van Dyk, New Cars Sales Manager — theuhanvd@cmh.co.za.
- **The prospect:** BCI Security (domain **bcisecurity.co.za**). There is already an existing
  business relationship (BCI provides security at Sagewood, where I am involved). This proposal
  aims to turn that relationship into a vehicle fleet partnership.
- **Also mine:** MaritiCo (Pty) Ltd, my automation side-business — its brand kit/template was the
  basis for the proposal design. Not the sender of this proposal.

## 2. What we built (the deliverables)

A fleet proposal pitching **15 x Chery Tiggo Cross 1.5 LiT CVT** to BCI Security, delivered in
**BCI livery**, in an editorial design (cream paper, Playfair Display serif, gold accents),
with both parties' real logos and photos of the BCI-liveried car.

**Files (in repo `ai-sales-assistant/proposals/`):**
- `Chery_Westrand_BCI_Proposal_Complete.pdf` — **the one to send** = cover letter (p1) + 3-page
  proposal (front page + vehicle page + fleet/ownership/next-step page). 4 pages total.
- `Chery_Westrand_BCI_Fleet_Proposal.pdf` — the 3-page proposal on its own.
- `Chery_Westrand_BCI_Cover_Letter.pdf` — the 1-page cover letter on its own.
- Source HTML: `Chery_Westrand_BCI_Proposal.html`, `Chery_Westrand_BCI_Cover_Letter.html`.
- Assets: `assets/` (logos `chery_westrand.png`, `bci_on_dark.png`; car photos `tiggo_hero.jpg`,
  `tiggo_views.jpg`). Fonts in `fonts/` (gitignored): Playfair + Inter TTFs.
- Older/superseded: `Chery_Westrand_BCI_Proposal_Editorial.*` (9-page), `*_3page.*`.
- To re-render a PDF: open the HTML in Chrome and Print to PDF (A4), or headless Chrome
  `--print-to-pdf`. Fonts load from the local `fonts/` folder.

**Key content decisions (agreed):**
- **No prices** anywhere (deliberate; figures provided after requirements are agreed).
- **No em dashes** anywhere (brand rule).
- Claims kept soft/defensible; livery shown as "illustrative concept, subject to BCI approval".
- Title used: **Vehicle Lifestyle Advisor** (not "Chery Vehicle Lifestyle Advisor").
- Verified vehicle specs: 1.5 L petrol NA, 83 kW/170 Nm, CVT, claimed 7.3 L/100 km, 51 L tank,
  4320x1831x1652 mm, 380 L boot, 5 seats, 16-inch, 4 airbags, ABS/EBD/ESC, 10.25-inch dual
  screen; warranty 5yr/150 000 km vehicle + 10yr/1 000 000 km engine; service plan 3yr/45 000 km
  (all subject to Chery SA T&Cs).
- **Pricing held back but known** (for when BCI asks): retail ~R309,900/unit incl VAT; proposed
  8% fleet discount → ~R285,108/unit → ~R4,276,620 for 15. These are NOT in the document.

## 3. IMMEDIATE PENDING TASK — send the proposal email

**Status: approved by me, NOT yet sent.** Must go from my **work Outlook (nse9420@cmh.co.za)**.
A cloud session cannot reach Outlook; this must run in a session **on my computer** (Claude
Desktop app, or `claude remote-control`), using computer use / the Outlook desktop app.

**Send only after showing me the draft and getting my confirmation. Never send from Gmail.**

- **From:** nse9420@cmh.co.za
- **To:** opsmanager@bcisecurity.co.za; johnny@bcisecurity.co.za; johann@bcisecurity.co.za;
  reception@bcisecurity.co.za; admin@bcisecurity.co.za
- **Cc:** theuhanvd@cmh.co.za
- **Subject:** Chery Tiggo Cross Fleet Mobility Proposal - BCI Security x CMH Westrand
- **Attachment:** `Chery_Westrand_BCI_Proposal_Complete.pdf` (in my **Downloads**; repo copy is the
  backup at `ai-sales-assistant/proposals/`).

**Body:**

Good day Jaco, Johnny, Johann and Silvia,

I trust you are all well.

BCI Security and CMH Westrand already have an established working relationship, and I am writing
to explore taking it a step further through a dedicated vehicle fleet solution built around
BCI's operational requirements.

Please find attached a fleet mobility proposal outlining a potential fleet of 15 Chery Tiggo
Cross vehicles, configured for BCI Security and presented in BCI livery. The final vehicle
specification, livery, equipment and delivery programme would be confirmed with BCI before any
order.

The Tiggo Cross combines automatic transmission, SUV practicality, fuel efficiency, safety and
long-term warranty coverage, which can make it well suited to day-to-day fleet operations. The
BCI livery also gives the fleet a consistent, professional presence across your operational
footprint.

This initial proposal does not include pricing deliberately. Before preparing a formal
quotation, I would prefer to understand BCI's preferred ownership structure, operational
requirements and fleet priorities, and then prepare transparent figures around the preferred
route.

I would welcome the opportunity to bring a demonstration unit to your team and discuss how the
Tiggo Cross could fit BCI's requirements. There is no obligation at this stage.

Kind regards,
Innocent Mariti
Vehicle Lifestyle Advisor - Fleet Sales
CMH Westrand
073 567 2508 - nse9420@cmh.co.za
Cnr Hendrik Potgieter & Cascades Roads, Little Falls, Roodepoort

## 4. Contacts reference (verified from my mailbox)

| Name | Role | Email |
|---|---|---|
| Jaco | Operations Manager, BCI | opsmanager@bcisecurity.co.za |
| Johnny | BCI | johnny@bcisecurity.co.za |
| Johann Grobler | HR/Finance, BCI | johann@bcisecurity.co.za |
| Silvia Heath | Reception/Admin, BCI | reception@bcisecurity.co.za / admin@bcisecurity.co.za |
| Theuhan van Dyk | New Cars Sales Mgr, CMH (my manager, Cc) | theuhanvd@cmh.co.za |

## 5. Optional / open items

- I originally wanted to reuse the body of an email I had sent to **Theuhan**. It was NOT in my
  Gmail (only short notes). If it matters, check my **Outlook Sent Items** for it and offer it as
  an alternative body before sending. Otherwise the body above is approved.
- Pricing page/annex can be added later once BCI confirms the ownership route (figures in §2).
- If a demo unit date is agreed, follow up with a formal fleet quotation.

## 6. How to continue (to finish the send)

1. On my laptop, open the **Claude Desktop app** (or run `claude remote-control` in a terminal),
   so Claude can control my computer and Outlook.
2. Make sure `Chery_Westrand_BCI_Proposal_Complete.pdf` is in my **Downloads**.
3. Give this instruction:

   > Using Outlook on my computer (work account nse9420@cmh.co.za), compose the BCI fleet
   > proposal email exactly as set out in HANDOVER.md section 3, attach the proposal PDF from my
   > Downloads, show me the draft, and send only after I confirm. Do not send from Gmail.
