import './styles/styles.scss';
import shuffle from './shuffle';
import startGame from './showUI';

let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);
const gameField = shuffle(cells);
cells = cells.join(' ');

// запуск игры
startGame(gameField);
