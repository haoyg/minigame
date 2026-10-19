const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_PATH = path.join(ROOT_DIR, "data", "pokemon-30th-anniversary-2026.json");
const OUTPUT_PATH = path.join(ROOT_DIR, "pokemon-30th-anniversary-2026.html");
const CANONICAL = "https://pokopia.cloud/pokemon-30th-anniversary-2026";
const TITLE = "Pokémon 30th Anniversary 2026: December Releases, Art Books & Where to Buy";
const DESCRIPTION = "Explore Pokémon's 30th anniversary December 2026 releases, including art books, TCG collectibles, release dates, prices, official purchase links and updates.";

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function statusLabel(status) {
  return {
    confirmed: "Confirmed",
    official_window: "Official release window",
    month_confirmed_day_pending: "Month confirmed; day pending",
    unconfirmed_due_to_source_conflict: "Date not confirmed"
  }[status] || "Awaiting confirmation";
}

function priceLabel(product) {
  if (product.price == null) return "Not Yet Confirmed";
  if (product.currency === "JPY") return `¥${Number(product.price).toLocaleString("en-US")}${product.id === "visual-art-books" ? " per volume" : ""}`;
  return `${product.currency} ${product.price}`;
}

function renderTimeline(products) {
  return products.map((product) => `
        <article class="timeline-item" id="${esc(product.id)}">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-card">
            <div class="timeline-topline">
              <time datetime="${esc(product.releaseDate)}">${esc(product.releaseDateLabel)}</time>
              <span class="status status-${esc(product.releaseDateStatus)}">${esc(statusLabel(product.releaseDateStatus))}</span>
            </div>
            <h3>${esc(product.name)}</h3>
            <p>${esc(product.category)}</p>
          </div>
        </article>`).join("");
}

function renderProducts(products) {
  return products.map((product) => `
        <article class="product-card">
          <div class="product-heading">
            <div>
              <span class="eyebrow">${esc(product.category)}</span>
              <h3>${esc(product.name)}</h3>
            </div>
            <span class="status status-${esc(product.releaseDateStatus)}">${esc(statusLabel(product.releaseDateStatus))}</span>
          </div>
          <p class="product-summary">${esc(product.summary)}</p>
          <dl class="facts">
            <div><dt>Release Date</dt><dd>${esc(product.releaseDateLabel)}</dd></div>
            <div><dt>Price</dt><dd>${esc(priceLabel(product))}</dd></div>
            <div><dt>Available Regions</dt><dd>${esc(product.region)}</dd></div>
            <div><dt>Contents</dt><dd>${esc(product.contents)}</dd></div>
            <div><dt>Last Verified</dt><dd>${esc(product.lastVerified)}</dd></div>
          </dl>
          <div class="product-actions">
            <a class="source-link" href="${esc(product.officialSourceUrl)}" target="_blank" rel="noopener noreferrer">Official Source</a>
            ${product.purchaseUrl ? `<a class="buy-link" href="${esc(product.purchaseUrl)}" target="_blank" rel="noopener noreferrer">Where to Buy</a>` : `<span class="buy-pending">Where to Buy: Not Yet Confirmed</span>`}
          </div>
        </article>`).join("");
}

