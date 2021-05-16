import AStarLong from './AStarLong';

// функция, выдающая список ходов для переданного состояния поля
export default function getStepsListLong(field) {
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
  const AStarСlosedSteps = AStarLong(field);
  // создаем список родителей, начиная с собранного состояния
  // переделала массив родителей в массив [родитель, [промежуточные родители]]
  let curState = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0';
  const parentsArr = [];
  do {
    const state = curState;
    const elem = AStarСlosedSteps.find((i) => i[0] === state);
    [, curState] = elem;
    const intermediateParents = elem[elem.length - 1];
    parentsArr.unshift([curState, intermediateParents]);
  } while (curState !== [...field].join(' '));
  const intermediateParentsArr = parentsArr.map((item) => item[1]);
  // создаем список оптимальных ходов, определяя позиции ходов по списку родителей
  // (теперь выдает не массив пар, а массив массивов пар)
  const pathList = [];
  for (let i = 0; i < intermediateParentsArr.length; i += 1) {
    const currentPathList = [];
    for (let j = 0; j < intermediateParentsArr[i].length - 1; j += 1) {
      const posTo = intermediateParentsArr[i][j].split(' ').indexOf('0');
      const posFrom = intermediateParentsArr[i][j + 1].split(' ').indexOf('0');
      currentPathList.push([posFrom, posTo]);
    }
    pathList.push(currentPathList);
  }
  return pathList;
}
