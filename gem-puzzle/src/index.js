import shuffle from './shuffle.js';
import getStepsList from './getStepsList.js';
import move from './move.js';

let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);
const gameField = shuffle(cells);
console.log(`gameField: ${gameField}`);
cells = cells.join(' ');

// функция автоматического решения (по условию возвращает на выходе собранное поле)
function autoGame(field, posList) {
  if (typeof posList === 'string') return false;
  const startFieldState = posList.reduce((cur, item) => move(item, cur), [...field]);
  console.log(`finishFieldState ${startFieldState}`);
  return startFieldState;
}

// запуск функций
const list = getStepsList(gameField);
console.log(`pathList: ${list}`);
autoGame(gameField, list);
