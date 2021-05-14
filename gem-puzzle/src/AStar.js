import move from './move.js';

export default function AStar(field) {
  let parentStateField = [...field].join(' ');
  const openSteps = [];
  const closedSteps = [];
  let distance = 0;
  let isOpen;
  // функция определения следующего возможного состояния поля(добавляет его в список открытых шагов)
  const getNewOpenStep = (positions) => {
    const fieldArr = parentStateField.split(' ').map((i) => +i);
    const newStateField = move(positions, fieldArr);
    const heuristic = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    const step = newStateField.join(' ');
    if (!closedSteps.some((i) => i[0] === step)) {
      isOpen = openSteps.findIndex((i) => i[0] === step);
      if (isOpen === -1) {
        openSteps.push([step, parentStateField, distance, heuristic, distance + heuristic]);
      } else if (openSteps[isOpen][4] < distance + heuristic) {
        openSteps[isOpen] = [step, parentStateField, distance, heuristic, distance + heuristic];
      }
    }
  };
  // запускаем цикл поиска новых шагов для каждого соседа
  do {
    const parentStateFieldArr = parentStateField.split(' ').map((i) => +i);
    const posTo = parentStateFieldArr.indexOf(0);
    if (posTo > 3) getNewOpenStep([posTo - 4, posTo]);
    if (posTo % 4 !== 0) getNewOpenStep([posTo - 1, posTo]);
    if ((posTo + 1) % 4 !== 0) getNewOpenStep([posTo + 1, posTo]);
    if (posTo < 12) getNewOpenStep([posTo + 4, posTo]);
    // поиск нового шага с минимальным весом
    let minWeight = Infinity;
    let newStep;
    let newDistance;
    openSteps.forEach((item) => {
      if (item[4] < minWeight) {
        [, , , , minWeight] = item;
        [, , newDistance] = item;
        newStep = item;
      }
    });
    // обновляем параметры для нового шага и перемещаем его в закрытые
    distance = newDistance + 1;
    [parentStateField] = newStep;
    closedSteps.push(newStep);
    const currField = parentStateField;
    isOpen = openSteps.findIndex((i) => i[0] === currField);
    openSteps.splice(isOpen, 1);
  } while (parentStateField !== '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0');
  // возвращаем список закрытых вершин на момент нахождения правильного решения
  return closedSteps;
}
