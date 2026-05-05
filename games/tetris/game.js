// Tetris — Pokopie built-in game
// Pure canvas, no dependencies, CC0/PD-license-compatible

(function () {
  'use strict';

  const COLS = 10;
  const ROWS = 20;
  const BLOCK = 24;
  const COLORS = [null, '#00eeff', '#ffdd00', '#bb00ff', '#00cc44', '#ff2200', '#0055ff', '#ff8800'];

  // SHAPES[piece][rotation][cellIndex] = [col, row]
  // Standard SRS-based rotation, 4 states per piece
  const SHAPES = [
    // I — horizontal | vertical
    [[[0,0],[1,0],[2,0],[3,0]], [[1,-1],[1,0],[1,1],[1,2]], [[0,0],[1,0],[2,0],[3,0]], [[1,-1],[1,0],[1,1],[1,2]]],
    // O — same in all rotations
    [[[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1],[1,1]]],
    // T
    [[[0,0],[1,0],[2,0],[1,1]], [[0,1],[0,0],[0,2],[1,1]], [[1,0],[0,1],[1,1],[2,1]], [[0,1],[1,0],[2,0],[1,1]]],
    // S
    [[[1,0],[2,0],[0,1],[1,1]], [[0,0],[0,1],[1,1],[1,2]], [[1,0],[2,0],[0,1],[1,1]], [[0,0],[0,1],[1,1],[1,2]]],
    // Z
    [[[0,0],[1,0],[1,1],[2,1]], [[1,0],[0,1],[1,1],[1,2]], [[0,0],[1,0],[1,1],[2,1]], [[1,0],[0,1],[1,1],[1,2]]],
    // J
    [[[0,0],[0,1],[1,1],[2,1]], [[0,0],[1,0],[0,1],[0,2]], [[0,0],[1,0],[2,0],[2,1]], [[1,0],[1,1],[0,2],[1,2]]],
    // L
    [[[2,0],[0,1],[1,1],[2,1]], [[0,0],[1,0],[1,1],[1,2]], [[0,0],[1,0],[2,0],[0,1]], [[0,0],[0,1],[0,2],[1,2]]],
  ];

  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  const nextCanvas = document.getElementById('next-canvas');
  const nextCtx = nextCanvas.getContext('2d');

  let board, current, nextPiece, x, y, rot, score, lines, level;
  let gameState, lastTime, dropAccum;

  // ── Board helpers ────────────────────────────────────────────────

  function newBoard() {
    return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
  }

  function shape() { return SHAPES[current][rot]; }

  function valid(bx, by) {
    for (const [dx, dy] of shape()) {
      const c = bx + dx, r = by + dy;
      if (c < 0 || c >= COLS || r >= ROWS) return false;
      if (r >= 0 && board[r][c]) return false;
    }
    return true;
  }

  function lockPiece() {
    for (const [dx, dy] of shape()) {
      const c = x + dx, r = y + dy;
      if (r >= 0) board[r][c] = current + 1;
    }
    clearLines();
    spawnPiece();
  }

  function clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; ) {
      if (board[r].every(v => v !== 0)) {
        board.splice(r, 1);
        board.unshift(new Array(COLS).fill(0));
        cleared++;
        lines++;
      } else {
        r--;
      }
    }
    score += [0, 100, 300, 500, 800][cleared] || 0;
    if (lines > 0 && lines % 10 === 0) level = Math.min(15, level + 1);
  }

  // ── Piece spawning ──────────────────────────────────────────────

  function spawnPiece() {
    current = nextPiece == null ? rndPiece() : nextPiece;
    nextPiece = rndPiece();
    x = 3; y = -2; rot = 0;
    if (!valid(x, y)) {
      gameState = 'gameover';
      showOverlay('Game Over', `Score: ${score}<br>Press Play to retry.`);
    }
    drawNext();
  }

  function rndPiece() { return Math.floor(Math.random() * 7); }

  function drawNext() {
    nextCtx.fillStyle = '#0d0d20';
    nextCtx.clearRect(0, 0, 80, 80);
    const s = SHAPES[nextPiece][0];
    const minC = Math.min(...s.map(d => d[0]));
    const minR = Math.min(...s.map(d => d[1]));
    const offX = (4 - (Math.max(...s.map(d => d[0])) - minC + 1)) / 2 + minC;
    const offY = (4 - (Math.max(...s.map(d => d[1])) - minR + 1)) / 2 + minR;
    for (const [dx, dy] of s) {
      drawBlock(nextCtx, 80, 80, (dx - offX + 2) * 18, (dy - offY + 2) * 18, 16, COLORS[nextPiece + 1]);
    }
  }

  // ── Input ───────────────────────────────────────────────────────

  function move(dx, dy) {
    if (gameState !== 'playing') return;
    if (dy) {
      if (valid(x, y + dy)) { y += dy; if (dy > 0) score += 1; }
    } else if (dx) {
      if (valid(x + dx, y)) x += dx;
    }
  }

  function rotate() {
    if (gameState !== 'playing') return;
    const r = (rot + 1) % 4;
    if (valid(x, y)) { rot = r; return; }
    if (valid(x - 1, y)) { x--; rot = r; return; }
    if (valid(x + 1, y)) { x++; rot = r; return; }
  }

  function hardDrop() {
    if (gameState !== 'playing') return;
    while (valid(x, y + 1)) { y++; score += 2; }
    lockPiece();
  }

  const ACTIONS = {
    ArrowLeft: () => move(-1, 0),
    ArrowRight: () => move(1, 0),
    ArrowDown: () => move(0, 1),
    ArrowUp: rotate,
    KeyZ: rotate,
    Space: hardDrop,
  };

  document.addEventListener('keydown', e => {
    if (ACTIONS[e.code]) { e.preventDefault(); ACTIONS[e.code](); }
  });

  // Mobile buttons
  document.getElementById('m-left').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowLeft(); });
  document.getElementById('m-right').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowRight(); });
  document.getElementById('m-down').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowDown(); });
  document.getElementById('m-rotate').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowUp(); });

  // Touch swipe on canvas
  let tx = null, ty = null;
  canvas.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    if (tx === null) return;
    const dx = e.touches[0].clientX - tx, dy = e.touches[0].clientY - ty;
    if (Math.abs(dx) > 25) { ACTIONS[dx > 0 ? 'ArrowRight' : 'ArrowLeft'](); tx = e.touches[0].clientX; }
    if (dy > 25) { ACTIONS.ArrowDown(); ty = e.touches[0].clientY; }
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', e => { tx = null; ty = null; e.preventDefault(); }, { passive: false });

  // ── Rendering ───────────────────────────────────────────────────

  function drawBlock(c, cw, ch, px, py, size, color) {
    const s = size || BLOCK;
    c.fillStyle = color;
    c.fillRect(px, py, s, s);
    c.fillStyle = 'rgba(255,255,255,0.2)';
    c.fillRect(px, py, s, 3);
    c.fillRect(px, py, 3, s);
    c.fillStyle = 'rgba(0,0,0,0.3)';
    c.fillRect(px + s - 3, py, 3, s);
    c.fillRect(px, py + s - 3, s, 3);
  }

  function drawBoard() {
    ctx.fillStyle = '#0d0d20';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(50,50,100,0.3)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * BLOCK); ctx.lineTo(canvas.width, r * BLOCK); ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * BLOCK, 0); ctx.lineTo(c * BLOCK, canvas.height); ctx.stroke();
    }

    // Locked cells
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) drawBlock(ctx, canvas.width, canvas.height, c * BLOCK, r * BLOCK, BLOCK, COLORS[board[r][c]]);
      }
    }

    if (gameState !== 'playing') return;

    // Ghost piece
    let gy = y;
    while (true) { if (valid(x, gy + 1)) gy++; else break; }
    if (gy !== y) {
      for (const [dx, dy] of shape()) {
        const gc = x + dx, gr = gy + dy;
        if (gr >= 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.07)';
          ctx.fillRect(gc * BLOCK + 2, gr * BLOCK + 2, BLOCK - 4, BLOCK - 4);
        }
      }
    }

    // Active piece
    for (const [dx, dy] of shape()) {
      const gc = x + dx, gr = y + dy;
      if (gr >= 0) drawBlock(ctx, canvas.width, canvas.height, gc * BLOCK, gr * BLOCK, BLOCK, COLORS[current + 1]);
    }
  }

  function updateUI() {
    document.getElementById('score-display').textContent = score;
    document.getElementById('lines-display').textContent = lines;
    document.getElementById('level-display').textContent = level;
  }

  // ── Game loop ──────────────────────────────────────────────────

  function dropSpeed() { return Math.max(80, 1000 - (level - 1) * 65); }

  function loop(ts) {
    if (gameState !== 'playing') return;
    if (!lastTime) lastTime = ts;
    const dt = ts - lastTime;
    lastTime = ts;
    dropAccum += dt;
    const speed = dropSpeed();
    if (dropAccum >= speed) {
      dropAccum -= speed;
      if (valid(x, y + 1)) { y++; }
      else { lockPiece(); }
    }
    drawBoard();
    requestAnimationFrame(loop);
  }

  // ── Overlay ────────────────────────────────────────────────────

  function showOverlay(title, msg) {
    const ov = document.getElementById('overlay');
    document.getElementById('overlay-title').textContent = title;
    document.getElementById('overlay-msg').innerHTML = msg;
    ov.classList.remove('hidden');
  }

  function hideOverlay() { document.getElementById('overlay').classList.add('hidden'); }

  document.getElementById('start-btn').addEventListener('click', startGame);

  function startGame() {
    board = newBoard();
    score = 0; lines = 0; level = 1;
    dropAccum = 0; lastTime = null;
    nextPiece = null;
    gameState = 'playing';
    spawnPiece();
    updateUI();
    hideOverlay();
    requestAnimationFrame(loop);
  }
})();
