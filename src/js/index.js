// при клике по кнопке 'How to play' игра запускается в автоматическом режиме
// правильные и неправильные ответы сопровождаются анимацией. Также есть анимация волн
// минимальная ширина страницы, при которой приложение отображается корректно – 320 рх
// набирать и вводить ответ можно не только кликая мышкой, но и при помощи клавиатуры
// иногда выпадают бонусные капли другого цвета, решение выражений в которых полностью очищает игровое поле от других капель
// сделать волну и  смерть когда капля косается волны
// в ходе игры скорость падения капель постепенно увеличивается
// приложение можно развернуть на весь экран

const NUMBERBTNS = document.querySelectorAll('.number');
const OPERATIONBTNS = document.querySelectorAll('.operation');
const CLEARBTNS = document.querySelectorAll('.clear');
const SCORE = document.querySelector('.score__num');
const MUSIC = document.querySelector('.music');
const ENDSCORE = document.querySelector('.end__score');
const PLAY = document.querySelector('.play');
const ENDGAME = document.querySelector('.end');
const TEXT_HEAD = document.querySelector('.text-head');
const TEXT_SCORE = document.querySelector('.end__score--text');
//const TUTORIAL = document.querySelector('.tutorial');
const AUDIO = document.querySelector('.audio-background');
const SOUND = document.querySelector('.sound');
const AUDIO_SOUND_TRUE = document.querySelector('.audio-sound-true');
const AUDIO_SOUND_FALSE = document.querySelector('.audio-sound-false');
const RESULTBTN = document.getElementById('result');
const DISPLAY = document.getElementById('display');

let firstTerm = document.getElementById('term__first');
let secondTerm = document.getElementById('term__second');
let variable = document.getElementById('variable');
let exercise = document.querySelector('.exercise');

//let tutorialCheck = false;
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
let answer = 0;
let answerUser = 0;
let loseCount = 0;
let delayLose = 3000;
let startAnimation = Date.now();
let timePassed;
let points = 10;
let eventClick = new Event('click');
let soundCheck = false;
let musicOn = false;
let soundOn = false;

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
    TEXT_SCORE.style.display = 'block';
    exercise.style.display = 'none';
    ENDGAME.style.display = 'flex';
    SCORE.textContent = 0;
    points = 10;
    // tutorialCheck = false;
  } else {
    console.log('lose');
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
  left = random(0, 10) * 5;
  exercise.style.left = left + 'rem';
  firstTerm.textContent = random(7, 14);
  secondTerm.textContent = random(0, 7);

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
  // if (tutorialCheck = true) {
  //   setTimeout(RESULTBTN.dispatchEvent(eventClick), 2000);
  // }
  animation();
};

PLAY.addEventListener('click', () => {
  loseCount = 0;
  ENDSCORE.textContent = 0;
  exercise.style.display = 'flex';
  ENDGAME.style.display = 'none';
  if (musicOn === true) {
    playAudio();
  }
  start();
})

// TUTORIAL.addEventListener('click', () => {
//   tutorialCheck = true;
//   loseCount = 0;
//   ENDSCORE.textContent = 0;
//   exercise.style.display = 'flex';
//   ENDGAME.style.display = 'none';
// if (musicOn === true) {
//   playAudio();
// }
//   start();
// });

RESULTBTN.addEventListener('click', () => {
  // if (tutorialCheck === true) {
  //   Number(answerUser) = Number(answer);
  // }
  if (Number(answer) === Number(answerUser)) {
    soundCheck = true
    playSound()
    SCORE.textContent = points + Number(SCORE.textContent);
    points++;
    ENDSCORE.textContent = SCORE.textContent;
    start();
  }
  else {
    soundCheck = false;
    playSound()
  }
})


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