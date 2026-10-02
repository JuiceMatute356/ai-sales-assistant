#!/usr/bin/env node
/*
 * BCI Security Fleet Mobility Proposal — generator
 * -------------------------------------------------
 * Built on the existing MariticO proposal template
 *   (Google Drive: MaritiCo_Proposal_v2_2026-05-28.html)
 * reusing its design system: Inter typography, header brand lockup + doc-meta
 * with an accent rule, numbered h2 sections, callouts, the pricing/tier grid,
 * the signature/acceptance block, the footer strap, contenteditable fields and
 * the A4 print CSS (Print / Save PDF).
 *
 * Reskinned for this client: CMH Westrand (dealership) + BCI Security (client),
 * accent changed from MariticO orange to automotive red, with genuine Chery
 * Tiggo Cross imagery. All client / vehicle / pricing / contact details are
 * data-driven from  proposals/data/bci-security.json.
 *
 * Usage:  NODE_PATH=/opt/node-tools/node_modules node proposals/build.mjs
 */
import { createRequire } from 'module';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const D = JSON.parse(readFileSync(join(ROOT, 'data', 'bci-security.json'), 'utf8'));

// ---- helpers -------------------------------------------------------------
const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ce = (s = '') => `<span contenteditable="true">${esc(s)}</span>`;

