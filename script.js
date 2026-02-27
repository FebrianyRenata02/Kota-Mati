// ======================================================
// Helper: Create element with class + attributes
// ======================================================
function el(tag, classNames, attrs = {}) {
    const node = document.createElement(tag);
    if (classNames) node.className = classNames;
    for (const k in attrs) {
        if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
    }
    return node;
}

// ------------------------------------------------------
// ROOT
// ------------------------------------------------------
const root = document.body;
root.classList.add("km-root");

// ======================================================
// NAVBAR
// ======================================================
const navbar = el("header", "navbar");

// LEFT (LOGO)
const navLeft = el("div", "nav-left");
const logoWrap = el("div", "logo-wrap");
const logoImg = el("img", "logo-img", {
    src: "/asset/Kota_Mati-removebg-preview.png",
    alt: "KM"
});
logoWrap.appendChild(logoImg);
navLeft.appendChild(logoWrap);

// CENTER MENU
const navCenter = el("nav", "nav-center");

// MAPPER: Menentukan teks menu dan ID target yang sesuai
const menuMap = {
    "Home": "home-section",
    "About": "about-section",
    "Gallery": "gallery-section",
    "Game": "game-section"
};

for (const txt in menuMap) {
    const targetId = menuMap[txt];

    // Tautan Desktop
    const a = el("a", "nav-link");
    a.href = `#${targetId}`;
    a.textContent = txt;
    navCenter.appendChild(a);
}

// RIGHT (DISCORD ICON + HAMBURGER)
const navRight = el("div", "nav-right");

// Discord Icon (FontAwesome)

const discordBtn = el("a", "discord-btn", {
    // 2. Masukkan link Discord Anda di sini
    href: "https://discord.gg/PDmjcGeHQ9",
    // 3. (Opsional) Tambahkan target="_blank" agar link terbuka di tab baru
    target: "_blank",
    html: '<i class="fa-brands fa-discord"></i>'
});

navRight.appendChild(discordBtn);

// Hamburger Button 
const hamBtn = el("div", "hamburger");
hamBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;
navRight.appendChild(hamBtn);

// MOBILE MENU 
const mobileMenu = el("div", "mobile-menu");

for (const txt in menuMap) {
    const targetId = menuMap[txt];

    // Tautan Mobile
    const link = el("a", "mobile-link");
    link.textContent = txt;
    link.href = `#${targetId}`;
    mobileMenu.appendChild(link);
}


// APPEND NAVBAR
navbar.appendChild(navLeft);
navbar.appendChild(navCenter);
navbar.appendChild(navRight);
navbar.appendChild(mobileMenu);
root.appendChild(navbar);

// Hamburger Toggler dan fungsi menutup menu mobile
function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    hamBtn.classList.remove("open");
}

hamBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamBtn.classList.toggle("open");
});

// Tambahkan event listener untuk menutup menu setelah link mobile diklik
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});


// ======================================================
// HERO SECTION 
// ======================================================
const hero = el("section", "hero", {
    id: "home-section"
});
hero.style.backgroundImage = "url(https://raw.githubusercontent.com/FebrianyRenata02/Kota-Mati/refs/heads/main/asset/Kota_Mati-removebg-preview.png)";

// Logo besar KM
const heroLogoWrap = el("div", "hero-logo-wrap");
const heroLogoImg = el("img", "hero-logo-img", {
    src: "/asset/KM-red-logo.png",
    alt: ""
});

// Teks 'KOTA' dan 'MATI'
const logoTextTop = el("div", "logo-text-top");
logoTextTop.textContent = "";
const logoTextBottom = el("div", "logo-text-bottom");
logoTextBottom.textContent = "";

heroLogoWrap.appendChild(logoTextTop);
heroLogoWrap.appendChild(heroLogoImg);
heroLogoWrap.appendChild(logoTextBottom);

hero.appendChild(heroLogoWrap);

root.appendChild(hero);

// ======================================================
// MAIN CONTENT
// ======================================================
const content = el("main", "content");
root.appendChild(content);

// ======================================================
// ABOUT SECTION 
// ======================================================
const aboutSection = el("section", "section about-section", {
    id: "about-section"
});

const aboutTitle = el("h2", "section-title");
aboutTitle.textContent = "About";

const aboutText = el("p", "section-text");
aboutText.textContent = `An active Indonesian Community Server One place to finding a new friend & Gamming Fun`;

