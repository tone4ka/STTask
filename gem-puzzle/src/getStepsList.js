// функция, выдающая список ходов для переданного состояния поля
export default function getStepsList(field) {
  const cells = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0';
  let currentStateField = [...field].join(' ');
  // проверяем, не в собранном ли состоянии передано поле
  if ([...field].join(' ') === cells) {
    console.log('!!!the list is complete!');
    return [];
  }
  // проверяем, имеет ли решение переданное состояние поля
  let posTo = currentStateField.indexOf(0);
  let parity = 0;
  field.forEach((item, index) => {
    for (let i = index + 1; i < field.length; i += 1) {
      if (item > field[i] && field[i] !== 0) parity += 1;
    }
  });
  parity = parity + Math.trunc(posTo / 4) + 1;
  console.log(parity);
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
  let heuristic = field.reduce((count, i, ind) => {
    if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
    return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
  }, 0);
  let step = currentStateField;
  openSteps.push([step, parent, distance, heuristic, distance + heuristic]);
  let isOpen;
  // для остальных шагов:
  // функция для определения следующего возможного состояния поля
  // без изменения текущего состояния поля
  // используем в цикле для проверки соседей
  const updateStep = (positions) => {
    const newStateField = currentStateField.split(' ').map((i) => +i);
    const [positionFrom, positionTo] = positions;
    newStateField[positionTo] = newStateField[positionFrom];
    newStateField[positionFrom] = 0;
    heuristic = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    step = newStateField.join(' ');
  };
  // используем в цикле проверки соседей для обновления списка открытых шагов
  const updateOpenSteps = (currentStep) => {
    if (!closedSteps.some((i) => i[0] === currentStep)) {
      isOpen = openSteps.findIndex((i) => i[0] === currentStep);
      if (isOpen !== -1) {
        if (openSteps[isOpen][4] < distance + heuristic) {
          openSteps[isOpen] = [step, parent, distance, heuristic, distance + heuristic];
        }
      } else {
        openSteps.push([step, parent, distance, heuristic, distance + heuristic]);
      }
    }
  };
  // цикл для остальных шагов
  // while (openSteps.length > 0) {
  do {
    if (parent === null) {
      // перемещаем нулевой шаг в закрытые
      closedSteps.push([step, parent, distance, heuristic, distance + heuristic]);
      const stepNull = step;
      isOpen = openSteps.findIndex((i) => i[0] === stepNull);
      openSteps.splice(isOpen, 1);
    }
    parent = currentStateField;
    const currentStateFieldArr = currentStateField.split(' ').map((i) => +i);
    posTo = currentStateFieldArr.indexOf(0);
    if (posTo > 3) {
      // если не первая строка, проверяем верхнего соседа
      updateStep([posTo - 4, posTo]);
      updateOpenSteps(step);
      // if (step === cells) {
      //   closedSteps.push([step, parent, distance, heuristic, distance + heuristic]);
      //   break;
      // }
    }
    if (posTo % 4 !== 0) {
      // если не левый столбец, проверяем левого соседа
      updateStep([posTo - 1, posTo]);
      updateOpenSteps(step);
      // if (step === cells) {
      //   closedSteps.push([step, parent, distance, heuristic, distance + heuristic]);
      //   break;
      // }
    }
    if ((posTo + 1) % 4 !== 0) {
      // если не правый столбец, проверяем правого соседа
      updateStep([posTo + 1, posTo]);
      updateOpenSteps(step);
      // if (step === cells) {
      //   closedSteps.push([step, parent, distance, heuristic, distance + heuristic]);
      //   break;
      // }
    }
    if (posTo < 12) {
      // если не последняя строка, проверяем нижнего соседа
      updateStep([posTo + 4, posTo]);
      updateOpenSteps(step);
      // if (step === cells) {
      //   closedSteps.push([step, parent, distance, heuristic, distance + heuristic]);
      //   break;
      // }
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
    distance = newDistance + 1;
    [currentStateField] = newStep;
    closedSteps.push(newStep);
    const currField = currentStateField;
    isOpen = openSteps.findIndex((i) => i[0] === currField);
    openSteps.splice(isOpen, 1);
  } while (step !== cells);
  // console.log(`closed: ${closedSteps}`);

  // создаем список родителей для собранного состояния
  let curState = cells;
  const parentsArr = [];
  do {
    const state = curState;
    const elem = closedSteps.find((i) => i[0] === state);
    [, curState] = elem;
    parentsArr.unshift(curState);
  } while (curState !== [...field].join(' '));
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