function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const products = data.products;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Pokémon 30th Anniversary 2026: December Release Guide",
      "description": DESCRIPTION,
      "datePublished": "2026-10-19",
      "dateModified": data.lastUpdated,
      "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
      "author": { "@type": "Organization", "name": "Pokopia", "url": "https://pokopia.cloud/" },
      "publisher": { "@type": "Organization", "name": "Pokopia", "url": "https://pokopia.cloud/" }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pokopia.cloud/" },
        { "@type": "ListItem", "position": 2, "name": "Pokémon 30th Anniversary 2026", "item": CANONICAL }
      ]
    }
  ];

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(TITLE)}</title>
  <meta name="description" content="${esc(DESCRIPTION)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <link rel="canonical" href="${CANONICAL}" />
  <link rel="icon" type="image/png" href="/assets/pokopie-logo.png" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${CANONICAL}" />
  <meta property="og:title" content="${esc(TITLE)}" />
  <meta property="og:description" content="${esc(DESCRIPTION)}" />
  <meta property="og:site_name" content="Pokopia" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${esc(TITLE)}" />
  <meta name="twitter:description" content="${esc(DESCRIPTION)}" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3274781156049995" crossorigin="anonymous"></script>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <style>
    :root { --navy:#10213e; --ink:#14213d; --muted:#58677d; --line:#dfe5ec; --surface:#fff; --page:#f7f8fa; --green:#16a864; --red:#ef4444; --yellow:#f4c542; }
    * { box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { margin:0; background:var(--page); color:var(--ink); font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; line-height:1.65; }
    a { color:inherit; }
    .site-header { background:var(--navy); color:#fff; }
    .nav { max-width:1320px; min-height:72px; margin:0 auto; padding:0 22px; display:flex; align-items:center; justify-content:space-between; gap:18px; }
    .brand { position:relative; display:block; width:142px; height:64px; overflow:hidden; flex:0 0 auto; }
    .brand img { position:absolute; top:-23.5px; left:-32.7px; width:202.5px; height:135px; max-width:none; }
    .nav-links { display:flex; align-items:center; gap:8px; }
    .nav-link { padding:8px 12px; border:1px solid rgba(255,255,255,.25); border-radius:8px; color:#fff; font-size:13px; font-weight:700; text-decoration:none; }
    .nav-link:hover { background:rgba(255,255,255,.08); }
    .page { max-width:1180px; margin:0 auto; padding:24px 22px 72px; }
    .hero { position:relative; overflow:hidden; min-height:400px; display:grid; align-content:center; padding:58px; border-radius:8px; background:#fff; border:1px solid var(--line); box-shadow:0 10px 30px rgba(15,31,55,.07); }
    .hero::before { content:""; position:absolute; width:360px; height:360px; right:-80px; top:-90px; border:48px solid var(--yellow); border-radius:50%; opacity:.88; }
    .hero::after { content:"30"; position:absolute; right:54px; top:45px; color:var(--navy); font-size:132px; line-height:1; font-weight:900; opacity:.12; }
    .hero-kicker { position:relative; z-index:1; margin:0 0 8px; color:var(--green); font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:.08em; }
    .hero h1 { position:relative; z-index:1; max-width:760px; margin:0; font-size:clamp(36px,6vw,64px); line-height:1.03; letter-spacing:0; }
    .hero-copy { position:relative; z-index:1; max-width:700px; margin:20px 0 0; color:var(--muted); font-size:18px; }
    .hero-meta { position:relative; z-index:1; display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin-top:26px; }
    .updated { color:var(--muted); font-size:13px; }
    .jump { display:inline-flex; padding:10px 15px; border-radius:8px; background:var(--green); color:#fff; font-size:13px; font-weight:800; text-decoration:none; }
    .verification-note { margin:20px 0 0; padding:14px 16px; border-left:4px solid var(--yellow); background:#fff9dc; color:#54451a; font-size:14px; }
    section { margin-top:56px; scroll-margin-top:22px; }
    .section-heading { display:flex; align-items:end; justify-content:space-between; gap:20px; margin-bottom:20px; }
    h2 { margin:0; font-size:30px; line-height:1.2; }
    .section-intro { max-width:680px; margin:8px 0 0; color:var(--muted); }
    .timeline { position:relative; display:grid; gap:16px; padding-left:30px; }
    .timeline::before { content:""; position:absolute; left:8px; top:10px; bottom:10px; width:2px; background:#cfd8e3; }
    .timeline-item { position:relative; }
    .timeline-marker { position:absolute; left:-29px; top:27px; width:16px; height:16px; border:4px solid var(--green); border-radius:50%; background:#fff; }
    .timeline-card,.product-card,.buy-card,.faq-item { background:var(--surface); border:1px solid var(--line); border-radius:8px; box-shadow:0 5px 18px rgba(15,31,55,.05); }
    .timeline-card { padding:20px 22px; }
    .timeline-topline,.product-heading { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
    .timeline-card time { font-size:13px; color:var(--green); font-weight:800; }
    .timeline-card h3 { margin:5px 0 1px; font-size:19px; }
    .timeline-card p { margin:0; color:var(--muted); font-size:13px; }
    .status { display:inline-flex; max-width:220px; padding:5px 8px; border-radius:6px; background:#e9f7f0; color:#0b7041; font-size:11px; line-height:1.35; font-weight:800; text-align:center; }
    .status-unconfirmed_due_to_source_conflict { background:#fff0ef; color:#a52b24; }
    .status-month_confirmed_day_pending { background:#fff8d9; color:#725a00; }
    .products { display:grid; gap:18px; }
    .product-card { padding:24px; }
    .eyebrow { color:var(--green); font-size:12px; font-weight:800; text-transform:uppercase; }
    .product-card h3 { margin:3px 0 0; font-size:22px; }
    .product-summary { margin:15px 0; color:var(--muted); }
    .facts { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); margin:0; border:1px solid var(--line); border-radius:8px; overflow:hidden; }
    .facts div { padding:13px 15px; border-bottom:1px solid var(--line); }
    .facts div:nth-child(odd) { border-right:1px solid var(--line); }
    .facts div:nth-last-child(-n+2) { border-bottom:0; }
    .facts dt { color:var(--muted); font-size:11px; font-weight:700; text-transform:uppercase; }
    .facts dd { margin:3px 0 0; font-size:14px; font-weight:700; }
    .product-actions { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-top:16px; }
    .source-link,.buy-link { display:inline-flex; padding:9px 12px; border-radius:7px; font-size:12px; font-weight:800; text-decoration:none; }
    .source-link { border:1px solid #bdc8d6; background:#fff; }
    .buy-link { background:var(--green); color:#fff; }
    .buy-pending { color:var(--muted); font-size:12px; font-weight:700; }
    .buy-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:16px; }
    .buy-card { padding:20px; }
    .buy-card h3 { margin:0 0 7px; font-size:17px; }
    .buy-card p { margin:0; color:var(--muted); font-size:14px; }
    .buy-card a { display:inline-block; margin-top:12px; color:#0b7041; font-size:13px; font-weight:800; }
    .shipping-note { margin-top:16px; padding:18px; border-radius:8px; background:var(--navy); color:#dbe5f2; font-size:14px; }
    .faq { display:grid; gap:10px; }
    .faq-item { padding:18px 20px; }
    .faq-item h3 { margin:0 0 6px; font-size:16px; }
    .faq-item p { margin:0; color:var(--muted); font-size:14px; }
    .sources { padding:22px; border-radius:8px; background:#eef2f7; }
    .sources ul { margin:12px 0 0; padding-left:20px; }
    .sources a { color:#0b7041; overflow-wrap:anywhere; }
    .editorial-note { color:var(--muted); font-size:13px; }
    footer { margin-top:56px; padding-top:22px; border-top:1px solid var(--line); color:var(--muted); font-size:12px; }
    @media (max-width:760px) {
      .nav { padding-inline:14px; }
      .brand { width:126px; height:58px; }
      .nav-link.secondary { display:none; }
      .page { padding:16px 14px 52px; }
      .hero { min-height:440px; padding:34px 24px; align-content:end; }
      .hero::before { width:250px; height:250px; right:-72px; top:-72px; border-width:34px; }
      .hero::after { right:18px; top:30px; font-size:92px; }
      .hero h1 { font-size:38px; }
      .hero-copy { font-size:16px; }
      section { margin-top:42px; }
      h2 { font-size:25px; }
      .timeline-topline,.product-heading { align-items:flex-start; flex-direction:column; }
      .facts,.buy-grid { grid-template-columns:1fr; }
      .facts div,.facts div:nth-child(odd) { border-right:0; border-bottom:1px solid var(--line); }
      .facts div:last-child { border-bottom:0; }
    }
    @media (prefers-reduced-motion:reduce) { html { scroll-behavior:auto; } }
  </style>
</head>
<body>
  <header class="site-header">
    <nav class="nav" aria-label="Primary navigation">
      <a class="brand" href="/" aria-label="Pokopia home"><img src="/assets/pokopie-logo.png" alt="" width="1536" height="1024" /></a>
      <div class="nav-links"><a class="nav-link secondary" href="/">All Games</a><a class="nav-link" href="#release-timeline">Release Timeline</a></div>
    </nav>
  </header>
  <main class="page">
    <article>
      <header class="hero">
        <p class="hero-kicker">Pokémon 30th Anniversary 2026</p>
        <h1>Pokémon 30th Anniversary 2026: December Release Guide</h1>
        <p class="hero-copy">A source-checked guide to announced December releases, with confirmed dates, Japan-only availability notes, official links and clearly marked information that still needs confirmation.</p>
        <div class="hero-meta"><a class="jump" href="#release-timeline">View the December timeline</a><span class="updated">Last updated: ${esc(data.lastUpdated)}</span></div>
      </header>

      <p class="verification-note"><strong>Verification policy:</strong> A date is marked confirmed only when the linked official source supports it. Retailer rumors, marketplace listings and unverified preorder pages are not treated as confirmation.</p>

      <section id="release-timeline" aria-labelledby="timeline-title">
        <div class="section-heading"><div><h2 id="timeline-title">December 2026 Release Timeline</h2><p class="section-intro">Dates and release windows below reflect official pages checked on ${esc(data.lastUpdated)}. Status labels explain where a day or market remains uncertain.</p></div></div>
        <div class="timeline">${renderTimeline(products)}</div>
      </section>

      <section aria-labelledby="details-title">
        <div class="section-heading"><div><h2 id="details-title">Product Details</h2><p class="section-intro">Each entry separates confirmed product facts from availability that has not yet been announced.</p></div></div>
        <div class="products">${renderProducts(products)}</div>
      </section>

      <section aria-labelledby="buy-title">
        <div class="section-heading"><div><h2 id="buy-title">Where to Buy</h2><p class="section-intro">Use official product and storefront pages first. Exact stock, preorder access and international delivery can change by country.</p></div></div>
        <div class="buy-grid">
          <article class="buy-card"><h3>Pokémon Center</h3><p>Official regional storefront for Pokémon products. The Binder Collection does not yet have a verified purchase listing in this guide.</p><a href="https://www.pokemoncenter.com/" target="_blank" rel="noopener noreferrer">Visit Pokémon Center</a></article>
          <article class="buy-card"><h3>Pokémon Center Japan</h3><p>Official Japanese storefront. Products and shipping are intended primarily for the Japanese market.</p><a href="https://www.pokemoncenter-online.com/" target="_blank" rel="noopener noreferrer">Visit Pokémon Center Online Japan</a></article>
          <article class="buy-card"><h3>Overlap</h3><p>The official publisher page confirms the three art-book editions, price per volume and release date.</p><a href="https://over-lap.co.jp/book/30th-book/Default.aspx" target="_blank" rel="noopener noreferrer">Open the publisher page</a></article>
          <article class="buy-card"><h3>Takara Tomy and Bandai Candy</h3><p>Official Japanese product pages are the primary references for Moncolle and Pokémon Kids release information.</p><a href="https://www.takaratomy.co.jp/products/pokemon/" target="_blank" rel="noopener noreferrer">Takara Tomy</a> · <a href="https://www.bandai.co.jp/candy/brand/brand88/index.html" target="_blank" rel="noopener noreferrer">Bandai Candy</a></article>
        </div>
        <p class="shipping-note"><strong>International shipping:</strong> A Japanese product page does not mean worldwide availability. Pokémon Center Japan, Japanese publishers and domestic retailers may restrict delivery to Japan. International buyers should check the seller's current shipping policy, language edition and import charges before ordering.</p>
      </section>

      <section aria-labelledby="faq-title">
        <div class="section-heading"><div><h2 id="faq-title">Frequently Asked Questions</h2></div></div>
        <div class="faq">
          <article class="faq-item"><h3>What is Pokémon's 30th anniversary?</h3><p>It marks 30 years since Pokémon Red and Pokémon Green were released in Japan on February 27, 1996. The official Pokémon anniversary site identifies February 27, 2026 as the 30th anniversary.</p></article>
          <article class="faq-item"><h3>What Pokémon products are releasing in December 2026?</h3><p>Official sources support a December 18 release for three Pokémon visual art books, an early-December window for a Moncolle Paldea Legendary Set, and a December month window for Pokémon Kids anniversary products. The Binder Collection's December 4 date remains unconfirmed here because its official product page currently shows a different launch month.</p></article>
          <article class="faq-item"><h3>When will the Pokémon 30th anniversary art books be released?</h3><p>Overlap lists all three volumes for simultaneous release in Japan on December 18, 2026.</p></article>
          <article class="faq-item"><h3>How much do the anniversary art books cost?</h3><p>The official publisher lists each volume at ¥5,500 including tax. They are sold as three separate books, not as one ¥5,500 set.</p></article>
          <article class="faq-item"><h3>Are the books available in English?</h3><p>No English-language edition has been announced on the official publisher page checked for this guide. The confirmed editions are Japanese publications.</p></article>
          <article class="faq-item"><h3>Where can international fans buy them?</h3><p>No worldwide official purchase route is confirmed. International fans should check the publisher's linked retailers and verify whether a retailer ships to their country; Japanese availability should not be assumed to include international delivery.</p></article>
          <article class="faq-item"><h3>Are the products limited edition?</h3><p>The official pages reviewed here do not consistently label every listed product as limited edition. Availability may still be constrained, but this guide does not claim limited status without a product-specific official statement.</p></article>
          <article class="faq-item"><h3>Will more anniversary products be announced?</h3><p>More announcements are possible, but no complete future schedule is guaranteed. This page will add products only after an official product page or manufacturer announcement can be verified.</p></article>
        </div>
      </section>

      <section class="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">Official Sources</h2>
        <ul>
          <li><a href="https://www.pokemon.co.jp/30th/" target="_blank" rel="noopener noreferrer">The Pokémon Company: 30th Anniversary official site</a></li>
          <li><a href="https://www.pokemon.com/uk/pokemon-tcg/product-gallery/30th-celebration-binder-collection" target="_blank" rel="noopener noreferrer">Pokémon TCG: 30th Celebration Binder Collection product page</a></li>
          <li><a href="https://www.takaratomy.co.jp/products/pokemon/moncolle_ex/lineup/pokemon_30th/009_densetsu.html" target="_blank" rel="noopener noreferrer">Takara Tomy: Moncolle Paldea Legendary Set</a></li>
          <li><a href="https://over-lap.co.jp/book/30th-book/Default.aspx" target="_blank" rel="noopener noreferrer">Overlap: Pokémon 30th anniversary visual art books</a></li>
          <li><a href="https://www.bandai.co.jp/candy/brand/brand88/index.html" target="_blank" rel="noopener noreferrer">Bandai Candy: Pokémon Kids product series</a></li>
        </ul>
        <p class="editorial-note">Pokopia is an independent games website and is not affiliated with Nintendo, The Pokémon Company, Game Freak, Creatures, Takara Tomy, Bandai or Overlap. Pokémon and related names are trademarks of their respective owners.</p>
      </section>
    </article>
    <footer><a href="/">Pokopia</a> · Free browser games · Editorial information is updated when official sources change.</footer>
  </main>
</body>
</html>`;

  fs.writeFileSync(OUTPUT_PATH, html, "utf8");
  console.log(`Generated ${path.basename(OUTPUT_PATH)} from ${path.relative(ROOT_DIR, DATA_PATH)}`);
}

main();
