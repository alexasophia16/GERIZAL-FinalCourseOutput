/*
  One look per character. Options:
    bg, skin, hair  colours
    hs              hairstyle: part | short | bun | wild | tonsure | thin | curly | bald | pulled
    outfit          coat | baro | habit | camisa | rags | sacristan | uniform | gown | robe | dark
    mouth           smile | frown | flat | thin | lips
    brow            angry | sad | flat
    hat             salakot | kepi
    rx              face width (default 17)
    child           scale factor for younger characters
    stache, beard   colour of facial hair
    lash, blush, rouge, tears, glasses, cross, pearls, cigar   set to 1 to add
*/
const LOOKS = {
  "Crisóstomo Ibarra": { bg: "#9fc2b0", skin: "#d6a57c", hair: "#1e1a17", hs: "part",    outfit: "coat",      mouth: "smile" },
  "María Clara":       { bg: "#e8c7c8", skin: "#e3b892", hair: "#1c1714", hs: "bun",     outfit: "baro",      mouth: "smile", lash: 1, blush: 1 },
  "Padre Dámaso":      { bg: "#d9b48a", skin: "#e8b49a", hair: "#6a5e55", hs: "tonsure", outfit: "habit",     mouth: "frown", brow: "angry", rx: 20, blush: 1, cross: 1 },
  "Elías":             { bg: "#8fb3c9", skin: "#a86f45", hair: "#191512", hs: "short",   outfit: "camisa",    mouth: "flat",  hat: "salakot", brow: "flat" },
  "Sisa":              { bg: "#b8b0a0", skin: "#b98257", hair: "#2a2420", hs: "wild",    outfit: "rags",      mouth: "frown", tears: 1, brow: "sad" },
  "Basilio":           { bg: "#c9d6a8", skin: "#b07a50", hair: "#1d1916", hs: "short",   outfit: "sacristan", mouth: "flat",  child: 0.9 },
  "Crispín":           { bg: "#e3cf9a", skin: "#b47d52", hair: "#1d1916", hs: "short",   outfit: "sacristan", mouth: "frown", child: 0.8, brow: "sad" },
  "Padre Salvi":       { bg: "#b9a9c9", skin: "#ecc8b0", hair: "#3b302a", hs: "tonsure", outfit: "habit",     mouth: "thin",  rx: 14, brow: "flat", cross: 1 },
  "Kapitan Tiago":     { bg: "#e6d39a", skin: "#d2a07a", hair: "#2b2420", hs: "thin",    outfit: "coat",      mouth: "smile", rx: 21, stache: "#2b2420", blush: 1 },
  "Doña Victorina":    { bg: "#d7a9d0", skin: "#f1dacb", hair: "#3a2a20", hs: "curly",   outfit: "gown",      mouth: "lips",  rouge: 1, lash: 1, pearls: 1 },
  "Pilosopo Tasio":    { bg: "#a9b9a2", skin: "#c08c64", hair: "#eeeae0", hs: "bald",    outfit: "robe",      mouth: "flat",  beard: "#eeeae0", glasses: 1 },
  "Tenyente Guevara":  { bg: "#a3b3c9", skin: "#e2b496", hair: "#8b8478", hs: "short",   outfit: "uniform",   mouth: "flat",  hat: "kepi", stache: "#8b8478" },
  "Doña Consolación":  { bg: "#c9a3a0", skin: "#d4a684", hair: "#221c18", hs: "pulled",  outfit: "dark",      mouth: "frown", brow: "angry", cigar: 1 },
};

/* ---------- Clothes ---------- */
const SHOULDERS = "M14 100 Q16 72 50 68 Q84 72 86 100Z";
const SHOULDERS_WIDE = "M12 100 Q14 72 50 68 Q86 72 88 100Z";