// Tombol Our Team sebagai hyperlink ke halaman baru
const teamBtn = el("a", "btn team-btn", {
    href: "#",
    target: "_blank"
});
teamBtn.textContent = "Our Team";

aboutSection.appendChild(aboutTitle);
aboutSection.appendChild(aboutText);
aboutSection.appendChild(teamBtn);
content.appendChild(aboutSection);

// ======================================================
// SLIDER GENERATOR
// ======================================================
function buildSlider({
    id,
    title,
    images,
    sectionId
}) {
    const sec = el("section", "section slider-section", {
        id: sectionId
    });

    const h = el("h2", "section-title");
    h.textContent = title;
    sec.appendChild(h);

    const sliderOuter = el("div", "slider-outer");

    const leftArrow = el("button", "arrow arrow-left", {
        html: "❮"
    });
    const rightArrow = el("button", "arrow arrow-right", { // Memperbaiki typo
        html: "❯"
    });

    const track = el("div", "slider-track");
    track.id = id;

    // images
    images.forEach(src => {
        const item = el("div", "slide-item");
        const img = el("img", "slide-img", {
            src,
            alt: title
        });
        item.appendChild(img);
        track.appendChild(item);
    });

    sliderOuter.appendChild(leftArrow);
    sliderOuter.appendChild(track);
    sliderOuter.appendChild(rightArrow);
    sec.appendChild(sliderOuter);

    // slider logic
    let currentIndex = 0;

    function update() {
        const item = track.querySelector(".slide-item");
        if (!item) return;

        const style = getComputedStyle(item);
        const itemW = item.getBoundingClientRect().width + parseFloat(style.marginRight);

        track.style.transform = `translateX(${-currentIndex * itemW}px)`;
    }

    leftArrow.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        update();
    });

    rightArrow.addEventListener("click", () => {
        const items = track.querySelectorAll(".slide-item");
        const item = items[0];

        if (!item) return;

        const style = getComputedStyle(item);
        const itemW = item.getBoundingClientRect().width + parseFloat(style.marginRight);

        const visible = Math.floor(track.parentElement.clientWidth / itemW);
        const maxIndex = Math.max(0, items.length - visible);

        currentIndex = Math.min(maxIndex, currentIndex + 1);
        update();
    });

    window.addEventListener("resize", update);
    setTimeout(update, 100);

    return sec;
}

// ======================================================
// GALLERY SLIDER 
// ======================================================
content.appendChild(
    buildSlider({
        id: "gallery-track",
        title: "Galery",
        images: [
            "/asset/LautSenja.jpg",
            "/asset/img1.jpg",
            "/asset/img2.jpg",
            "/asset/sunset.jpg"
        ],
        sectionId: "gallery-section"
    })
);

// ======================================================
// GAME SLIDER 
// ======================================================
content.appendChild(
    buildSlider({
        id: "game-track",
        title: "Game",
        images: [
            "/asset/Roblox.jpg",
            "/asset/ML.jpg",
            "/asset/pubg-169.jpg",
            "/asset/FreeFire.jpg"
        ],
        sectionId: "game-section"
    })
);

// ======================================================
// FOOTER (Hanya Logo yang Scroll ke Atas)
// ======================================================
const footer = el("footer", "site-footer");
const footerInner = el("div", "footer-inner");

// left (Container logo dan nama)
const fLeft = el("div", "footer-left");

// fLogo: Sekarang adalah <a> yang berisi tag <img> di dalamnya
const fLogoLink = el("a", "footer-logo-link", {
    href: "#home-section" // Link untuk scroll ke atas
});
fLogoLink.style.cursor = "pointer";

const fLogoImg = el("img", "footer-logo", { // <img> di dalam <a>
    src: "/asset/Kota_Mati-removebg-preview.png",
    alt: "KM"
});
fLogoLink.appendChild(fLogoImg);

const fName = el("div", "footer-name", {
    html: "<h3>Kota Mati</h3>"
});

// fLeft sekarang berisi fLogoLink (<a>) dan fName
fLeft.appendChild(fLogoLink);
fLeft.appendChild(fName);

// right
const fRight = el("div", "footer-right", {
    html: `
        <h4>Profile Kami</h4>
        <ul class="footer-links">
            <li>Tentang</li>
            <li>Komunitas</li>
        </ul>
    `
});

footerInner.appendChild(fLeft);
footerInner.appendChild(fRight);
footer.appendChild(footerInner);
root.appendChild(footer);

// disable dragging
document.querySelectorAll("a, button").forEach(n =>
    n.setAttribute("draggable", "false")
);
