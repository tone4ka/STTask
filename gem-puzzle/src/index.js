import './styles/styles.scss';
import shuffle from './shuffle';
import startGame from './showUI';

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

// запуск игры
startGame(gameField);