const OUTFITS = {
  coat:
    `<path d="${SHOULDERS}" fill="#22303f"/>` +
    `<path d="M42 69 L50 88 L58 69Z" fill="#f4f1ea"/>` +
    `<path d="M45 72 L50 76 L55 72 L55 77 L50 74 L45 77Z" fill="#111"/>`,
  baro:
    `<path d="${SHOULDERS}" fill="#f7efe0" opacity=".95"/>` +
    `<path d="M26 76 L50 96 L74 76 Q50 84 26 76Z" fill="#d9b98f"/>` +
    `<path d="M34 80 L50 92 L66 80" fill="none" stroke="#b08b5c" stroke-width="1" stroke-dasharray="2 2"/>`,
  habit:
    `<path d="${SHOULDERS_WIDE}" fill="#6b4a2f"/>` +
    `<path d="M30 72 Q50 86 70 72 L68 68 Q50 78 32 68Z" fill="#553a24"/>`,
  camisa:
    `<path d="${SHOULDERS}" fill="#ece5d3"/>` +
    `<path d="M50 72 L50 100" stroke="#c9bfa6" stroke-width="1.2"/>`,
  rags:
    `<path d="${SHOULDERS}" fill="#8a7f6a"/>` +
    `<rect x="60" y="84" width="11" height="9" fill="#6f6553" transform="rotate(-8 65 88)"/>` +
    `<path d="M28 90 l6 4 M33 86 l5 5" stroke="#5f5646" stroke-width="1"/>`,
  sacristan:
    `<path d="${SHOULDERS}" fill="#9e2b25"/>` +
    `<path d="M22 100 Q24 82 50 78 Q76 82 78 100Z" fill="#f4f1ea"/>` +
    `<path d="M40 70 Q50 76 60 70 L58 68 Q50 72 42 68Z" fill="#f4f1ea"/>`,
  uniform:
    `<path d="${SHOULDERS_WIDE}" fill="#2c3e5a"/>` +
    `<rect x="18" y="72" width="16" height="5" rx="2" fill="#d9a441"/>` +
    `<rect x="66" y="72" width="16" height="5" rx="2" fill="#d9a441"/>` +
    `<circle cx="50" cy="82" r="1.6" fill="#d9a441"/>` +
    `<circle cx="50" cy="90" r="1.6" fill="#d9a441"/>` +
    `<circle cx="50" cy="98" r="1.6" fill="#d9a441"/>` +
    `<path d="M42 68 L58 68 L58 74 L42 74Z" fill="#22324a"/>`,
  gown:
    `<path d="${SHOULDERS}" fill="#7d3c98"/>` +
    `<path d="M24 78 Q30 74 36 78 Q42 74 48 78 Q54 74 60 78 Q66 74 72 78 Q78 74 80 80" fill="none" stroke="#c99adf" stroke-width="2"/>`,
  robe:
    `<path d="${SHOULDERS}" fill="#6f6c61"/>` +
    `<path d="M50 70 L46 100 M50 70 L54 100" stroke="#57554c" stroke-width="1.4"/>`,
  dark:
    `<path d="${SHOULDERS}" fill="#3a3436"/>` +
    `<path d="M20 82 Q50 96 80 82 L80 88 Q50 102 20 88Z" fill="#5e4c50"/>`,
};

/* ---------- Face parts ---------- */
const BROWS = {
  angry: "M39 38 L46 41 M61 38 L54 41",
  sad:   "M39 41 L46 39 M61 41 L54 39",
  flat:  "M39 40 L46 40 M54 40 L61 40",
};

const MOUTHS = {
  smile: "M45 56 Q50 60 55 56",
  frown: "M45 58 Q50 55 55 58",
  flat:  "M46 57 L54 57",
  thin:  "M47 57 L53 57",
};

const EYES =
  `<circle cx="43" cy="45" r="1.9" fill="#1b1512"/>` +
  `<circle cx="57" cy="45" r="1.9" fill="#1b1512"/>`;

const NOSE = `<path d="M50 46 Q48 51 50 52" fill="none" stroke="#7a4f36" stroke-width="1" opacity=".6"/>`;

const LIPS = `<path d="M45 56 Q50 54 55 56 Q50 60 45 56Z" fill="#c0263c"/>`;

