import './styles/styles.scss';
import shuffle from './shuffle';
import getStepsList from './getStepsList';

let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);
const gameField = shuffle(cells);
console.log('gameField');
console.log(gameField);
cells = cells.join(' ');
console.log(cells);

// функция-перемещатель на один ход
// (по условию модифицирует само поле, поэтому в авторешении ее не использовала)
function move(positions) {
  if (typeof positions === 'string') return;
  const [posFrom, posTo] = positions;
  gameField[posTo] = gameField[posFrom];
  gameField[posFrom] = 0;
}

// функция автоматического решения (по условию возвращает на выходе собранное поле)
function runAutoGame(field, posList) {
  if (typeof posList === 'string') {
    return false;
  }
  const finishFieldState = [...field];
  posList.forEach((item) => {
    const [posFrom, posTo] = item;
    finishFieldState[posTo] = finishFieldState[posFrom];
    finishFieldState[posFrom] = 0;
  });
  console.log('finishFieldState:');
  console.log(finishFieldState);
  return finishFieldState;
}

// запуск функций
const list = getStepsList(gameField);
console.log('pathList:');
console.log(list);
runAutoGame(gameField, list);
