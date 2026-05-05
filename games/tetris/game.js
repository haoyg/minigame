// Tetris — Pokopie built-in game
// Pure canvas, no dependencies, CC0/PD-license-compatible

(function () {
  'use strict';

  const COLS = 10;
  const ROWS = 20;
  const BLOCK = 24;
  const COLORS = [null, '#00eeff', '#ffdd00', '#bb00ff', '#00cc44', '#ff2200', '#0055ff', '#ff8800'];
  const BG = '#0b1220';

  // SHAPES[piece][rotation][cellIndex] = [col, row]
  const SHAPES = [
    [[[0,0],[1,0],[2,0],[3,0]], [[1,-1],[1,0],[1,1],[1,2]], [[0,0],[1,0],[2,0],[3,0]], [[1,-1],[1,0],[1,1],[1,2]]],
    [[[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1],[1,1]], [[0,0],[1,0],[0,1],[1,1]]],
    [[[0,0],[1,0],[2,0],[1,1]], [[0,1],[0,0],[0,2],[1,1]], [[1,0],[0,1],[1,1],[2,1]], [[0,1],[1,0],[2,0],[1,1]]],
    [[[1,0],[2,0],[0,1],[1,1]], [[0,0],[0,1],[1,1],[1,2]], [[1,0],[2,0],[0,1],[1,1]], [[0,0],[0,1],[1,1],[1,2]]],
    [[[0,0],[1,0],[1,1],[2,1]], [[1,0],[0,1],[1,1],[1,2]], [[0,0],[1,0],[1,1],[2,1]], [[1,0],[0,1],[1,1],[1,2]]],
    [[[0,0],[0,1],[1,1],[2,1]], [[0,0],[1,0],[0,1],[0,2]], [[0,0],[1,0],[2,0],[2,1]], [[1,0],[1,1],[0,2],[1,2]]],
    [[[2,0],[0,1],[1,1],[2,1]], [[0,0],[1,0],[1,1],[1,2]], [[0,0],[1,0],[2,0],[0,1]], [[0,0],[0,1],[0,2],[1,2]]],
  ];

  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const nextCanvas = document.getElementById('nc');
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
      document.getElementById('oh').textContent = 'Game Over';
      document.getElementById('om').innerHTML = 'Score: ' + score + '<br>Press Play to retry.';
      document.getElementById('ov').classList.remove('hidden');
    }
    drawNext();
  }

  function rndPiece() { return Math.floor(Math.random() * 7); }

  function drawNext() {
    nextCtx.fillStyle = BG;
    nextCtx.clearRect(0, 0, 72, 72);
    const s = SHAPES[nextPiece][0];
    const minC = Math.min(...s.map(d => d[0]));
    const maxC = Math.max(...s.map(d => d[0]));
    const minR = Math.min(...s.map(d => d[1]));
    const maxR = Math.max(...s.map(d => d[1]));
    const w = maxC - minC + 1;
    const h = maxR - minR + 1;
    const offX = Math.floor((4 - w) / 2) - minC;
    const offY = Math.floor((4 - h) / 2) - minR;
    for (const [dx, dy] of s) {
      drawBlock(nextCtx, (dx + offX + 1) * 16, (dy + offY + 1) * 16, 14, COLORS[nextPiece + 1]);
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
    ArrowLeft:  () => move(-1, 0),
    ArrowRight:  () => move(1, 0),
    ArrowDown:   () => move(0, 1),
    ArrowUp:     rotate,
    KeyZ:        rotate,
    Space:       hardDrop,
  };

  document.addEventListener('keydown', e => {
    if (ACTIONS[e.code]) { e.preventDefault(); ACTIONS[e.code](); }
  });

  document.getElementById('ml').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowLeft(); });
  document.getElementById('mr').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowRight(); });
  document.getElementById('md').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowDown(); });
  document.getElementById('mz').addEventListener('touchstart', e => { e.preventDefault(); ACTIONS.ArrowUp(); });

  let tx = null, ty = null;
  canvas.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    if (tx === null) return;
    const dx = e.touches[0].clientX - tx, dy = e.touches[0].clientY - ty;
    if (Math.abs(dx) > 28) { ACTIONS[dx > 0 ? 'ArrowRight' : 'ArrowLeft'](); tx = e.touches[0].clientX; }
    if (dy > 28) { ACTIONS.ArrowDown(); ty = e.touches[0].clientY; }
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', e => { tx = null; ty = null; e.preventDefault(); }, { passive: false });

  // ── Rendering ───────────────────────────────────────────────────

  function drawBlock(c, px, py, size, color) {
    const s = size || BLOCK;
    c.fillStyle = color;
    c.fillRect(px, py, s, s);
    c.fillStyle = 'rgba(255,255,255,0.18)';
    c.fillRect(px, py, s, 2);
    c.fillRect(px, py, 2, s);
    c.fillStyle = 'rgba(0,0,0,0.28)';
    c.fillRect(px + s - 2, py, 2, s);
    c.fillRect(px, py + s - 2, s, 2);
  }

  function drawBoard() {
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(30,41,59,0.8)';
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * BLOCK); ctx.lineTo(canvas.width, r * BLOCK); ctx.stroke();
    }
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * BLOCK, 0); ctx.lineTo(c * BLOCK, canvas.height); ctx.stroke();
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (board[r][c]) drawBlock(ctx, c * BLOCK, r * BLOCK, BLOCK, COLORS[board[r][c]]);
      }
    }

    if (gameState !== 'playing') return;

    // Ghost
    let gy = y;
    while (valid(x, gy + 1)) gy++;
    if (gy !== y) {
      for (const [dx, dy] of shape()) {
        const gc = x + dx, gr = gy + dy;
        if (gr >= 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.06)';
          ctx.fillRect(gc * BLOCK + 2, gr * BLOCK + 2, BLOCK - 4, BLOCK - 4);
        }
      }
    }

    for (const [dx, dy] of shape()) {
      const gc = x + dx, gr = y + dy;
      if (gr >= 0) drawBlock(ctx, gc * BLOCK, gr * BLOCK, BLOCK, COLORS[current + 1]);
    }
  }

  function updateUI() {
    document.getElementById('sc').textContent = score;
    document.getElementById('li').textContent = lines;
    document.getElementById('lv').textContent = level;
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

  // ── Start ──────────────────────────────────────────────────────

  document.getElementById('btn').addEventListener('click', () => {
    board = newBoard();
    score = 0; lines = 0; level = 1;
    dropAccum = 0; lastTime = null;
    nextPiece = null;
    gameState = 'playing';
    document.getElementById('oh').textContent = 'Tetris';
    document.getElementById('om').innerHTML = 'Stack the blocks.<br>Clear lines. Beat your score.';
    document.getElementById('ov').classList.add('hidden');
    spawnPiece();
    updateUI();
    requestAnimationFrame(loop);
  });
})();
