/* ---------- Settings ---------- */
const GOAL = 50;
const CHECKPOINTS = [4, 8, 13, 17, 21, 26, 30, 34, 38, 42, 45, 48];
const COLORS = ["#c8553d", "#3f7fd0", "#e0b04a", "#9b6cd1"];
const STEP = { e: 2, m: 4, h: 6 };
const LEVEL_NAME = { e: "Easy", m: "Medium", h: "Hard" };

/* ---------- State ---------- */
let players = [];
let turn = 0;
let busy = false;     // true while a turn is in progress
let over = false;     // true once someone has won
let cpState = null;   // { p, cards } during a Character Checkpoint

/* ---------- Helpers ---------- */
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = ms => new Promise(resolve => setTimeout(resolve, reduceMotion ? Math.min(ms, 40) : ms));
const randInt = n => Math.floor(Math.random() * n);
const randItem = arr => arr[randInt(arr.length)];
const rollDie = () => 1 + randInt(6);
const isCheckpoint = n => CHECKPOINTS.includes(n);

// Player names are typed by users, so escape them before putting them in HTML
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

// Fisher–Yates shuffle, then take the first n
function pickRandom(arr, n) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function levelBadge(lv) {
  return `<span class="lv ${lv}">${LEVEL_NAME[lv]} ±${STEP[lv]}</span>`;
}

/* ---------- Checkpoint modal ---------- */
const cpModalEl = $("cpModal");
const cpModal = new bootstrap.Modal(cpModalEl);

// Focus an element inside the modal once it has finished opening (or right away if already open)
function focusInModal(selector) {
  const focus = () => $("cp").querySelector(selector).focus();
  if (cpModalEl.classList.contains("show")) focus();
  else cpModalEl.addEventListener("shown.bs.modal", focus, { once: true });
}

/* ---------- Board ---------- */
// Space numbers in display order: top row first, snaking left/right
function spaceOrder() {
  const rows = [];
  for (let r = 0; r < 5; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) row.push(r * 10 + c + 1);
    if (r % 2) row.reverse();
    rows.push(row);
  }
  return rows.reverse().flat();
}

function drawBoard() {
  const board = $("board");
  board.innerHTML = "";

  spaceOrder().forEach(n => {
    const cp = isCheckpoint(n);
    const label = n === 1 ? "Start" : n === GOAL ? "Finish" : "";

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "t" + n;
    tile.classList.toggle("cp", cp);
    tile.classList.toggle("start", n === 1);
    tile.classList.toggle("finish", n === GOAL);
    tile.setAttribute("aria-label", `Space ${n}${cp ? ", Character Checkpoint" : ""}`);
    tile.innerHTML = `
      <span class="n">${n}</span>
      ${cp ? '<span class="ic" aria-hidden="true">✦</span>' : ""}
      <span class="lbl">${label}</span>
      <div class="tokens"></div>`;

    board.appendChild(tile);
  });

  drawTokens();
}

function drawTokens() {
  document.querySelectorAll(".tokens").forEach(el => (el.innerHTML = ""));

  players.forEach(p => {
    const tok = document.createElement("span");
    tok.className = "tok";
    tok.style.background = p.color;
    tok.title = p.name;
    $("t" + p.pos).querySelector(".tokens").appendChild(tok);
  });
}

/* ---------- Players & status ---------- */
function drawPlayers() {
  $("players").innerHTML = players.map((p, i) => `
    <div class="pl ${i === turn && !over ? "turn" : ""}">
      <span class="tok" style="background:${p.color}"></span>
      <input id="pname${i}" aria-label="Player ${i + 1} name" value="${escapeHtml(p.name)}">
      <span class="pos">Space ${p.pos}</span>
    </div>`).join("");

  players.forEach((p, i) => {
    $("pname" + i).addEventListener("input", e => {
      p.name = e.target.value || "Player " + (i + 1);
      setStatus();
    });
  });
}

function setStatus(msg) {
  if (msg) $("status").innerHTML = msg;
  else $("status").innerHTML = over ? "" : `<b>${escapeHtml(players[turn].name)}</b>, it's your turn.`;
}

function setStage(html) {
  $("stage").innerHTML = html;
}

function showWelcome() {
  setStage(`
    <h3>Welcome to San Diego</h3>
    <p class="read">Crisóstomo Ibarra has come home, and the town is full of secrets. Race to space ${GOAL}.
      Every gold space is a Character Checkpoint: pick a character card, answer correctly to rise, answer wrongly to fall.</p>
    <p class="small">Tip: Hard cards move you ${STEP.h} spaces, but a wrong answer costs ${STEP.h} too.</p>`);
}

