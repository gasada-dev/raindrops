const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operation');
const resultBtn = document.getElementById('result');
const clearBtns = document.querySelectorAll('.clear');
const display = document.getElementById('display');
let score = document.querySelectorAll('.score__num').textContent;

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

for (let i = 0; i < numberBtns.length; i++) {
  let numberBtn = numberBtns[i];
  numberBtn.addEventListener('click', (e) => {
    numberPress(e.target.textContent);
  });
};

for (let i = 0; i < operationBtns.length; i++) {
  let operationBtn = operationBtns[i];
  operationBtn.addEventListener('click', (e) => {
    operation(e.target.textContent);
  });
};

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', (e) => {
    clear(e.target.id);
  });
};


function numberPress(num) {

  if (memoryNewNumber) {

    display.value = num;
    memoryNewNumber = false;

  } else {

    if (display.value === '0') {
      display.value = num;

    } else {
      display.value += num;
    };
  };
};

function operation(oper) {

  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;

  } else {
    memoryNewNumber = true;
    display.value = memoryCurrentNumber;
    memoryPendingOperation = oper;
  };
};



function clear(id) {

  if (id === 'delete') {
    display.value = display.value.substring(0, display.value.length - 1);
    memoryNewNumber = true;
    memoryCurrentNumber = display.value;
    memoryPendingOperation = '';

  } else if (id === 'c' || 'result') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = '0';
    memoryPendingOperation = '';
  };
};

resultBtn.addEventListener('click', result); //---result---
score.textContent = '1';
