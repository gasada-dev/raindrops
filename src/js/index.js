// минимальная ширина страницы, при которой приложение отображается корректно – 320 рх
// иногда выпадают бонусные капли другого цвета, решение выражений в которых полностью очищает игровое поле от других капель

// сделать волну и смерть когда капля косается волны
// в ходе игры скорость падения капель постепенно увеличивается
// правильные и неправильные ответы сопровождаются анимацией. Также есть анимация волн

// сделать счетчик ошибок (доп)
// исправить баг с рекордом

const NUMBERBTNS = document.querySelectorAll('.number');
const OPERATIONBTNS = document.querySelectorAll('.operation');
const CLEARBTNS = document.querySelectorAll('.clear');
const record = document.querySelector('.record');
const BTN_FULLSCREEN = document.querySelector('.btn-fullscreen');
const CALC = document.querySelector('.calc');
const SCORE = document.querySelector('.score__num');
const MUSIC = document.querySelector('.music');
const PLAY = document.querySelector('.play');
const ENDGAME = document.querySelector('.end');
const TEXT_HEAD = document.querySelector('.text-head');
const TEXT_SCORE = document.querySelector('.end__score--text');
const TUTORIAL = document.querySelector('.tutorial');
const AUDIO = document.querySelector('.audio-background');
const SOUND = document.querySelector('.sound');
const AUDIO_SOUND_TRUE = document.querySelector('.audio-sound-true');
const AUDIO_SOUND_FALSE = document.querySelector('.audio-sound-false');
const END_BTN = document.querySelector('.btn-end');
const RESULTBTN = document.getElementById('result');
const DISPLAY = document.getElementById('display');

let firstTerm = document.getElementById('term__first');
let secondTerm = document.getElementById('term__second');
let variable = document.getElementById('variable');
let exercise = document.querySelector('.exercise');

let tutorialCheck = false;
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
let answer = undefined;
let answerUser = 0;
let loseCount = 3;
let delayLose = 3000;
let startAnimation = Date.now();
let timePassed;
let points = 10;
let eventClick = new Event('click');
let soundCheck = false;
let musicOn = false;
let soundOn = false;

// отрисовка падения шарика
let animation = () => {
  let drawAnimation = setInterval(() => {
    timePassed = Date.now() - startAnimation;
    if (timePassed > delayLose) {
      clearInterval(drawAnimation);
      lose();
    }
    draw(timePassed);
  }, 10)
}

let draw = (timePassed) => {
  exercise.style.top = timePassed / 7 + 'px';
};

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

let lose = () => {
  loseCount++;
  if (loseCount > 2) {
    TEXT_HEAD.textContent = 'Игра окончена';
    exercise.style.display = 'none';
    ENDGAME.style.display = 'flex';
    points = 10;
    tutorialCheck = false;
    gameRecord();
    CALC.style.display = 'none';
  } else {
    start();
  }
}

for (let i = 0; i < NUMBERBTNS.length; i++) {
  let numberBtn = NUMBERBTNS[i];
  numberBtn.addEventListener('click', (e) => {
    numberPress(e.target.textContent);
  });
};

for (let i = 0; i < OPERATIONBTNS.length; i++) {
  let operationBtn = OPERATIONBTNS[i];
  operationBtn.addEventListener('click', (e) => {
    operation(e.target.textContent);
  });
};

for (let i = 0; i < CLEARBTNS.length; i++) {
  let clearBtn = CLEARBTNS[i];
  clearBtn.addEventListener('click', (e) => {
    clear(e.target.id);
  });
};

let numberPress = (num) => {
  if (memoryNewNumber) {
    DISPLAY.value = num;
    memoryNewNumber = false;

  } else {

    if (DISPLAY.value === '0') {
      DISPLAY.value = num;

    } else {
      DISPLAY.value += num;
    };
  };
};

let operation = (oper) => {
  answerUser = DISPLAY.value;
  memoryNewNumber = true;
  DISPLAY.value = memoryCurrentNumber;
  memoryPendingOperation = oper;
};

let clear = (id) => {

  if (id === 'delete') {
    DISPLAY.value = DISPLAY.value.substring(0, DISPLAY.value.length - 1);
    memoryNewNumber = true;
    memoryCurrentNumber = DISPLAY.value;
    memoryPendingOperation = '';

  } else if (id === 'c' || 'result') {
    DISPLAY.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = '0';
    memoryPendingOperation = '';
  };
};

