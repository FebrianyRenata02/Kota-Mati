// our-team-init.js
// -- Mengosongkan HTML, lalu membangun seluruh komponen Our Team via JS (CSS + DOM).
// -- Pastikan file ini dijalankan setelah page load (mis. include di akhir body),
//    atau bungkus dalam DOMContentLoaded listener.

(function initOurTeam() {
    // kosongkan seluruh body HTML
    document.documentElement.lang = document.documentElement.lang || 'id';
    document.title = 'Our Team';

    // clear body
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '16px 12px 60px';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.background = 'linear-gradient(180deg,#0b0b0b 0%, #181818 100%)';
    document.body.style.fontFamily = 'Georgia, serif';
    document.body.style.color = '#f5f5f5';

    // create root container
    const root = document.createElement('div');
    root.id = 'our-team-root';
    root.className = 'our-team';
    root.style.width = '100%';
    root.style.maxWidth = '420px';
    root.style.boxSizing = 'border-box';
    document.body.appendChild(root);

    // inject CSS via JS so HTML can truly be "kosong"
    const css = `
    :root{
      --bg:#0f0f10;
      --panel:#0b0b0b;
      --accent:#b71c1c;
      --text:#f5f5f5;
    }
    .ot-hero{
      height:160px;
      background-image: url('/mnt/data/Screen Shot 2025-11-20 at 17.16.45.png');
      background-position:center;
      background-size:cover;
      position:relative;
      box-shadow: inset 0 -40px 40px rgba(0,0,0,0.6);
    }
    .ot-nav{
      height:44px;
      display:flex;
      align-items:center;
      gap:12px;
      padding:4px 10px;
      background:linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.6));
      position:relative;
      z-index:5;
    }
    .ot-logo{ color:var(--accent); font-weight:700; font-size:18px; margin-right:auto; padding-left:6px; }
    .chevron-wrap{ background:#0b0b0b; padding:18px 0 0 0; position:relative; }
    .chev-svg{ width:100%; height:720px; display:block; background:transparent; }
    .chev-text{ position:absolute; left:0; right:0; text-align:center; pointer-events:none; }
    .chev-text .title{ font-weight:700; font-size:20px; margin-top:26px; }
    .chev-text .role{ font-weight:700; font-size:18px; }
    .chev-text .side{ position:absolute; width:30%; transform:translateY(-6px); font-weight:700; font-size:16px; }
    .side.left{ left:6px; text-align:left; }
    .side.right{ right:6px; text-align:right; }
    .ot-footer{ margin-top:18px; padding:22px 16px; background:linear-gradient(180deg,#111 0%, #141414 100%); color:#ddd; display:flex; gap:12px; align-items:flex-start; font-size:13px; }
    .ot-footer .logo-small{ color:var(--accent); font-weight:700; margin-right:8px; }
    @media (min-width:520px){
      .chev-svg{ height:860px; }
      .ot-hero{ height:220px; }
    }
  `;
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // function to build the component
    function createOurTeam(container) {
        // top hero and nav
        const hero = document.createElement('div');
        hero.className = 'ot-hero';

        const nav = document.createElement('div');
        nav.className = 'ot-nav';
        const logo = document.createElement('div');
        logo.className = 'ot-logo';
        logo.textContent = 'KM';
        nav.appendChild(logo);
        hero.appendChild(nav);
        container.appendChild(hero);

        // chevron wrap and svg
        const wrap = document.createElement('div');
        wrap.className = 'chevron-wrap';
        wrap.style.position = 'relative';
        container.appendChild(wrap);

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 420 720');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.classList.add('chev-svg');

        // styles inside svg
        const defs = document.createElementNS(svgNS, 'defs');
        const styleNode = document.createElementNS(svgNS, 'style');
        styleNode.textContent = `.chev { fill: none; stroke: ${getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#b71c1c'}; stroke-width:3; stroke-linejoin:round; }`;
        defs.appendChild(styleNode);
        svg.appendChild(defs);

        function p(points) {
            const el = document.createElementNS(svgNS, 'polyline');
            el.setAttribute('points', points);
            el.setAttribute('class', 'chev');
            el.setAttribute('fill', 'none');
            return el;
        }
        const top = document.createElementNS(svgNS, 'polygon');
        top.setAttribute('points', '10,30 210,120 410,30');
        top.setAttribute('class', 'chev');
        top.setAttribute('fill', 'none');
        svg.appendChild(top);
        svg.appendChild(p('130,120 130,600'));
        svg.appendChild(p('290,120 290,600'));
        svg.appendChild(p('10,220 210,300 410,220'));
        svg.appendChild(p('10,370 210,450 410,370'));
        svg.appendChild(p('10,520 210,620 410,520'));
        svg.appendChild(p('210,120 210,300'));
        svg.appendChild(p('210,300 210,450'));
        svg.appendChild(p('210,450 210,620'));

        wrap.appendChild(svg);

        // text overlay
        const overlay = document.createElement('div');
        overlay.className = 'chev-text';
        overlay.style.top = '0';
        overlay.style.height = '720px';

        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = 'Our Team';
        title.style.marginTop = '46px';
        overlay.appendChild(title);

        const roleUL = (txt, topPx, side) => {
            const d = document.createElement('div');
            d.className = 'side ' + side;
            d.style.top = topPx + 'px';
            d.textContent = txt;
            overlay.appendChild(d);
        };

        roleUL('Chief', 170, 'left');
        roleUL('Staff', 170, 'right');

        const center1 = document.createElement('div');
        center1.className = 'role';
        center1.style.marginTop = '220px';
        center1.textContent = 'Enginner';
        overlay.appendChild(center1);

        roleUL('Designer', 320, 'left');
        const ev = document.createElement('div');
        ev.className = 'side right';
        ev.style.top = '320px';
        ev.style.whiteSpace = 'pre';
        ev.textContent = 'Event\nOrganizer';
        overlay.appendChild(ev);

        const center2 = document.createElement('div');
        center2.className = 'role';
        center2.style.marginTop = '360px';
        center2.textContent = 'Partnership';
        overlay.appendChild(center2);

        wrap.appendChild(overlay);

        // footer
        const footer = document.createElement('div');
        footer.className = 'ot-footer';
        footer.innerHTML = '<div class="logo-small">KM</div><div><strong>Kota Mati</strong><div style="opacity:.8;font-size:12px;margin-top:6px">Profile Kami<br/>Tentang<br/>Komunitas</div></div>';
        container.appendChild(footer);
    }

    // build UI
    createOurTeam(root);

})();