/* ---------- Game flow ---------- */
function newGame() {
  const count = +$("count").value;
  players = Array.from({ length: count }, (_, i) => ({ name: "Player " + (i + 1), color: COLORS[i], pos: 1 }));
  turn = 0;
  busy = false;
  over = false;
  cpState = null;

  cpModal.hide();
  if (stopConfetti) stopConfetti();
  $("die").textContent = "–";
  $("roll").disabled = false;

  drawBoard();
  drawPlayers();
  setStatus();
  showWelcome();
}

function nextTurn() {
  turn = (turn + 1) % players.length;
  busy = false;
  $("roll").disabled = false;
  drawPlayers();
  setStatus();
}

// Move a player one space at a time (negative steps move backward), stopping at the board edges
async function walk(p, steps) {
  const dir = Math.sign(steps);
  for (let k = 0; k < Math.abs(steps); k++) {
    const next = p.pos + dir;
    if (next < 1 || next > GOAL) break;

    p.pos = next;
    drawTokens();
    sfx.step(dir);
    const tile = $("t" + p.pos);
    tile.classList.add("flash");
    await wait(170);
    tile.classList.remove("flash");
  }
  drawPlayers();
}

async function roll() {
  if (busy || over) return;
  busy = true;
  $("roll").disabled = true;

  // Restart the wobble animation and flicker a few faces
  const die = $("die");
  die.classList.remove("spin");
  void die.offsetWidth;
  die.classList.add("spin");
  for (let i = 0; i < 6; i++) {
    die.textContent = rollDie();
    sfx.rattle();
    await wait(60);
  }

  const value = rollDie();
  die.textContent = value;
  sfx.dieLand();
  await wait(250);

  const p = players[turn];
  setStatus(`<b>${escapeHtml(p.name)}</b> rolled a <b>${value}</b>.`);
  await walk(p, value);

  if (p.pos >= GOAL) return win(p);
  if (isCheckpoint(p.pos)) return checkpoint(p);

  setStage(`<h3>Space ${p.pos}</h3><p class="read">A quiet street in San Diego. Nothing happens here.</p>`);
  await wait(300);
  nextTurn();
}

function win(p) {
  over = true;
  busy = false;
  $("roll").disabled = true;
  drawPlayers();

  setStage(`
    <div class="win" style="color:${p.color}">${escapeHtml(p.name)} wins!</div>
    <p class="read">You survived the Trials of San Diego and reached space ${GOAL} first. Click below to start a new game.</p>
    <div><button type="button" class="btn" id="again">Play again</button></div>`);
  $("again").addEventListener("click", newGame);
  setStatus(`<b style="color:${p.color}">${escapeHtml(p.name)}</b> reached space ${GOAL}.`);
  confetti(p.color);
  sfx.win();
}

/* ---------- Confetti ---------- */
let stopConfetti = null;

// Burst of paper confetti over the whole page, mostly in the winner's colour
function confetti(mainColor) {
  if (reduceMotion) return;
  if (stopConfetti) stopConfetti();

  const canvas = document.createElement("canvas");
  canvas.className = "confetti";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  resize();
  addEventListener("resize", resize);

  const palette = [mainColor, mainColor, mainColor, "#e0b04a", "#eef0e6", "#58b37f"];
  const pieces = Array.from({ length: 180 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.3,
    y: innerHeight + 10,
    vx: (Math.random() - 0.5) * 14,
    vy: -(10 + Math.random() * 12),
    size: 6 + Math.random() * 6,
    angle: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.3,
    color: randItem(palette),
  }));

  const start = performance.now();
  let frame;

  function draw(now) {
    const t = now - start;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalAlpha = Math.min(1, Math.max(0, (4500 - t) / 1000)); // fade out over the last second

    pieces.forEach(c => {
      c.vy += 0.3;        // gravity
      c.vx *= 0.99;       // air drag
      c.x += c.vx;
      c.y += c.vy;
      c.angle += c.spin;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);
      ctx.scale(1, Math.cos(c.angle * 2)); // flip like a falling paper strip
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
      ctx.restore();
    });

    if (t < 4500) frame = requestAnimationFrame(draw);
    else stopConfetti();
  }

  stopConfetti = () => {
    cancelAnimationFrame(frame);
    removeEventListener("resize", resize);
    canvas.remove();
    stopConfetti = null;
  };

  frame = requestAnimationFrame(draw);
}

