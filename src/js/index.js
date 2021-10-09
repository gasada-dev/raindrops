const NUMBERBTNS = document.querySelectorAll('.number');
const OPERATIONBTNS = document.querySelectorAll('.operation');
const RESULTBTN = document.getElementById('result');
const CLEARBTNS = document.querySelectorAll('.clear');
const DISPLAY = document.getElementById('display');
const SCORE = document.querySelector('.score__num');
const ANIMATION = document.querySelectorAll('.animation');

let firstTerm = document.getElementById('term__first');
let secondTerm = document.getElementById('term__second');
let variable = document.getElementById('variable');
let exercise = document.querySelector('.exercise');

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';
let answer = 0;
let answerUser = 0;

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};


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
  }

};

RESULTBTN.addEventListener('click', () => {
  console.log('answerUser', answerUser);
  console.log('answer', answer);
  if (Number(answer) === Number(answerUser)) {
    SCORE.textContent = Number(answer) + Number(SCORE.textContent); 
    exercise.classList.remove ('animation');
    setTimeout(function() {
      exercise.classList.add ('animation');
  }, 10);
    start();

  }
});

start();