// Optional extras, switched on by setting the flag to 1 in LOOKS
const EXTRAS = {
  lash:
    `<path d="M40 43 l-1.5 -1.5 M60 43 l1.5 -1.5" stroke="#1b1512" stroke-width="1"/>`,
  glasses:
    `<circle cx="43" cy="45" r="5" fill="none" stroke="#3a3a3a" stroke-width="1.1"/>` +
    `<circle cx="57" cy="45" r="5" fill="none" stroke="#3a3a3a" stroke-width="1.1"/>` +
    `<path d="M48 45 L52 45" stroke="#3a3a3a" stroke-width="1.1"/>`,
  blush:
    `<circle cx="39" cy="51" r="3" fill="#e07a6a" opacity=".35"/>` +
    `<circle cx="61" cy="51" r="3" fill="#e07a6a" opacity=".35"/>`,
  rouge:
    `<circle cx="39" cy="51" r="4" fill="#e0607a" opacity=".6"/>` +
    `<circle cx="61" cy="51" r="4" fill="#e0607a" opacity=".6"/>`,
  tears:
    `<path d="M42 49 q-1.5 3 0 4.5 q1.5 -1.5 0 -4.5Z M58 49 q-1.5 3 0 4.5 q1.5 -1.5 0 -4.5Z" fill="#7fb4d8"/>`,
  cigar:
    `<rect x="54" y="56" width="12" height="2.6" rx="1" fill="#6b4226" transform="rotate(12 54 57)"/>` +
    `<circle cx="66" cy="59.4" r="1.2" fill="#e36b2c"/>`,
  cross:
    `<path d="M50 80 L50 92 M45.5 84 L54.5 84" stroke="#d9a441" stroke-width="2.2" stroke-linecap="round"/>`,
  pearls:
    Array.from({ length: 7 }, (_, i) =>
      `<circle cx="${41 + i * 3}" cy="${70 + Math.sin(i / 6 * Math.PI) * 4}" r="1.6" fill="#fff"/>`
    ).join(""),
};

// Returns the extra only if the character has that flag
const extra = (look, key) => (look[key] ? EXTRAS[key] : "");

/* ---------- Hats ---------- */
const HATS = {
  salakot:
    `<path d="M16 34 Q50 2 84 34 Q50 26 16 34Z" fill="#c9a65a"/>` +
    `<path d="M50 9 L28 32 M50 9 L40 29 M50 9 L60 29 M50 9 L72 32" stroke="#a8863f" stroke-width="1"/>`,
  kepi:
    `<path d="M33 31 L35 16 Q50 12 65 16 L67 31Z" fill="#2c3e5a"/>` +
    `<path d="M30 31 Q50 37 70 31 L70 33 Q50 39 30 33Z" fill="#1a2638"/>` +
    `<rect x="34" y="24" width="32" height="2" fill="#d9a441"/>`,
};

/* ---------- Hair ---------- */
// Hair drawn behind the head
function backHair(style, hair) {
  switch (style) {
    case "wild":
      return `<path d="M28 52 Q24 18 50 20 Q76 18 72 52 L76 74 Q66 66 66 52 L34 52 Q34 66 24 74Z" fill="${hair}"/>`;
    case "bun":
      return `<circle cx="50" cy="21" r="9" fill="${hair}"/>` +
             `<path d="M40 16 Q50 8 60 16" stroke="#d9a441" stroke-width="2.4" fill="none"/>`;
    case "pulled":
      return `<circle cx="66" cy="30" r="7" fill="${hair}"/>`;
    default:
      return "";
  }
}