function dataUri(rel) {
  const p = join(ROOT, 'assets', rel);
  const buf = readFileSync(p);
  const ext = extname(p).toLowerCase().replace('.', '');
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${buf.toString('base64')}`;
}
const longDateSA = (d = new Date()) =>
  new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

const chip = (kind) => {
  const map = {
    confirmed: ['Standard', 'c-green'],
    verified: ['Published', 'c-green'],
    included: ['Included', 'c-red'],
    reference: ['Reference', 'c-grey'],
    tbc: ['To confirm', 'c-amber'],
  };
  const [label, cls] = map[kind] || ['', 'c-grey'];
  return label ? `<span class="chip ${cls}">${label}</span>` : '';
};

const liveryImg = dataUri(D.vehicle.imageLivery);
const wrapImg = dataUri(D.vehicle.imageWrapViews);
const today = D.meta.dateMode === 'dynamic' ? longDateSA() : longDateSA(new Date(D.meta.date));

// ---- section fragments ---------------------------------------------------
const specRows = D.vehicle.verifiedSpecs.rows
  .map((r) => `<tr><td class="k">${esc(r.label)}</td><td class="v">${esc(r.value)} ${chip(r.status)}</td></tr>`)
  .join('');

const commercialRows = D.commercial.rows
  .map((r) => `<tr><td class="k">${esc(r.label)}</td><td class="v">${esc(r.value)} ${chip(r.kind)}</td></tr>`)
  .join('');

const supportCards = D.support
  .map((s) => `<div class="scard"><div class="scard-t">${esc(s.t)}</div><div class="scard-d">${esc(s.d)}</div></div>`)
  .join('');

const optionCards = D.options
  .map(
    (o) => `
      <div class="tier">
        <div class="tier-name">${esc(o.tag)}</div>
        <div class="tier-opt">${esc(o.name)}</div>
        <div class="tier-for">${esc(o.for)}</div>
        <ul>${o.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`
  )
  .join('');

const needList = D.informationRequired.map((x) => `<li>${esc(x)}</li>`).join('');

// ---- document ------------------------------------------------------------
const html = `<!DOCTYPE html>
<html lang="en-ZA">
<head>
<meta charset="UTF-8">
<title>${esc(D.client.name)} — ${esc(D.meta.proposalTitle)}</title>
<style>
  :root { --white:#FFFFFF; --paper:#FAFAFA; --ink:#17181C; --ink-soft:#43454C; --ink-muted:#878A90;
          --line:#E4E5E8; --accent:#C8102E; --accent-dark:#9C0C23; }
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'Inter',-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif; background:#ECECEC;
         color:var(--ink); padding:24px 16px; line-height:1.55; font-size:12.5px;
         -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .toolbar { max-width:840px; margin:0 auto 16px; display:flex; gap:8px; justify-content:flex-end; }
  .toolbar button { background:var(--accent); color:#fff; border:none; padding:11px 22px; border-radius:8px;
         font-size:10px; font-weight:600; cursor:pointer; letter-spacing:2px; text-transform:uppercase; }
  .page { max-width:840px; margin:0 auto 18px; background:var(--white); border-radius:6px; overflow:hidden;
         position:relative; box-shadow:0 4px 24px rgba(20,20,26,0.08); }

  /* header */
  .header { padding:28px 50px 22px; border-bottom:1px solid var(--line); position:relative; overflow:hidden; }
  .header::after { content:''; position:absolute; bottom:-1px; left:50px; width:64px; height:2px; background:var(--accent); }
  .header-content { display:flex; justify-content:space-between; align-items:flex-start; }
  .brand-lockup .text { display:flex; align-items:baseline; gap:3px; }
  .brand-lockup .m { font-size:28px; font-weight:800; letter-spacing:-0.5px; color:var(--ink); line-height:1; }
  .brand-lockup .co { font-size:28px; font-weight:800; letter-spacing:0.5px; color:var(--accent); line-height:1; text-transform:uppercase; }
  .brand-lockup .tag { font-size:8.5px; letter-spacing:2px; color:var(--ink-muted); text-transform:uppercase; margin-top:7px; font-weight:500; }
  .doc-meta { text-align:right; padding:6px 0 0; }
  .doc-title { font-size:18px; font-weight:500; color:var(--ink); letter-spacing:3px; text-transform:uppercase; }
  .doc-num { font-size:10px; color:var(--ink-muted); letter-spacing:1.5px; text-transform:uppercase; margin-top:4px; }
  .doc-num span { color:var(--accent); font-weight:600; }

  /* body */
  .body { padding:30px 50px 8px; }
  .date-line { color:var(--ink-muted); font-size:11px; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:20px; }
  .addressee { margin-bottom:20px; font-size:12px; color:var(--ink-soft); }
  .addressee .name { color:var(--ink); font-weight:600; font-size:13px; }
  .subject { font-size:13px; color:var(--ink); font-weight:600; margin-bottom:20px; padding-bottom:10px; border-bottom:1px solid var(--line); }
  p { margin-bottom:11px; color:var(--ink-soft); }
  h2 { font-size:14px; font-weight:600; color:var(--ink); margin-top:26px; margin-bottom:12px; padding-bottom:6px;
       border-bottom:1.5px solid var(--ink); page-break-after:avoid; }
  h2 .num { color:var(--accent); margin-right:8px; }
  ul, ol { margin:0 0 12px 22px; }
  li { margin-bottom:5px; color:var(--ink-soft); }
  strong { color:var(--ink); font-weight:600; }

  .lead { color:var(--ink); }

  /* vehicle figures */
  .figure { margin:14px 0 6px; border:1px solid var(--line); border-radius:8px; overflow:hidden; background:var(--paper); page-break-inside:avoid; }
  .figure img { width:100%; display:block; }
  /* hero: crop ~13% off the bottom to remove the supplied render's marketing flash */
  .figure.hero img { aspect-ratio:2.53 / 1; object-fit:cover; object-position:center top; }
  .figcap { font-size:9px; color:var(--ink-muted); font-style:italic; margin:7px 2px 14px; }

  /* callouts */
  .callout { background:var(--paper); border-left:3px solid var(--accent); padding:14px 18px; margin:14px 0 18px; border-radius:4px; page-break-inside:avoid; }
  .callout.amber { border-left-color:#D99A00; background:#FBF6EA; }
  .callout .ch { font-weight:700; color:var(--ink); text-transform:uppercase; letter-spacing:1px; font-size:9.5px; margin-bottom:5px; }

  /* preliminary bar */
  .prelim { display:inline-block; background:var(--ink); color:#fff; font-size:9px; font-weight:700; letter-spacing:2px;
            text-transform:uppercase; padding:5px 12px; border-radius:3px; margin:4px 0 12px; }

  /* tables */
  table.data { width:100%; border-collapse:collapse; margin:12px 0 6px; font-size:11px; }
  table.data th { text-align:left; background:var(--ink); color:#fff; font-size:8.5px; text-transform:uppercase;
                  letter-spacing:1px; padding:8px 12px; }
  table.data td { padding:7px 12px; border-bottom:1px solid var(--line); vertical-align:top; color:var(--ink); }
  table.data td.k { width:46%; color:var(--ink-muted); font-weight:600; }
  table.data tr:nth-child(even) td { background:#FBFBFB; }
  .srcnote { font-size:8.5px; color:var(--ink-muted); font-style:italic; margin:6px 0 4px; }
  .disclaimer { font-size:8.5px; color:var(--ink-muted); line-height:1.5; margin-top:14px; border-top:1px solid var(--line); padding-top:9px; }

  /* chips */
  .chip { display:inline-block; font-size:7px; font-weight:700; text-transform:uppercase; letter-spacing:.5px;
          padding:1.5px 6px; border-radius:9px; margin-left:3px; vertical-align:middle; white-space:nowrap; }
  .c-green { background:#E7F3EC; color:#1D7A46; }
  .c-amber { background:#FBF0D8; color:#9A6B05; }
  .c-red { background:#FBE3E7; color:var(--accent-dark); }
  .c-grey { background:#ECEEF0; color:var(--ink-muted); }

  /* support cards */
  .scards { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:14px 0 6px; }
  .scard { border:1px solid var(--line); border-top:2px solid var(--accent); border-radius:4px; padding:11px 13px; page-break-inside:avoid; }
  .scard-t { font-weight:600; color:var(--ink); font-size:11.5px; margin-bottom:3px; }
  .scard-d { font-size:10px; color:var(--ink-muted); line-height:1.45; }

  /* options / pricing grid (reuses template .tier) */
  .pricing { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin:16px 0; page-break-inside:avoid; }
  .tier { padding:18px 16px; border:1px solid var(--line); border-radius:10px; background:var(--paper); display:flex; flex-direction:column; }
  .tier-name { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:#fff; background:var(--accent);
               align-self:flex-start; padding:2px 9px; border-radius:9px; font-weight:700; }
  .tier-opt { font-size:14px; font-weight:700; color:var(--ink); margin:10px 0 4px; letter-spacing:-0.3px; }
  .tier-for { font-size:10px; color:var(--ink-muted); font-style:italic; margin-bottom:8px; min-height:28px; }
  .tier ul { margin:0 0 0 16px; }
  .tier li { font-size:10.5px; color:var(--ink-soft); margin-bottom:4px; }

  /* next-steps / proceed */
  .signature-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-top:22px; padding:22px;
                    background:var(--paper); border-radius:10px; page-break-inside:avoid; }
  .signature-box { border-top:1px solid var(--ink); padding-top:8px; min-height:54px; }
  .signature-box .label { font-size:9px; letter-spacing:2px; text-transform:uppercase; color:var(--ink-muted); font-weight:600; }
  .sig-sub { margin-top:8px; font-size:11px; color:var(--ink-soft); }
  .sig-date { font-size:10px; color:var(--ink-muted); margin-top:2px; }
  .signoff { margin-top:26px; padding-top:18px; border-top:1px solid var(--line); }
  .signoff .so { color:var(--ink-soft); margin-bottom:4px; }
  .signoff .name { color:var(--ink); font-weight:600; font-size:14px; }
  .signoff .role { color:var(--ink-muted); font-size:11px; margin-bottom:6px; }
  .signoff .contact { color:var(--ink-soft); font-size:11.5px; }

  [contenteditable] { outline:none; }
  [contenteditable]:hover { background:rgba(200,16,46,0.06); border-radius:3px; }
  [contenteditable]:focus { background:rgba(200,16,46,0.1); border-radius:3px; box-shadow:0 0 0 1px var(--accent); }

  .footer { border-top:1px solid var(--line); padding:16px 50px; text-align:center; font-size:9px;
            color:var(--ink-muted); letter-spacing:2px; text-transform:uppercase; background:var(--paper); }
  .footer-strap { color:var(--ink); font-weight:600; margin-bottom:4px; font-size:10px; letter-spacing:3px; }

  @page { size:A4 portrait; margin:0; }
  @media print {
    body { background:#fff; padding:0; margin:0; }
    .toolbar { display:none; }
    .page { max-width:none; width:210mm; box-shadow:none; border-radius:0; margin:0; }
    .header { padding:14mm 16mm 7mm; }
    .header::after { left:16mm; }
    .body { padding:9mm 16mm 4mm; }
    .footer { padding:8px 16mm; }
    h2 { page-break-after:avoid; }
    .callout, .signature-grid, .pricing, .figure, table.data, .scard { page-break-inside:avoid; }
  }
</style>
</head>
<body>
<div class="toolbar"><button onclick="window.print()">Print / Save PDF</button></div>

<div class="page">
  <div class="header">
    <div class="header-content">
      <div class="brand-lockup">
        <div class="text"><span class="m">CMH</span><span class="co">Westrand</span></div>
        <div class="tag">${esc(D.dealership.tag)}</div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">${esc(D.meta.docTitle)}</div>
        <div class="doc-num">Ref: ${ce(D.meta.reference)}</div>
      </div>
    </div>
  </div>

  <div class="body">
    <div class="date-line">${ce(today)}</div>
    <div class="addressee">
      <div class="name">${ce(D.client.name)}</div>
      <div>${ce(D.client.attention)}</div>
      <div>${ce(D.client.addressLine1)}</div>
    </div>
    <div class="subject">${ce(D.subject)}</div>

    <p>Dear ${ce('BCI Security team')},</p>
    <p class="lead">${esc(D.opening)}</p>

    <div class="figure hero">
      <img src="${liveryImg}" alt="Chery Tiggo Cross in BCI Security livery">
    </div>
    <div class="figcap">${esc(D.vehicle.imageCaption)}</div>

    <h2><span class="num">1.</span> The opportunity</h2>
    <p>CMH Westrand values its existing business relationship with BCI Security. We would welcome the opportunity to
      extend that relationship into fleet mobility by developing a vehicle package aligned with BCI's operational
      requirements, budget and replacement plans.</p>
    <p>Our objective is a practical, commercially structured solution that considers the total cost of ownership,
      vehicle suitability and ongoing dealership support — not simply a vehicle price. Where this proposal refers to
      cost reduction, it is an objective to be evaluated against BCI's current fleet once the relevant figures are
      available, not a saving we are claiming in advance.</p>

    <h2><span class="num">2.</span> Why the Chery Tiggo Cross</h2>
    <p>${esc(D.vehicle.intro)}</p>
    <table class="data">
      <thead><tr><th>Area</th><th>Detail</th></tr></thead>
      <tbody>${specRows}</tbody>
    </table>
    <div class="srcnote">${esc(D.vehicle.verifiedSpecs.note)}</div>
    <div class="figure"><img src="${wrapImg}" alt="BCI Security livery concept across body views"></div>
    <div class="figcap">${esc(D.vehicle.wrapCaption)}</div>
    <div class="callout amber">
      <div class="ch">Suitability — to be confirmed with BCI</div>
      ${esc(D.vehicle.suitability)}
    </div>

    <h2><span class="num">3.</span> The commercial fleet offer</h2>
    <div class="prelim">${esc(D.commercial.status)}</div>
    <p>${esc(D.commercial.intro)}</p>
    <table class="data"><tbody>${commercialRows}</tbody></table>
    <div class="callout">
      <div class="ch">Dealership branding contribution</div>
      ${esc(D.commercial.brandingNote)}
    </div>
    <div class="disclaimer">${esc(D.commercial.disclaimer)}</div>

    <h2><span class="num">4.</span> Fleet partnership and support</h2>
    <p>A fleet works best when the dealership relationship is set up for it. The following are support capabilities
      CMH Westrand proposes to put in place for BCI.</p>
    <div class="scards">${supportCards}</div>
    <div class="callout">
      <div class="ch">What this does and does not promise</div>
      ${esc(D.supportNote)}
    </div>

    <h2><span class="num">5.</span> Fleet options</h2>
    <p>Three broad structures are set out below as starting points for discussion.</p>
    <div class="pricing">${optionCards}</div>
    <p>${esc(D.optionsNote)}</p>

    <h2><span class="num">6.</span> Next steps</h2>
    <p>${esc(D.nextStepsIntro)}</p>
    <p><strong>To prepare an accurate quotation, we would need:</strong></p>
    <ol>${needList}</ol>

    <h2><span class="num">7.</span> About CMH Westrand</h2>
    <div class="callout">${esc(D.about)}</div>

    <h2><span class="num">8.</span> To proceed</h2>
    <p>This proposal is a basis for discussion and is not a binding offer. To take it further, a brief fleet
      discussion is the natural next step — from there, CMH Westrand can prepare a detailed, costed quotation for
      BCI's consideration. The acknowledgement below simply records an intention to proceed to a quotation; it does
      not commit either party to a purchase, a price or a finance agreement.</p>
    <div class="signature-grid">
      <div>
        <div class="signature-box"><div class="label">For CMH Westrand</div></div>
        <div class="sig-sub">${esc(D.preparedBy.name)}, ${esc(D.preparedBy.title)}</div>
        <div class="sig-date">Date: ____________________</div>
      </div>
      <div>
        <div class="signature-box"><div class="label">For BCI Security</div></div>
        <div class="sig-sub">${ce('[Name], [Title]')}</div>
        <div class="sig-date">Date: ____________________</div>
      </div>
    </div>

    <div class="signoff">
      <div class="so">Thank you for considering CMH Westrand as your fleet partner.</div>
      <div class="name">${esc(D.preparedBy.name)}</div>
      <div class="role">${esc(D.preparedBy.title)}, ${esc(D.preparedBy.company)}</div>
      <div class="contact">${esc(D.preparedBy.phone)}</div>
    </div>
  </div>

  <div class="footer">
    <div class="footer-strap">${esc(D.footer.strap)}</div>
    <div>${esc(D.footer.line)}</div>
  </div>
</div>
</body>
</html>`;

// ---- write + render ------------------------------------------------------
const outHtml = join(ROOT, 'output', 'BCI_Security_Fleet_Mobility_Proposal.html');
const outPdf = join(ROOT, 'output', 'BCI_Security_Fleet_Mobility_Proposal.pdf');
writeFileSync(outHtml, html, 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: outPdf, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('Wrote:\n  ' + outHtml + '\n  ' + outPdf);
