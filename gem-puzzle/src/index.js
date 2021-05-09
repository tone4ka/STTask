import shuffle from './shuffle.js';
import getStepsList from './getStepsList.js';

let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);

const gameField = shuffle(cells);
console.log('gameField');
console.log(gameField);
cells = cells.join(' ');

// функция-перемещатель на один ход
// (по условию модифицирует само поле, поэтому в авторешении ее не использовала)
function move(positions) {
  if (typeof positions === 'string') return;
  const [posFrom, posTo] = positions;
  gameField[posTo] = gameField[posFrom];
  gameField[posFrom] = 0;
}

// функция автоматического решения (по условию возвращает на выходе собранное поле)
function autoGame(field, posList) {
  if (typeof posList === 'string') {
    return false;
  }
  const startFieldState = [...field];
  posList.forEach((item) => {
    const [posFrom, posTo] = item;
    startFieldState[posTo] = startFieldState[posFrom];
    startFieldState[posFrom] = 0;
  });
  console.log('finishFieldState:');
  console.log(startFieldState);
  return startFieldState;
}

// запуск функций
const list = getStepsList(gameField);
console.log('pathList:');
console.log(list);
autoGame(gameField, list);
