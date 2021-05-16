import AStar from './AStar.js';

// функция, выдающая список ходов для переданного состояния поля
export default function getStepsList(field) {
  // проверяем, не в собранном ли состоянии передано поле
  if ([...field].join(' ') === '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0') return [];
  // проверяем, имеет ли решение переданное состояние поля
  const indexOfNull = field.indexOf(0);
  let parity = 0;
  field.forEach((item, index) => {
    for (let i = index + 1; i < field.length; i += 1) {
      if (item > field[i] && field[i] !== 0) parity += 1;
    }
  });
  parity = parity + Math.trunc(indexOfNull / 4) + 1;
  if (parity % 2 !== 0) {
    console.log('no solution');
    return 'no solution!';
  }
  const AStarСlosedSteps = AStar(field);
  // создаем список родителей, начиная с собранного состояния
  let curState = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0';
  const parentsArr = [];
  do {
    const state = curState;
    const elem = AStarСlosedSteps.find((i) => i[0] === state);
    [, curState] = elem;
    parentsArr.unshift(curState);
  } while (curState !== [...field].join(' '));

  // создаем список оптимальных ходов, определяя позиции ходов по списку родителей
  const pathList = [];
  for (let i = 0; i < parentsArr.length; i += 1) {
    const posTo = parentsArr[i].split(' ').indexOf('0');
    const posFrom = (i === parentsArr.length - 1) ? 15 : parentsArr[i + 1].split(' ').indexOf('0');
    pathList.push([posFrom, posTo]);
  }
  return pathList;
}