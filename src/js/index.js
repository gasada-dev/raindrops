// после окончания игры выводится счёт и статистика игры - done
// при клике по кнопке 'How to play' игра запускается в автоматическом режиме
// правильные и неправильные ответы сопровождаются звуковыми сигналами и анимацией. Также есть фоновый звук и анимация волн
// минимальная ширина страницы, при которой приложение отображается корректно – 320 рх
// в ходе игры скорость падения капель постепенно увеличивается
// счёт игры увеличивается по нарастающей - 10 баллов за первый правильный, каждый следующий ответ приносит на один балл больше, чем предыдуший
// иногда выпадают бонусные капли другого цвета, решение выражений в которых полностью очищает игровое поле от других капель
// набирать и вводить ответ можно не только кликая мышкой, но и при помощи клавиатуры
// приложение можно развернуть на весь экран
// кнопки how to play, main menu, play

const NUMBERBTNS = document.querySelectorAll('.number');
const OPERATIONBTNS = document.querySelectorAll('.operation');
const RESULTBTN = document.getElementById('result');
const CLEARBTNS = document.querySelectorAll('.clear');
const DISPLAY = document.getElementById('display');
const SCORE = document.querySelector('.score__num');
const ENDSCORE = document.querySelector('.end__score');
const PLAY = document.querySelector('.play');
const ENDGAME = document.querySelector('.end');

let firstTerm = document.getElementById('term__first');
let secondTerm = document.getElementById('term__second');
let variable = document.getElementById('variable');
let exercise = document.querySelector('.exercise');

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
let answer = 0;
let answerUser = 0;
let loseCount = 0;
let delayLose = 3000;
let startAnimation = Date.now();
let timePassed;

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
    console.log('end');
    exercise.style.display = 'none';
    ENDGAME.style.display = 'flex';
    SCORE.textContent = 0;

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
  animation();
};

RESULTBTN.addEventListener('click', () => {
  if (Number(answer) === Number(answerUser)) {
    SCORE.textContent = Number(answer) + Number(SCORE.textContent);
    if (Number(answer) === 0) {
      SCORE.textContent = 10 + Number(SCORE.textContent);
    }
    ENDSCORE.textContent = SCORE.textContent;
    start();
  }
})

PLAY.addEventListener('click', () => {
  loseCount = 0;
  ENDSCORE.textContent = 0;
  exercise.style.display = 'flex';
  ENDGAME.style.display = 'none';
  start();
})

start();
