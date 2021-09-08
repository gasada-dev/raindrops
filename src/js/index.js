const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operation');
const resultBtn = document.getElementById('result');
const clearBtns = document.querySelectorAll('.clear');
const display = document.getElementById('display');

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

resultBtn.addEventListener('click', result);

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
    // need add 'delete func' 

  } else if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = '0';
    memoryPendingOperation = '';
  };
};