/* ---------- Character Checkpoint ---------- */
// Step 1: offer three random characters, each with a random difficulty and question
function checkpoint(p) {
  const cards = pickRandom(Object.keys(CHARS), 3).map(name => {
    const lv = randItem(Object.keys(CHARS[name].q));
    return { name, lv, q: randItem(CHARS[name].q[lv]) };
  });
  cpState = { p, cards };

  const name = escapeHtml(p.name);
  setStage(`<h3>Character Checkpoint</h3><p class="read">${name} is facing the people of San Diego on space ${p.pos}…</p>`);

  $("cp").innerHTML = `
    <div class="qhead">
      <h3 id="cpTitle">Character Checkpoint</h3>
      <span class="where">Space ${p.pos}</span>
    </div>
    <p class="lead-in"><b>${name}</b>, choose a character card.</p>
    <div class="cards">
      ${cards.map((c, i) => `
        <button type="button" class="card" data-i="${i}">
          <span class="pic">${portrait(c.name, 96)}</span>
          <span class="who">${c.name}</span>
          <span class="role">${CHARS[c.name].role}</span>
          ${levelBadge(c.lv)}
        </button>`).join("")}
    </div>`;

  $("cp").querySelectorAll(".card").forEach(btn => btn.addEventListener("click", () => {
    sfx.cardPick();
    ask(+btn.dataset.i);
  }));
  cpModal.show();
  sfx.checkpoint();
  focusInModal(".card");
  setStatus(`<b>${name}</b> landed on a Character Checkpoint.`);
}

// Step 2: show the chosen character's question
function ask(i) {
  const card = cpState.cards[i];
  const [question, options] = card.q;

  $("cp").innerHTML = `
    <div class="qhead">
      <div class="who-head">${portrait(card.name, 80)}<h3 id="cpTitle">${card.name}</h3></div>
      ${levelBadge(card.lv)}
    </div>
    <p class="question">${question}</p>
    <div class="opts">
      ${options.map((o, k) => `<button type="button" class="opt" data-k="${k}">${"ABCD"[k]}. ${o}</button>`).join("")}
    </div>
    <div id="after"></div>`;

  $("cp").querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => answer(card, +btn.dataset.k)));
  focusInModal(".opt");
}

// Step 3: reveal the answer, then move the player when they click the button
function answer(card, chosen) {
  const p = cpState.p;
  const [, , correct, note] = card.q;
  const ok = chosen === correct;
  const steps = STEP[card.lv];
  if (ok) sfx.correct();
  else sfx.wrong();

  $("cp").querySelectorAll(".opt").forEach((btn, j) => {
    btn.disabled = true;
    if (j === correct) btn.classList.add("right");
    else if (j === chosen) btn.classList.add("wrong");
  });

  $("after").innerHTML = `
    <p class="note ${ok ? "up" : "down"}">
      <b>${ok ? `Correct! Rise ${steps} spaces.` : `Wrong. Fall back ${steps} spaces.`}</b> ${note}
    </p>
    <div class="mt-2"><button type="button" class="btn" id="go">${ok ? "Move forward" : "Move back"}</button></div>`;

  const go = $("go");
  go.focus();
  go.addEventListener("click", async () => {
    go.disabled = true;
    cpModal.hide();
    await wait(300); // let the modal fade out so the move is visible on the board
    await walk(p, ok ? steps : -steps);
    cpState = null;

    if (p.pos >= GOAL) return win(p);

    const name = escapeHtml(p.name);
    setStatus(`<b>${name}</b> is now on space ${p.pos}.`);
    setStage(`<h3>${ok ? "Rising" : "Falling"}</h3><p class="read">${name} ${ok ? "climbs" : "slides"} to space ${p.pos}.</p>`);
    await wait(350);
    nextTurn();
  });
}

/* ---------- Background music ---------- */
const music = $("music");
const muteBtn = $("mute");
const MUTE_KEY = "noli-muted";
music.volume = 0.35;

// Remember the player's mute choice between visits (ignored if the browser blocks storage)
function loadMuted() {
  try { return localStorage.getItem(MUTE_KEY) === "1"; } catch { return false; }
}
function saveMuted(value) {
  try { localStorage.setItem(MUTE_KEY, value ? "1" : "0"); } catch {}
}

