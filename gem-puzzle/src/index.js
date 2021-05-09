let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);

// функция для перемешивания массивов
function shuffle(cellsArr) {
  const shuffleArr = [...cellsArr];
  function mover(positions) {
    const [posFrom, posTo] = positions;
    shuffleArr[posTo] = shuffleArr[posFrom];
    shuffleArr[posFrom] = 0;
  }
  for (let i = 0; i < 40; i += 1) {
    const posTo = shuffleArr.indexOf(0);
    const pisitions = [];
    if (posTo > 3) {
      pisitions.push([posTo - 4, posTo]);
    }
    if (posTo % 4 !== 0) {
      pisitions.push([posTo - 1, posTo]);
    }
    if ((posTo + 1) % 4 !== 0) {
      pisitions.push([posTo + 1, posTo]);
    }
    if (posTo < 12) {
      pisitions.push([posTo + 4, posTo]);
    }
    mover(pisitions[Math.floor(Math.random() * pisitions.length)]);
  }
  return shuffleArr;
}

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

// функция, выдающая список ходов для переданного состояния поля
function stepsList(field) {
  const startFieldState = [...field].join(' ');
  let currentStateField = [...field].join(' ');
  let heuristic; // на сколько позиция клетки отличается от нужной
  let step;
  // функция для определения следующего возможного состояния поля
  // без изменения текущего состояния поля
  function updateStep(positions) {
    const newStateField = currentStateField.split(' ').map((i) => +i);
    const [posFrom, posTo] = positions;
    newStateField[posTo] = newStateField[posFrom];
    newStateField[posFrom] = 0;
    heuristic = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    step = newStateField.join(' ');
  }
  // проверяем, не в собранном ли состоянии передано поле
  const win = gameField.every((i, ind, arr) => {
    if (ind === 15) return i === 0;
    if (ind === 0) return i === 1;
    return i === arr[ind - 1] + 1;
  });
  if (win) {
    console.log('the list is complete!');
    return [];
  }
  // проверяем, имеет ли решение переданное состояние поля
  let posTo = field.indexOf(0);
  let parity = 0;
  field.forEach((item, index) => {
    for (let i = index + 1; i < field.length; i += 1) {
      if (item > field[i] && field[i] !== 0) parity += 1;
    }
  });
  parity = parity + Math.trunc(posTo / 4) + 1;
  if (parity % 2 !== 0) {
    console.log('no solution');
    return 'no solution!';
  }
  // алгоритм А* для поиска решения головоломки..................
  // для нулевого шага
  const openSteps = [];
  const closedSteps = [];
  let parent = null;
  let distance = 0;
  heuristic = field.reduce((count, i, ind) => {
    if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
    return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
  }, 0);
  let weight = distance + heuristic;
  step = currentStateField;
  openSteps.push([step, parent, distance, heuristic, weight]);

  // цикл для остальных шагов
  while (openSteps.length > 0) {
    let isOpen;
    if (parent === null) {
      // перемещаем нулевой шаг в закрытые
      closedSteps.push([step, parent, distance, heuristic, weight]);
      const stepNull = step;
      isOpen = openSteps.findIndex((i) => i[0] === stepNull);
      openSteps.splice(isOpen, 1);
    }
    distance += 1;
    parent = currentStateField;
    const currentStateFieldArr = currentStateField.split(' ').map((i) => +i);
    posTo = currentStateFieldArr.indexOf(0);
    if (posTo > 3) {
      // если не первая строка, проверяем верхнего соседа
      updateStep([posTo - 4, posTo]);
      weight = distance + heuristic;
      const stepNotFirstString = step;
      if (!closedSteps.some((i) => i[0] === stepNotFirstString)) {
        isOpen = openSteps.findIndex((i) => i[0] === stepNotFirstString);
        if (isOpen !== -1) {
          if (openSteps[isOpen][4] < weight) {
            openSteps[isOpen] = [step, parent, distance, heuristic, weight];
          }
        } else {
          openSteps.push([step, parent, distance, heuristic, weight]);
        }
      }
      if (step === cells) {
        closedSteps.push([step, parent, distance, heuristic, weight]);
        break;
      }
    }
    if (posTo % 4 !== 0) {
      // если не левый столбец, проверяем левого соседа
      updateStep([posTo - 1, posTo]);
      weight = distance + heuristic;
      const stepNotLeft = step;
      if (!closedSteps.some((i) => i[0] === stepNotLeft)) {
        isOpen = openSteps.findIndex((i) => i[0] === stepNotLeft);
        if (isOpen !== -1) {
          if (openSteps[isOpen][4] < weight) {
            openSteps[isOpen] = [step, parent, distance, heuristic, weight];
          }
        } else {
          openSteps.push([step, parent, distance, heuristic, weight]);
        }
      }
      if (step === cells) {
        closedSteps.push([step, parent, distance, heuristic, weight]);
        break;
      }
    }
    if ((posTo + 1) % 4 !== 0) {
      // если не правый столбец, проверяем правого соседа
      updateStep([posTo + 1, posTo]);
      weight = distance + heuristic;
      const stepNotRight = step;
      if (!closedSteps.some((i) => i[0] === stepNotRight)) {
        isOpen = openSteps.findIndex((i) => i[0] === stepNotRight);
        if (isOpen !== -1) {
          if (openSteps[isOpen][4] < weight) {
            openSteps[isOpen] = [step, parent, distance, heuristic, weight];
          }
        } else {
          openSteps.push([step, parent, distance, heuristic, weight]);
        }
      }
      if (step === cells) {
        closedSteps.push([step, parent, distance, heuristic, weight]);
        break;
      }
    }
    if (posTo < 12) {
      // если не последняя строка, проверяем нижнего соседа
      updateStep([posTo + 4, posTo]);
      weight = distance + heuristic;
      const stepNotLastString = step;
      if (!closedSteps.some((i) => i[0] === stepNotLastString)) {
        isOpen = openSteps.findIndex((i) => i[0] === stepNotLastString);
        if (isOpen !== -1) {
          if (openSteps[isOpen][4] < weight) {
            openSteps[isOpen] = [step, parent, distance, heuristic, weight];
          }
        } else {
          openSteps.push([step, parent, distance, heuristic, weight]);
        }
        if (step === cells) {
          closedSteps.push([step, parent, distance, heuristic, weight]);
          break;
        }
      }
    }
    // поиск нового шага с минимальным весом
    let minWeight = Infinity;
    let newStep = null;
    let newDistance = null;
    openSteps.forEach((item) => {
      if (item[4] < minWeight) {
        [, , , , minWeight] = item;
        [, , newDistance] = item;
        newStep = item;
      }
    });
    // обновляем параметры для нового шага и перемещаем его в закрытые
    distance = newDistance;
    [currentStateField] = newStep;
    closedSteps.push(newStep);
    const currField = currentStateField;
    isOpen = openSteps.findIndex((i) => i[0] === currField);
    openSteps.splice(isOpen, 1);
  }
  console.log('closed:');
  console.log(closedSteps);

  // создаем список родителей для собранного состояния
  let curState = cells;
  const parentsArr = [];
  do {
    const state = curState;
    const elem = closedSteps.find((i) => i[0] === state);
    [, curState] = elem;
    parentsArr.unshift(curState);
  } while (curState !== startFieldState);
  // создаем список оптимальных ходов, определяя позиции ходов по списку родителей
  const pathList = [];
  for (let i = 0; i < parentsArr.length; i += 1) {
    const pposTo = parentsArr[i].split(' ').indexOf('0');
    if (i === parentsArr.length - 1) {
      pathList.push([15, posTo]);
    } else {
      const pposFrom = parentsArr[i + 1].split(' ').indexOf('0');
      pathList.push([pposFrom, pposTo]);
    }
  }
  console.log('the list is complete!');
  return pathList;
}

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
const list = stepsList(gameField);
console.log('pathList:');
console.log(list);
autoGame(gameField, list);