// Hair drawn over the head; L and R are the left and right edges of the face
function frontHair(style, hair, L, R) {
  switch (style) {
    case "part":
      return `<path d="M${L} 44 Q${L - 1} 22 50 22 Q${R + 1} 22 ${R} 42 Q${R - 4} 30 56 30 Q44 33 ${L + 3} 36 Q${L} 39 ${L} 44Z" fill="${hair}"/>`;
    case "short":
      return `<path d="M${L} 42 Q${L} 22 50 22 Q${R} 22 ${R} 42 Q${R - 3} 31 50 30 Q${L + 3} 31 ${L} 42Z" fill="${hair}"/>`;
    case "bun":
      return `<path d="M${L - 1} 48 Q${L - 2} 24 50 25 Q${R + 2} 24 ${R + 1} 48 Q${R - 2} 32 50 31 Q${L + 2} 32 ${L - 1} 48Z" fill="${hair}"/>`;
    case "wild":
      return `<path d="M${L - 1} 46 Q${L} 24 50 24 Q${R} 24 ${R + 1} 46 Q${R - 4} 34 56 32 Q50 36 44 32 Q${L + 4} 34 ${L - 1} 46Z" fill="${hair}"/>`;
    case "tonsure":
      return `<ellipse cx="${L + 2}" cy="38" rx="4" ry="8" fill="${hair}"/>` +
             `<ellipse cx="${R - 2}" cy="38" rx="4" ry="8" fill="${hair}"/>`;
    case "thin":
      return `<path d="M${L} 40 Q${L + 1} 28 ${L + 8} 27 L${L + 6} 38Z M${R} 40 Q${R - 1} 28 ${R - 8} 27 L${R - 6} 38Z" fill="${hair}"/>`;
    case "curly":
      return Array.from({ length: 7 }, (_, i) => {
        const a = Math.PI * (1.05 + i * 0.15);
        return `<circle cx="${50 + 20 * Math.cos(a)}" cy="${42 + 20 * Math.sin(a)}" r="6.5" fill="${hair}"/>`;
      }).join("");
    case "bald":
      return `<ellipse cx="${L + 1}" cy="42" rx="4" ry="6" fill="${hair}"/>` +
             `<ellipse cx="${R - 1}" cy="42" rx="4" ry="6" fill="${hair}"/>`;
    case "pulled":
      return `<path d="M${L} 44 Q${L} 24 50 24 Q${R} 24 ${R} 44 Q${R - 3} 31 50 30 Q${L + 3} 31 ${L} 44Z" fill="${hair}"/>`;
    default:
      return "";
  }
}

/* ---------- Portrait ---------- */
// Returns an SVG string for the named character at the given pixel size.
// Parts are layered back to front, so the order below matters.
function portrait(name, size) {
  const look = LOOKS[name] || {};
  const { skin, hair } = look;
  const rx = look.rx || 17;
  const L = 50 - rx;
  const R = 50 + rx;

  const parts = [
    // Body and neck
    OUTFITS[look.outfit] || "",
    `<rect x="44" y="58" width="12" height="14" fill="${skin}"/>`,

    // Head: back hair, ears, face, front hair, beard
    backHair(look.hs, hair),
    `<ellipse cx="${L}" cy="47" rx="3.5" ry="5" fill="${skin}"/>`,
    `<ellipse cx="${R}" cy="47" rx="3.5" ry="5" fill="${skin}"/>`,
    `<ellipse cx="50" cy="45" rx="${rx}" ry="20" fill="${skin}"/>`,
    frontHair(look.hs, hair, L, R),
    look.beard ? `<path d="M${L + 2} 50 Q${L + 4} 74 50 76 Q${R - 4} 74 ${R - 2} 50 Q${R - 8} 60 50 61 Q${L + 8} 60 ${L + 2} 50Z" fill="${look.beard}"/>` : "",

    // Brows and eyes
    BROWS[look.brow] ? `<path d="${BROWS[look.brow]}" stroke="#2a211c" stroke-width="1.6" stroke-linecap="round"/>` : "",
    EYES,
    extra(look, "lash"),
    extra(look, "glasses"),

    // Cheeks
    extra(look, "blush"),
    extra(look, "rouge"),
    extra(look, "tears"),

    // Nose and mouth
    NOSE,
    look.stache ? `<path d="M42 55 Q50 51 58 55 Q50 57 42 55Z" fill="${look.stache}"/>` : "",
    MOUTHS[look.mouth] ? `<path d="${MOUTHS[look.mouth]}" fill="none" stroke="#5a2e22" stroke-width="1.5" stroke-linecap="round"/>` : "",
    look.mouth === "lips" ? LIPS : "",
    extra(look, "cigar"),

    // Accessories
    HATS[look.hat] || "",
    extra(look, "cross"),
    extra(look, "pearls"),
  ];

  // Shrink younger characters toward the bottom centre
  const scale = look.child || 1;
  const figure = scale < 1
    ? `<g transform="translate(50 100) scale(${scale}) translate(-50 -100)">${parts.join("")}</g>`
    : parts.join("");

  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="Portrait of ${name}" ` +
         `style="display:block;border-radius:50%;flex:none">` +
         `<rect width="100" height="100" fill="${look.bg}"/>${figure}</svg>`;
}
