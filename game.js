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
  };

  bestScoreEl.textContent = String(game.bestScore);

  const updateState = (label) => {
    stateEl.textContent = label;
  };

  const drawCell = (x, y, fill) => {
    ctx.fillStyle = fill;
    ctx.fillRect(x * cell + 1, y * cell + 1, cell - 2, cell - 2);
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
    pauseBtn.textContent = 'Pause';
    updateState('Ready');
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
    updateState('Game Over');
    pauseBtn.textContent = 'Pause';
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
    pauseBtn.textContent = 'Pause';
    updateState('Playing');
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
    pauseBtn.textContent = game.paused ? 'Resume' : 'Pause';
    updateState(game.paused ? 'Paused' : 'Playing');
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

    const reversing = x === -game.direction.x && y === -game.direction.y && !(game.direction.x === 0 && game.direction.y === 0);
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
    } else {
      game.snake.pop();
    }

    render();
  };

  const overlay = (title, subtitle) => {
    ctx.save();
    ctx.fillStyle = 'rgba(8,17,29,0.62)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '700 24px system-ui, sans-serif';
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '500 14px system-ui, sans-serif';
    ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 18);
    ctx.restore();
  };

  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#08111d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridCount; i += 1) {
      for (let j = 0; j < gridCount; j += 1) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = 'rgba(255,255,255,0.02)';
          ctx.fillRect(i * cell, j * cell, cell, cell);
        }
      }
    }

    game.obstacles.forEach((obstacle) => {
      drawCell(obstacle.x, obstacle.y, '#6b7280');
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(obstacle.x * cell + 4, obstacle.y * cell + 4, cell - 8, cell - 8);
    });

    drawCell(game.food.x, game.food.y, '#ef4444');

    game.snake.forEach((segment, index) => {
      drawCell(segment.x, segment.y, index === 0 ? '#a7f3d0' : '#22c55e');
    });

    if (!game.running && !game.gameOver) {
      overlay('Press Start', 'Use keyboard, buttons, or swipe');
    } else if (game.paused) {
      overlay('Paused', 'Resume to continue');
    } else if (game.gameOver) {
      overlay('Game Over', 'Press Restart to play again');
    }
  };

  resetGame();
})();