let start = () => {
  startAnimation = Date.now();
  left = random(1, 15) * 2;
  exercise.style.left = left + 'vw';
  firstTerm.textContent = random(7, 14);
  secondTerm.textContent = random(0, 7);
  randomSign();

  if (tutorialCheck === true) {
    setTimeout(() => RESULTBTN.dispatchEvent(eventClick), 100);
    setTimeout(() => animation(), 100);
  } else {
    animation();
  }
};

PLAY.addEventListener('click', () => {
  SCORE.textContent = 0;
  loseCount = 0;
  exercise.style.display = 'flex';
  ENDGAME.style.display = 'none';
  CALC.style.display = 'block';

  if (musicOn === true) {
    playAudio();
  }
  start();
})

TUTORIAL.addEventListener('click', () => {
  SCORE.textContent = 0;
  tutorialCheck = true;
  loseCount = 0;
  exercise.style.display = 'flex';
  ENDGAME.style.display = 'none';
  CALC.style.display = 'block'; 

  if (musicOn === true) {
    playAudio();
  }
  start();
});

RESULTBTN.addEventListener('click', () => {
  if (tutorialCheck === true) {
    answerUser = Number(answer);
  }
  if (Number(answer) === Number(answerUser)) {
    soundCheck = true;
    playSound()
    SCORE.textContent = points + Number(SCORE.textContent);
    points++;
    start();
  }
  else {
    soundCheck = false;
    playSound();
  }
})

// Музыка и звуки
MUSIC.addEventListener('click', () => {
  if (musicOn === true) {
    musicOn = false;
    MUSIC.textContent = 'Выключена';

  } else {
    musicOn = true;
    MUSIC.textContent = 'Включена';
  }
})

let playAudio = () => {
  AUDIO.play();
}
let pauseAudio = () => {
  AUDIO.pause();
}

SOUND.addEventListener('click', () => {
  if (soundOn === true) {
    soundOn = false;
    SOUND.textContent = 'Выключены';

  } else {
    soundOn = true;
    SOUND.textContent = 'Включены';
  }
})

let playSound = () => {
  if (soundOn === true) {
    if (soundCheck === true) {
      AUDIO_SOUND_TRUE.play();
    } else {
      AUDIO_SOUND_FALSE.play();
    }
  }
}

BTN_FULLSCREEN.addEventListener('click', () => {
  fullscreen();
})
// Полноэкранный режим
let fullscreen = () => {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenEnabled) {
    document.exitFullscreen();
  }
}
// генерация рандомного знака
let randomSign = () => {
  switch (random(0, 3)) {
    case 0:
      variable.textContent = '+';
      break;
    case 1:
      variable.textContent = '-';
      break;
    case 2:
      variable.textContent = '*';
      break;
  }
  switch (variable.textContent) {
    case '+':
      answer = Number(firstTerm.textContent) + Number(secondTerm.textContent);
      break;
    case '*':
      answer = Number(firstTerm.textContent) * Number(secondTerm.textContent);
      break;
    case '-':
      answer = Number(firstTerm.textContent) - Number(secondTerm.textContent);
      break;
  };
}

END_BTN.addEventListener('click', () => {
  endGame();
})

let endGame = () => {
  loseCount = 2;
  SCORE.textContent = 0;
  lose();
}

// Игра с клавиатуры
document.addEventListener('keydown', (e) => {
  let KEY = document.querySelector(`button[data-key="${e.code}"]`);
  switch (KEY.textContent) {
    case 'Delete': {
      id = 'delete';
      clear(id);
      break;
    }
    case 'Clear': {
      id = 'c';
      clear(id);
      break;
    }
    case 'Enter': {
      RESULTBTN.dispatchEvent(eventClick);
      if (loseCount > 2) {
        PLAY.dispatchEvent(eventClick);
      }
      break;
    }
    default:
      numberPress(KEY.textContent);
  }
})

let gameRecord = () => {
  if (Number(SCORE.textContent) > Number(record.textContent)) {
    record.textContent = window.localStorage = SCORE.textContent;
  }
}
record.textContent = window.localStorage;