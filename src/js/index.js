const NUMBERBTNS = document.querySelectorAll('.number');
const OPERATIONBTNS = document.querySelectorAll('.operation');
const RESULTBTN = document.getElementById('result');
const CLEARBTNS = document.querySelectorAll('.clear');
const DISPLAY = document.getElementById('display');
const SCORE = document.querySelector('.score__num');

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

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


function numberPress(num) {
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

function operation(oper) {

  SCORE.textContent = Number(DISPLAY.value) + Number(SCORE.textContent);
  memoryNewNumber = true;
  DISPLAY.value = memoryCurrentNumber;
  memoryPendingOperation = oper;
};

function clear(id) {

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

RESULTBTN.addEventListener('click', result);



