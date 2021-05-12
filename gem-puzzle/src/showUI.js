import shuffle from './shuffle';
import moveCell from './moveCell';
import autoRun from './autoRun';

let gridBox;
let volume;
const audioMp = document.createElement('audio');
let vol = true;
let cells = [];
let cellsNum = [];
const truPositions = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0';

// подключаем аудио
function audio() {
  audioMp.src = './assets/audio/ce0e8436ec97817.mp3';
  if (vol) {
    audioMp.play();
  }
}

// ф-ция вкл/выкл. звука
function sounbButton() {
  volume = document.querySelector('.btnVol');
  if (vol === false) {
    vol = true;
  } else {
    vol = false;
  }
}

// функция создания коробки
let gameBox;
function createGameBox() {
  document.body.innerHTML = '';
  gameBox = document.createElement('div');
  gameBox.style.width = '500px';
  gameBox.style.height = '500px';
  document.body.appendChild(gameBox).classList.add('gameBox');
  gridBox = document.createElement('div');
  gridBox.style.width = '400px';
  gridBox.style.height = '400px';
  gameBox.appendChild(gridBox).classList.add('grid');
}

// функция создания панели навигации
let move;
let moves = 0;
let reset;
function navigationCreate() {
  const navigation = document.createElement('div');
  gameBox.appendChild(navigation).classList.add('navigation');

  reset = document.createElement('button');
  reset.innerHTML = 'RESET';
  navigation.appendChild(reset).classList.add('navItem', 'reset');

  move = document.createElement('div');
  move.innerText = `Move:${moves}`;
  navigation.appendChild(move).classList.add('navItem', 'move');

  volume = document.createElement('button');
  navigation.appendChild(volume).classList.add('navItem', 'btnVol');
  volume.addEventListener('click', () => sounbButton());

  const autoPlay = document.createElement('button');
  autoPlay.innerHTML = 'AUTO PLAY';
  autoPlay.addEventListener('click', () => autoRun(cells, cellsNum, move));
  navigation.appendChild(autoPlay).classList.add('navItem', 'reset');
}

// функция создания клеток с цифрами
let nullCell;
function createDigitCells(field) {
  field.forEach((item) => {
    const cell = document.createElement('div');
    if (item === 0) {
      cell.classList.add('cell', 'nullCell'); // пустая клетка
    } else {
      cell.classList.add('cell', `cell${item}`);
      cell.innerText = `${item}`;
    }
    cells.push(cell);
    cell.style.width = '99px';
    cell.style.height = '99px';
  });
}

// вставляем клетки в коробку
function setInBox() {
  let left = 0;
  for (let i = 0; i < cells.length; i += 1) {
    const top = Math.trunc(i / 4);
    cells[i].style.top = `${top * 100}px`;
    cells[i].style.left = `${left * 100}px`;
    gridBox.appendChild(cells[i]);
    left += 1;
    if (left > 3) left = 0;
  }
}

// обработчик кликов для двиджения клеток
function gameProcess() {
  gridBox.addEventListener('click', (event) => {
    const target = event.target.classList.contains('cell') ? event.target : event.target.closest('.cell');
    if (target && !target.classList.contains('nullCell')) {
      nullCell = cells.find((cell) => cell.classList.contains('nullCell'));
      const currentCell = cells.find((cell) => cell.classList.value === target.classList.value);
      const leftPosNull = +nullCell.style.left.substr(0, nullCell.style.left.length - 2);
      const topPosNull = +nullCell.style.top.substr(0, nullCell.style.top.length - 2);
      const leftPosCur = +target.style.left.substr(0, target.style.left.length - 2);
      const topPosCur = +target.style.top.substr(0, target.style.top.length - 2);
      const nullIndex = cells.findIndex((cell) => cell.classList.contains('nullCell'));
      const currIndex = cells.findIndex((cell) => cell.classList.value === target.classList.value);
      if (
        (nullIndex > 3 && currIndex + 4 === nullIndex) ||
        (nullIndex % 4 !== 0 && currIndex + 1 === nullIndex) ||
        ((nullIndex + 1) % 4 !== 0 && currIndex - 1 === nullIndex) ||
        (nullIndex < 12 && currIndex - 4 === nullIndex)
      ) {
        audio();
        moves += 1;
        move.innerText = `Move:${moves}`;
        nullCell.style.left = `${leftPosCur}px`;
        nullCell.style.top = `${topPosCur}px`;
        currentCell.style.left = `${leftPosNull}px`;
        currentCell.style.top = `${topPosNull}px`;
        moveCell([currIndex, nullIndex], cells, cellsNum);
        if (cells.join(' ') === truPositions) {
          alert(`Ура! Вы решили головоломку за ${moves} ходов!`);
        }
      }
    }
  });
}

// функция перезагрузки
function resetGame() {
  moves = 0;
  gridBox.innerHTML = '';
  cells = [];
  cellsNum = [];
  for (let i = 1; i <= 15; i += 1) {
    cellsNum.push(i);
  }
  cellsNum.push(0);
  cellsNum = shuffle(cellsNum);
  createDigitCells(cellsNum);
  setInBox();
}

// ф-ция начала игры
export default function startGame(field) {
  cellsNum = [...field];
  createGameBox();
  createDigitCells(cellsNum);
  setInBox();
  navigationCreate();
  reset.addEventListener('click', () => resetGame());
  gameProcess();
}
