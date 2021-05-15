import './styles/styles.css';
import shuffle from './shuffle.js';
import getStepsList from './getStepsList.js';
import move from './move.js';

const cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);
const gameField = shuffle(cells);
console.log(`gameField: ${gameField}`);

// функция автоматического решения (по условию возвращает на выходе собранное поле)
function autoGame(field, posList) {
  if (typeof posList === 'string') return false;
  const startFieldState = posList.reduce((cur, item) => move(item, cur), [...field]);
  console.log(`finishFieldState ${startFieldState}`);
  return startFieldState;
}

// запуск функций
const pathList = getStepsList(gameField);
console.log(`pathList: [${pathList.join(']->[')}]`);
autoGame(gameField, pathList);
