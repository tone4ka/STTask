import './styles/styles.scss';
import shuffle from './shuffle';

let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);

const gameField = shuffle();
console.log('gameField');
console.log(gameField);

cells = cells.join(' ');
console.log(cells);
// const gameField = cells;

function move(positions) {
  if (typeof positions === 'string') return;
  const [posFrom, posTo] = positions;
  gameField[posTo] = gameField[posFrom];
  gameField[posFrom] = 0;
  console.log('new state gamefield:');
  console.log(gameField);
}

function stepsList(field) {
  let currentStateField = [...field].join(' ');
  let h;
  let step;
  // местный перемещатель
  function currentMove(positions) {
    const newStateField = currentStateField.split(' ').map((i) => +i);
    const [posFrom, posTo] = positions;
    newStateField[posTo] = newStateField[posFrom];
    newStateField[posFrom] = 0;
    h = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    step = newStateField.join(' ');
  }
  // проверка на уже собранное поле, убрать?
  const win = gameField.every((i, ind, arr) => {
    if (ind === 15) return i === 0;
    if (ind === 0) return i === 1;
    return i === arr[ind - 1] + 1;
  });
  if (win) {
    console.log('win');
    return 'Win!';
  }
  // проверка на существование решения
  let posTo = field.indexOf(0);
  let counter = 0;
  field.forEach((item, index) => {
    for (let i = index + 1; i < field.length; i += 1) {
      if (item > field[i]) counter += 1;
    }
  });
  counter = counter + Math.trunc(posTo / 4) + 1;
  if (counter % 2 !== 0) {
    console.log('no solution');
    // return 'no solution!';
  }
  // алгоритм А*..................
  // шаг 1
  const stepParentGHFopen = [];
  const stepParentGHFclosed = [];
  // заменить парент на индексы клеток, или добавить такой параметр??????????
  let parent = null;
  let g = 0;
  h = field.reduce((count, i, ind) => {
    if (ind !== 15) return i !== ind + 1 ? count + 1 : count;
    return i !== 0 ? count + 1 : count;
  }, 0);
  let f = g + h;
  step = currentStateField;
  stepParentGHFopen.push([step, parent, g, h, f]);

  // шаг 2 гоняем циклом остальных соседей
  let counterCircle = 0;
  while (stepParentGHFopen.length > 0) {
  // while (counterCircle < 10000) {
    let isOpen;
    counterCircle += 1;
    // добавляем нулевую вершину в закрытые и убираем из открытых
    if (parent === null) {
      stepParentGHFclosed.push([step, parent, g, h, f]);
      isOpen = stepParentGHFopen.findIndex((i) => i[0] === step);
      stepParentGHFopen.splice(isOpen, 1);
    }
    g += 1; // увеличиваем на каждой итерации
    const currentStateFieldArr = currentStateField.split(' ').map((i) => +i);
    parent = currentStateField;
    posTo = currentStateFieldArr.indexOf(0);
    if (posTo > 3) {
      currentMove([posTo - 4, posTo]);
      f = g + h;
      // если нет в списке закрытых вершин-смотрим в открытые
      if (!stepParentGHFclosed.some((i) => i[0] === step)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === step);
        // если есть в списке открытых-пересчитываем параметры
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          // если нет в списке открытых-добавляем
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
      }
      if (step === cells) {
        stepParentGHFclosed.push([step, parent, g, h, f]);
        console.log('uuuuuuuuhhhyyyyyyy');
        break;
      }
    }
    if (posTo % 4 !== 0) {
      currentMove([posTo - 1, posTo]);
      f = g + h;
      // если нет в списке закрытых вершин-смотрим в открытые
      if (!stepParentGHFclosed.some((i) => i[0] === step)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === step);
        // если есть в списке открытых-пересчитываем параметры
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          // если нет в списке открытых-добавляем
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
      }
      if (step === cells) {
        stepParentGHFclosed.push([step, parent, g, h, f]);
        console.log('uuuuuuuuhhhyyyyyyy');
        break;
      }
    }
    if ((posTo + 1) % 4 !== 0) {
      currentMove([posTo + 1, posTo]);
      f = g + h;
      // если нет в списке закрытых вершин-смотрим в открытые
      if (!stepParentGHFclosed.some((i) => i[0] === step)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === step);
        // если есть в списке открытых-пересчитываем параметры
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          // если нет в списке открытых-добавляем
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
      }
      if (step === cells) {
        stepParentGHFclosed.push([step, parent, g, h, f]);
        console.log('uuuuuuuuhhhyyyyyyy');
        break;
      }
    }
    if (posTo < 12) {
      currentMove([posTo + 4, posTo]);
      f = g + h;
      // если нет в списке закрытых вершин-смотрим в открытые
      if (!stepParentGHFclosed.some((i) => i[0] === step)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === step);
        // если есть в списке открытых-пересчитываем параметры
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          // если нет в списке открытых-добавляем
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
        if (step === cells) {
          stepParentGHFclosed.push([step, parent, g, h, f]);
          console.log('uuuuuuuuhhhyyyyyyy');
          break;
        }
      }
    }
    // теперь шаг 3: найти новую позту по весу и изменить куррентфилд?
    let minF = Infinity;
    let newStep = null;
    let newG = null;
    stepParentGHFopen.forEach((i) => {
      if (i[4] < minF) {
        minF = i[4];
        newG = i[2];
        newStep = i;
      }
    });
    g = newG;
    [currentStateField] = newStep;
    // добавляем первую вершину в закрытые и убираем из открытых
    stepParentGHFclosed.push(newStep);
    isOpen = stepParentGHFopen.findIndex((i) => i[0] === currentStateField);
    stepParentGHFopen.splice(isOpen, 1);
  }
  console.log(stepParentGHFclosed);
  console.log(stepParentGHFopen);

  // return steps; // потом поменять на список шагов
}

stepsList(gameField);
