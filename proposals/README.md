# BCI Security Fleet Mobility Proposal — generator

Client-ready fleet proposal for **BCI Security**, presented by **CMH Westrand**,
featuring the **Chery Tiggo Cross**. Prepared by Innocent Mariti (Chery Vehicle
Lifestyle Advisor, CMH Westrand).

## What this is

Built on the existing **MariticO proposal template** (the template used for
MariticO proposals), reusing its design system — Inter typography, header brand
lockup + document-reference, numbered sections, callouts, the pricing/tier grid,
the signature block, the footer strap, `contenteditable` fields and the A4
print-to-PDF CSS. It has been **reskinned for this client**: CMH Westrand +
BCI Security branding, accent changed from MariticO orange to automotive red,
with genuine Chery Tiggo Cross livery imagery.

Source template (Google Drive, owner innocentmariti@gmail.com):
`MaritiCo_Proposal_v2_2026-05-28.html` (id `1kVpWSyDqNWAEgIH3vVTNUHG1WjuC3iJe`);
real filled example referenced: `MaritiCo_Proposal_DCohenPhysio_2026-06-19.html`.

## Files

| File | Purpose |
|------|---------|
| `data/bci-security.json` | **Edit here.** All client, vehicle, pricing, support, options and contact details. |
| `build.mjs` | Generator: reads the JSON, embeds the imagery, renders HTML + PDF. |
| `assets/tiggo-cross-bci-livery.jpg` | BCI-liveried Tiggo Cross render (hero). |
| `assets/tiggo-cross-bci-wrap-views.jpg` | Livery concept across body views. |
| `output/BCI_Security_Fleet_Mobility_Proposal.html` | Editable preview (open in a browser, edit inline, **Print / Save PDF**). |
| `output/BCI_Security_Fleet_Mobility_Proposal.pdf` | The generated proposal. |

## Generate

```bash
NODE_PATH=/opt/node-tools/node_modules node proposals/build.mjs
```

Produces both the HTML (editable, with a Print button) and the A4 PDF. Run it
again after any edit to `data/bci-security.json` — the layout is reproducible
with no manual fixes.

## Honesty / accuracy notes

- **Vehicle specs** are published South African Chery Tiggo Cross figures;
  derivative-specific items are labelled *To be confirmed*. The range reference
  price (from R359,900.00, 1.5T) is the published RRP, not an offer.
- **No fabricated** discounts, finance rates, instalments, delivery dates or
  official logos. Brand names use clean text treatments.
- The dimension callouts in the wrap-views image are an illustrative wrap-layout
  guide, **not** vehicle specifications (stated in the caption).

---

## C. Information still required before the proposal can be sent

1. Confirmed addressee (decision-maker name & title) and BCI billing/delivery address.
2. Chery Tiggo Cross **derivative** to be quoted (e.g. 1.5T Comfort / 1.5T Elite).
3. **Number of vehicles** required.
4. Current fleet size, and current vehicle makes/models.
5. Expected replacement timeline.
6. Intended vehicle use / operating environment (confirms suitability).
7. Preferred purchasing or finance structure, and target budget per vehicle.
8. Derivative-specific specs to confirm: luggage capacity, airbag count / ADAS,
   infotainment screen size.

## D. Commercial figures / commitments requiring management approval

1. **Fleet discount** per vehicle (quantity-dependent) — not yet approved.
2. **R6,500.00 per-vehicle branding contribution** — offered in good faith,
   subject to final written agreement and branding design approval.
3. **Finance** structure, interest rate, deposit, balloon and monthly instalment
   — subject to affordability assessment, credit approval and lender terms.
4. **Optional accessory / branding packages** — by quotation and approval.
5. **Delivery timelines** — subject to stock availability.
6. On-the-road costs and final vehicle price — to be confirmed on the selected
   derivative.

Everything above is shown in the document as *To be confirmed* / *subject to
approval* and must not be presented as agreed until authorised in writing.
