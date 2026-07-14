(() => {
  if (window.__snakeGameInitialized) {
    return;
  }
  window.__snakeGameInitialized = true;

  const canvas = document.getElementById('game-canvas');
  const scoreEl = document.getElementById('score');
  const bestScoreEl = document.getElementById('best-score');
  const stateEl = document.getElementById('game-state');
  const startBtn = document.getElementById('start-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const restartBtn = document.getElementById('restart-btn');
  const padButtons = document.querySelectorAll('.pad-btn');
  const scoreboard = document.querySelector('.scoreboard');
  const gameBoardWrap = document.querySelector('.game-board-wrap');

  if (!canvas || !scoreEl || !bestScoreEl || !stateEl || !startBtn || !pauseBtn || !restartBtn || !scoreboard || !gameBoardWrap) {
    return;
  }

  const ctx = canvas.getContext('2d');
  const gridCount = 21;
  const cell = canvas.width / gridCount;
  const STORAGE_KEY = 'gkullha-maker-snake-best-score';

  const game = {
    running: false,
    paused: false,
    gameOver: false,
    timer: null,
    score: 0,
    bestScore: Number(localStorage.getItem(STORAGE_KEY) || 0),
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    snake: [],
    food: { x: 10, y: 10 },
    obstacles: [],
    stepMs: 120,
    lastTouch: null,
    effectToken: 0,
    boardSeed: Math.random() * 1000,
  };

  bestScoreEl.textContent = String(game.bestScore);

  const updateState = (label) => {
    stateEl.textContent = label;
  };

  const drawRoundedRect = (x, y, w, h, radius, fill, stroke) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  };

  const occupiedBySnake = (x, y) => game.snake.some((segment) => segment.x === x && segment.y === y);
  const occupiedByObstacle = (x, y) => game.obstacles.some((segment) => segment.x === x && segment.y === y);
  const isOccupied = (x, y) => occupiedBySnake(x, y) || occupiedByObstacle(x, y);

  const randomCell = () => ({
    x: Math.floor(Math.random() * gridCount),
    y: Math.floor(Math.random() * gridCount),
  });

  const randomEmptyCell = () => {
    let cellPos;
    do {
      cellPos = randomCell();
    } while (isOccupied(cellPos.x, cellPos.y) || (cellPos.x === game.food.x && cellPos.y === game.food.y));
    return cellPos;
  };

  const buildObstacles = () => {
    const count = Math.floor(Math.random() * 4) + 4;
    const obstacles = [];
    const startSafe = new Set(['9,10', '8,10', '7,10', '10,10']);

    while (obstacles.length < count) {
      const candidate = randomCell();
      const key = `${candidate.x},${candidate.y}`;
      if (startSafe.has(key)) {
        continue;
      }
      if (obstacles.some((obstacle) => obstacle.x === candidate.x && obstacle.y === candidate.y)) {
        continue;
      }
      obstacles.push(candidate);
    }

    game.obstacles = obstacles;
  };

  const randomFood = () => {
    let food;
    do {
      food = randomCell();
    } while (isOccupied(food.x, food.y));
    return food;
  };

  const flashElement = (element, className, duration = 600) => {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
    window.setTimeout(() => element.classList.remove(className), duration);
  };

  const triggerScoreEffect = (isMega) => {
    game.effectToken += 1;
    flashElement(scoreboard, isMega ? 'mega-flash' : 'score-flash', isMega ? 750 : 420);
    flashElement(gameBoardWrap, 'board-flash', isMega ? 750 : 420);
  };

  const resetGame = () => {
    game.running = false;
    game.paused = false;
    game.gameOver = false;
    game.score = 0;
    game.direction = { x: 1, y: 0 };
    game.nextDirection = { x: 1, y: 0 };
    game.snake = [
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 7, y: 10 },
    ];
    clearInterval(game.timer);
    game.timer = null;
    scoreEl.textContent = '0';
    pauseBtn.textContent = '멈춤';
    updateState('준비');
    buildObstacles();
    game.food = randomFood();
    render();
  };

  const endGame = () => {
    game.running = false;
    game.paused = false;
    game.gameOver = true;
    clearInterval(game.timer);
    game.timer = null;
    if (game.score > game.bestScore) {
      game.bestScore = game.score;
      localStorage.setItem(STORAGE_KEY, String(game.bestScore));
      bestScoreEl.textContent = String(game.bestScore);
    }
    updateState('게임 종료');
    pauseBtn.textContent = '멈춤';
    render();
  };

  const startGame = () => {
    if (game.gameOver) {
      resetGame();
    }
    if (game.running && !game.paused) {
      return;
    }

    game.running = true;
    game.paused = false;
    game.gameOver = false;
    pauseBtn.textContent = '멈춤';
    updateState('진행 중');
    clearInterval(game.timer);
    game.timer = setInterval(moveSnake, game.stepMs);
    render();
  };

  const togglePause = () => {
    if (game.gameOver) {
      return;
    }
    if (!game.running) {
      startGame();
      return;
    }

    game.paused = !game.paused;
    pauseBtn.textContent = game.paused ? '이어하기' : '멈춤';
    updateState(game.paused ? '일시정지' : '진행 중');
    render();
  };

  const restartGame = () => {
    resetGame();
    startGame();
  };

  const setDirection = (x, y) => {
    if (!game.running && !game.gameOver) {
      startGame();
    }

    const reversing =
      x === -game.direction.x &&
      y === -game.direction.y &&
      !(game.direction.x === 0 && game.direction.y === 0);
    if (reversing) {
      return;
    }

    game.nextDirection = { x, y };
  };

  const handleKeydown = (event) => {
    const key = event.key.toLowerCase();
    const map = {
      arrowup: [0, -1],
      w: [0, -1],
      arrowdown: [0, 1],
      s: [0, 1],
      arrowleft: [-1, 0],
      a: [-1, 0],
      arrowright: [1, 0],
      d: [1, 0],
    };

    if (key in map) {
      event.preventDefault();
      const [x, y] = map[key];
      setDirection(x, y);
      return;
    }

    if (key === ' ' || key === 'spacebar') {
      event.preventDefault();
      togglePause();
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch) {
      return;
    }
    game.lastTouch = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches && event.changedTouches[0];
    if (!game.lastTouch || !touch) {
      return;
    }

    const dx = touch.clientX - game.lastTouch.x;
    const dy = touch.clientY - game.lastTouch.y;
    const threshold = 24;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      game.lastTouch = null;
      return;
    }

    if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? 1 : -1, 0);
    } else {
      setDirection(0, dy > 0 ? 1 : -1);
    }

    game.lastTouch = null;
  };

  const bindInstantButton = (button, action) => {
    button.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'touch' || event.pointerType === 'pen') {
        event.preventDefault();
        action();
      }
    });

    button.addEventListener('click', (event) => {
      if (event.detail === 0) {
        action();
      }
    });
  };

  bindInstantButton(startBtn, startGame);
  bindInstantButton(pauseBtn, togglePause);
  bindInstantButton(restartBtn, restartGame);

  padButtons.forEach((button) => {
    const activatePad = () => {
      const dir = button.dataset.dir;
      if (dir === 'up') setDirection(0, -1);
      if (dir === 'down') setDirection(0, 1);
      if (dir === 'left') setDirection(-1, 0);
      if (dir === 'right') setDirection(1, 0);
    };

    button.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'touch' || event.pointerType === 'pen') {
        event.preventDefault();
        activatePad();
      }
    });

    button.addEventListener('click', (event) => {
      if (event.detail === 0) {
        activatePad();
      }
    });
  });

  document.addEventListener('keydown', handleKeydown);
  canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
  canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
  canvas.addEventListener('touchmove', (event) => event.preventDefault(), { passive: false });

  const moveSnake = () => {
    if (!game.running || game.paused || game.gameOver) {
      return;
    }

    game.direction = game.nextDirection;
    const head = {
      x: game.snake[0].x + game.direction.x,
      y: game.snake[0].y + game.direction.y,
    };

    if (head.x < 0 || head.x >= gridCount || head.y < 0 || head.y >= gridCount) {
      endGame();
      return;
    }

    if (occupiedByObstacle(head.x, head.y) || occupiedBySnake(head.x, head.y)) {
      endGame();
      return;
    }

    game.snake.unshift(head);

    if (head.x === game.food.x && head.y === game.food.y) {
      game.score += 1;
      scoreEl.textContent = String(game.score);
      const mega = game.score % 10 === 0;
      if (game.score > game.bestScore) {
        game.bestScore = game.score;
        localStorage.setItem(STORAGE_KEY, String(game.bestScore));
        bestScoreEl.textContent = String(game.bestScore);
      }
      triggerScoreEffect(mega);
      game.food = randomFood();
      if (game.score % 4 === 0) {
        const newObstacle = randomEmptyCell();
        game.obstacles.push(newObstacle);
      }
    } else {
      game.snake.pop();
    }

    render();
  };

  const overlay = (title, subtitle) => {
    ctx.save();
    ctx.fillStyle = 'rgba(8, 17, 29, 0.62)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '700 24px system-ui, sans-serif';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '500 14px system-ui, sans-serif';
    ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 18);
    ctx.restore();
  };

  const drawGrassBackground = () => {
    const hueBase = 112;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const background = ctx.createLinearGradient(0, 0, 0, canvas.height);
    background.addColorStop(0, 'rgb(11, 31, 16)');
    background.addColorStop(0.4, 'rgb(18, 55, 24)');
    background.addColorStop(1, 'rgb(8, 26, 14)');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < gridCount; y += 1) {
      for (let x = 0; x < gridCount; x += 1) {
        const noise = ((x * 13 + y * 17 + Math.floor(game.boardSeed)) % 9) / 9;
        const tone = 30 + noise * 12;
        ctx.fillStyle = `rgba(${16 + tone}, ${58 + tone}, ${24 + tone}, 0.15)`;
        ctx.fillRect(x * cell, y * cell, cell, cell);
        if ((x + y) % 2 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.03)';
          ctx.fillRect(x * cell, y * cell, cell, cell);
        }
      }
    }

    for (let i = 0; i < 85; i += 1) {
      const x = (Math.sin(i * 12.9898) * 43758.5453 + i * 19) % canvas.width;
      const y = (Math.cos(i * 78.233) * 12563.112 + i * 27) % canvas.height;
      const strandX = (Math.abs(x) % canvas.width) + 0.5;
      const strandY = (Math.abs(y) % canvas.height) + 0.5;
      ctx.strokeStyle = `hsla(${hueBase + (i % 8) * 6}, 56%, ${34 + (i % 5)}%, 0.22)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(strandX, strandY);
      ctx.lineTo(strandX + ((i % 3) - 1) * 6, strandY - 18 - (i % 5) * 2);
      ctx.stroke();
    }
  };

  const drawObstacle = (obstacle) => {
    const px = obstacle.x * cell;
    const py = obstacle.y * cell;
    drawRoundedRect(px + 3, py + 3, cell - 6, cell - 6, 7, '#4f3b18', '#8b6b2f');
    ctx.fillStyle = 'rgba(255, 232, 171, 0.18)';
    ctx.beginPath();
    ctx.ellipse(px + cell * 0.55, py + cell * 0.38, cell * 0.18, cell * 0.1, -0.4, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawFood = () => {
    const px = game.food.x * cell;
    const py = game.food.y * cell;
    const pulse = 0.15 * Math.sin(Date.now() / 160);
    drawRoundedRect(px + 3, py + 3, cell - 6, cell - 6, 9, '#ff5a5f', '#ffd6d7');
    ctx.fillStyle = '#7b2d15';
    ctx.fillRect(px + cell * 0.49, py + 1.5, 2, 5);
    ctx.fillStyle = `rgba(255,255,255,${0.35 + pulse})`;
    ctx.beginPath();
    ctx.arc(px + cell * 0.34, py + cell * 0.34, cell * 0.11, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawSnakeSegment = (segment, index) => {
    const px = segment.x * cell;
    const py = segment.y * cell;
    const shrink = index === 0 ? 1 : Math.max(0.72, 1 - index * 0.035);
    const size = cell * shrink;
    const offset = (cell - size) / 2;
    const isHead = index === 0;
    const bodyColor = isHead ? '#ffe08a' : `hsl(${136 + index * 1.5}, 72%, ${isHead ? 66 : 46}%)`;
    const edgeColor = isHead ? '#9d6923' : 'rgba(17, 64, 34, 0.75)';
    drawRoundedRect(px + offset + 1, py + offset + 1, size - 2, size - 2, size * 0.32, bodyColor, edgeColor);

    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(px + cell * 0.35, py + cell * 0.32, size * 0.18, size * 0.1, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (isHead) {
      ctx.fillStyle = '#20152f';
      const eyeY = py + cell * 0.34;
      const eyeOffset = cell * 0.16;
      ctx.beginPath();
      ctx.arc(px + cell * 0.38, eyeY, 2.3, 0, Math.PI * 2);
      ctx.arc(px + cell * 0.62, eyeY, 2.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ff7a90';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px + cell * 0.5, py + cell * 0.55);
      ctx.lineTo(px + cell * 0.5, py + cell * 0.72);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(px + cell * 0.5, py + cell * 0.72);
      ctx.lineTo(px + cell * 0.47, py + cell * 0.68);
      ctx.moveTo(px + cell * 0.5, py + cell * 0.72);
      ctx.lineTo(px + cell * 0.53, py + cell * 0.68);
      ctx.stroke();
    }
  };

  const render = () => {
    drawGrassBackground();

    game.obstacles.forEach(drawObstacle);
    drawFood();

    game.snake.forEach((segment, index) => drawSnakeSegment(segment, index));

    if (!game.running && !game.gameOver) {
      overlay('시작하세요', '키보드, 버튼, 스와이프로 조작할 수 있습니다');
    } else if (game.paused) {
      overlay('일시정지', '이어하기를 누르면 계속됩니다');
    } else if (game.gameOver) {
      overlay('게임 종료', '재시작을 누르면 다시 할 수 있습니다');
    }
  };

  resetGame();
})();
