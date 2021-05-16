import moveLong from './moveLong.js';

// функция определения следующего возможного состояния поля(добавляет его в список открытых шагов)
// добавила перебор объекта с позициями и заменила перемещатель на длинные ходы
// (теперь принимает не пару-массив, а объект, каждое св-во которого-массив с одной-тремя парами-массивами)
// мув теперь возвращает массив [новое состояние поля, [массив промежуточных родителей-строк]]
// кладу массив промежуточных родителей отдельно в параметры шага
export default function getNewOpenStep(positions, parentStateField, closedSteps, openSteps, distance) {
  const positionsArr = Object.values(positions);
  for (let path = 0; path < positionsArr.length; path += 1) {
    const fieldArr = parentStateField.split(' ').map((i) => +i);
    const newStateAndParentsArr = moveLong(positionsArr[path], fieldArr);
    // console.log(newStateAndParentsArr);
    const newStateField = newStateAndParentsArr[0];
    const parrentsStringArr = newStateAndParentsArr[1];
    const heuristic = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    const step = newStateField.join(' ');
    if (!closedSteps.some((i) => i[0] === step)) {
      const isOpen = openSteps.findIndex((i) => i[0] === step);
      if (isOpen === -1) {
        openSteps.push([step, parentStateField, distance, heuristic, distance + heuristic, parrentsStringArr]);
      } else if (openSteps[isOpen][4] < distance + heuristic) {
        openSteps[isOpen] = [step, parentStateField, distance, heuristic, distance + heuristic, parrentsStringArr];
      }
    }
  }
}
