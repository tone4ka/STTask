import './styles/styles.css';  
// если раскомментировать импорт и удалить в package.json type:module - можно смотреть результаты в консоли браузера(npm run dev)
import shuffle from './shuffle.js';
import moveLong from './moveLong.js';
import getStepsListLong from './getStepsListLong.js';

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
  const startFieldState = posList.reduce((cur, item) => moveLong(item, cur)[0], [...field]);
  console.log(`finishFieldState ${startFieldState}`);
  return startFieldState;
}

// запуск функций
const pathList = getStepsListLong(gameField);

const pathСouplesForPrint = pathList.map((item)=>item.map((i)=>i.join(' to ')).join(' -> '));
console.log(`pathList: [${pathСouplesForPrint.join('] ---> [')}]`);

autoGame(gameField, pathList);
