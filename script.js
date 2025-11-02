/* Shayari + particles + hearts
   NOTE: birthday/ fireworks/ confetti removed as requested.
*/

/* Shayari content - your new poem (line-by-line) */
const shayariLines = [
    "Woh kehti thi bas ek dost ho tum,",
    "aur main har 'hi' ke peeche dil chhupa ke baitha tha.",
    "",
    "Usne pyaar likh diya kisi aur ke chapter mein,",
    "aur main ab tak uss page pe atak ke baitha tha.",
    "",
    "Kabhi kabhi sochta hoon, shayad likha hi aisa tha,",
    "milna zaroori nahi tha, bas mehsoos karwana tha...",
    "",
    "Ab dua yahi hai...woh khush rahe apni kahani mein,",
    "aur main muskurata rahoon,",
    "uski yaadon ke paani mein...."
];

const shayariText = document.getElementById('shayari');
const particlesContainer = document.getElementById('particles');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const likeBtn = document.getElementById('likeBtn');
const likeCountEl = document.getElementById('likeCount');

let index = 0;
let charIndex = 0;

/* Typing effect (lines remain permanently) */
function typeEffect() {
    if (charIndex === 0) {
        const p = document.createElement('p');
        p.className = 'line';
        shayariText.appendChild(p);
    }

    const current = shayariText.lastChild;
    const char = shayariLines[index].charAt(charIndex);

    if (charIndex < shayariLines[index].length) {
        current.innerHTML += (char === '\n' ? '<br>' : char);
        charIndex++;
        setTimeout(typeEffect, 90);
    } else {
        index++;
        charIndex = 0;
        if (index < shayariLines.length) {
            setTimeout(typeEffect, 900);
        } else {
            addSignatureAndParticles();
        }
    }
}

/* Add signature + start ambient particles (no fade, no birthday) */
function addSignatureAndParticles() {
    const sign = document.createElement('p');
    sign.className = 'signature';
    sign.innerHTML = '~ CHOUDHURY SHUBHAM';
    shayariText.appendChild(sign);

    // ✅ Add pulsing hearts below signature
    const hearts = document.createElement('div');
    hearts.className = 'pulse-hearts';
    hearts.innerHTML = '<span>❤️</span><span>❤️</span><span>❤️</span>';
    shayariText.appendChild(hearts);

    createParticleCombo(); // ambient lights/hearts/sparks
}

/* ------------------------
   Particle combo (lights + hearts + sparkles)
   ------------------------ */
function createParticleCombo() {
    const container = particlesContainer;

    // soft bokeh lights (purple-blue mix)
    for (let i = 0; i < 18; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const hue = 230 + Math.floor(Math.random() * 80);
        p.style.background = `radial-gradient(circle at 30% 30%, rgba(${hslToRgb(hue,80,65).join(',')},0.9), rgba(120,60,200,0.12))`;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.width = 6 + Math.random() * 18 + 'px';
        p.style.height = p.style.width;
        p.style.animation = (6 + Math.random() * 8) + 's linear infinite';
        p.style.animationName = Math.random() < 0.5 ? 'floatUpSlow' : (Math.random() < 0.5 ? 'floatUpMed' : 'floatUpFast');
        p.style.opacity = 0.6 + Math.random() * 0.4;
        container.appendChild(p);
        // keep for long time (ambient)
        setTimeout(() => p.remove(), 300000);
    }

    // hearts floating
    for (let i = 0; i < 8; i++) {
        const h = document.createElement('div');
        h.className = 'p-heart';
        h.innerHTML = '💜';
        h.style.left = Math.random() * 100 + 'vw';
        h.style.top = Math.random() * 100 + 'vh';
        h.style.animation = (7 + Math.random() * 8) + 's linear infinite';
        h.style.animationName = Math.random() < 0.5 ? 'floatUpSlow' : 'floatUpMed';
        h.style.opacity = 0.6 + Math.random() * 0.4;
        h.style.fontSize = 14 + Math.random() * 14 + 'px';
        container.appendChild(h);
        setTimeout(() => h.remove(), 300000);
    }

    // tiny sparkles
    for (let i = 0; i < 30; i++) {
        const s = document.createElement('div');
        s.className = 'spark';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = Math.random() * 100 + 'vh';
        s.style.background = `hsl(${240 + Math.random() * 60}, 90%, ${65 + Math.random() * 10}%)`;
        s.style.width = 3 + Math.random() * 6 + 'px';
        s.style.height = s.style.width;
        s.style.animation = (4 + Math.random() * 6) + 's linear infinite';
        s.style.animationName = Math.random() < 0.5 ? 'floatUpFast' : 'floatUpMed';
        s.style.opacity = 0.7;
        container.appendChild(s);
        setTimeout(() => s.remove(), 300000);
    }
}

/* small helper: convert HSL -> RGB (returns [r,g,b]) */
function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

/* ------------------------
   UI controls: music + like
   ------------------------ */
let likeCount = 0;
if (likeBtn && likeCountEl) {
    likeBtn.addEventListener('click', () => {
        likeCount++;
        likeCountEl.textContent = likeCount;
    });
}
if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicBtn.innerText = '⏸️ Pause Music';
            }).catch(()=>{ /* autoplay blocked */ });
        } else {
            bgMusic.pause();
            musicBtn.innerText = '🎵 Play Music';
        }
    });
}

/* ------------------------
   Start typing + ambient particles
   ------------------------ */
typeEffect();

/* start background audio settings (no autoplay) */
bgMusic.volume = 0.85;
bgMusic.loop = true;
bgMusic.preload = 'auto';

/* Add a few subtle floating hearts to keep romance alive */
for (let i = 0; i < 6; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (10 + Math.random() * 10) + 's';
    h.innerHTML = '💙';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 260000);
}