function applyMute() {
  music.muted = muted;
  const label = muted ? "Unmute music" : "Mute music";
  muteBtn.textContent = muted ? "🔇" : "🔊";
  muteBtn.setAttribute("aria-pressed", String(muted));
  muteBtn.setAttribute("aria-label", label);
  muteBtn.title = label;
}

// Browsers only allow sound after the player interacts with the page
function startMusic() {
  if (music.paused) music.play().catch(() => {});
  sfx.unlock();
}

let muted = loadMuted();
applyMute();

muteBtn.addEventListener("click", () => {
  muted = !muted;
  saveMuted(muted);
  applyMute();
  startMusic();
});
document.addEventListener("pointerdown", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

/* ---------- Sound effects ---------- */
// Generated with the Web Audio API, so no sound files are needed.
// These always play; the mute button only controls the background music.
const sfx = (() => {
  let ctx = null;
  let noiseBuffer = null;
  const VOLUME = 0.5;

  // Create (or wake up) the audio engine; must happen during a click or key press
  function unlock() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!ctx) {
      ctx = new AudioCtx();
      // One second of white noise, reused for rattles and swishes
      noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
  }

  const ready = () => ctx !== null;

  // A single note: frequency in Hz, optional slide to another pitch, quick fade out
  function tone(freq, { start = 0, dur = 0.15, type = "sine", vol = 0.3, slideTo = null } = {}) {
    if (!ready()) return;
    const t = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol * VOLUME, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  // A short burst of filtered noise (clicks, rattles, paper swishes)
  function noise({ start = 0, dur = 0.05, freq = 2000, q = 1, vol = 0.3, type = "bandpass" } = {}) {
    if (!ready()) return;
    const t = ctx.currentTime + start;
    const src = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = noiseBuffer;
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t);
    filter.Q.value = q;
    gain.gain.setValueAtTime(vol * VOLUME, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.02);
  }

  // Play a list of [frequency, startTime, duration] notes
  const melody = (notes, opts) => notes.forEach(([f, start, dur]) => tone(f, { ...opts, start, dur }));

  return {
    unlock,

    // Die tumbling: a wooden clack at a random pitch
    rattle() {
      noise({ freq: 1200 + Math.random() * 1800, q: 4, dur: 0.04, vol: 0.5 });
    },

    // Die settling on its final face
    dieLand() {
      noise({ freq: 700, q: 3, dur: 0.08, vol: 0.6 });
      tone(180, { dur: 0.12, type: "triangle", vol: 0.4, slideTo: 120 });
    },

    // One step on the board: higher when moving forward, lower when falling back
    step(dir) {
      tone(dir > 0 ? 520 : 300, { dur: 0.08, type: "triangle", vol: 0.25, slideTo: dir > 0 ? 640 : 240 });
    },

    // Landing on a Character Checkpoint: a mysterious little chime
    checkpoint() {
      melody([[392, 0, 0.3], [523, 0.1, 0.3], [659, 0.2, 0.3], [784, 0.3, 0.5]], { type: "triangle", vol: 0.22 });
    },

    // Choosing a card: a paper swish
    cardPick() {
      noise({ freq: 3000, q: 0.7, dur: 0.18, vol: 0.35, type: "highpass" });
      tone(880, { dur: 0.08, type: "sine", vol: 0.15 });
    },

    // Right answer: bright rising notes
    correct() {
      melody([[523, 0, 0.15], [659, 0.1, 0.15], [784, 0.2, 0.15], [1047, 0.3, 0.35]], { type: "triangle", vol: 0.3 });
    },

    // Wrong answer: two falling "uh-oh" buzzes, pitched high enough for laptop and phone speakers
    wrong() {
      tone(392, { dur: 0.22, type: "square", vol: 0.35, slideTo: 370 });
      tone(294, { start: 0.24, dur: 0.45, type: "square", vol: 0.35, slideTo: 220 });
    },

    // Someone wins: a short fanfare
    win() {
      melody([
        [523, 0, 0.18], [523, 0.18, 0.12], [523, 0.3, 0.12], [698, 0.42, 0.5],
        [659, 0.9, 0.18], [698, 1.08, 0.18], [880, 1.26, 0.7],
      ], { type: "square", vol: 0.12 });
      melody([[262, 0.42, 0.5], [349, 1.26, 0.7]], { type: "triangle", vol: 0.2 });
    },
  };
})();

/* ---------- Start ---------- */
$("roll").addEventListener("click", roll);
$("newgame").addEventListener("click", newGame);
$("count").addEventListener("change", newGame);
newGame();
