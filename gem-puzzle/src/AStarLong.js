import moveLong from './moveLong.js';
import { getLongPositionsObj } from './getPositionsObj.js';

//Функцию «перемещатель» длинным ходом (интерфейс «перемещателя» предложить)
// Функцию «решатель» с использованием длинных ходов

export default function AStarLong(field) {
  let parentStateField = [...field].join(' ');
  const openSteps = [];
  const closedSteps = [];
  let distance = 0;
  let isOpen;
  // функция определения следующего возможного состояния поля(добавляет его в список открытых шагов)
  // добавила перебор объекта с позициями и заменила перемещатель на длинные ходы!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // (теперь принимает не пару-массив, а объект, каждое св-во которого-массив с одной-тремя парами-массивами)!!!!!!!!!!!!!!!!!!!
  // мув теперь возвращает массив [новое состояние поля, [массив родителей-строк]]!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // кладу РЕВЕРСИРОВАННЫЙ массив промежуточных родителей в параметры шага!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const getNewOpenStep = (positions) => {
    console.log(positions);
    console.log(openSteps);
    for (let key in positions) {
      const fieldArr = parentStateField.split(' ').map((i) => +i);
      const newStateAndParentsArr = moveLong(positions[key], fieldArr);
      // console.log(newStateAndParentsArr);
      const newStateField = newStateAndParentsArr[0];
      const parrentsStringArr = newStateAndParentsArr[1].reverse();
      const heuristic = newStateField.reduce((count, i, ind) => {
        if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
        return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
      }, 0);
      const step = newStateField.join(' ');
      console.log(!closedSteps.some((i) => i[0] === step));
      if (!closedSteps.some((i) => i[0] === step)) {
        isOpen = openSteps.findIndex((i) => i[0] === step);
        if (isOpen === -1) {
          console.log('isOpen === -1');
          openSteps.push([step, parentStateField, distance, heuristic, distance + heuristic, parrentsStringArr]);
        } else if (openSteps[isOpen][4] < distance + heuristic) {
          console.log('openSteps[isOpen][4] < distance + heuristic');
          openSteps[isOpen] = [step, parentStateField, distance, heuristic, distance + heuristic, parrentsStringArr];
        }
      }
    }
    console.log(openSteps);
  };
  // запускаем цикл поиска новых шагов для каждого соседа(переделала полностью под длинные ходы)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  do {
    const parentStateFieldArr = parentStateField.split(' ').map((i) => +i);
    const posTo = parentStateFieldArr.indexOf(0);
    const positionsObj = getLongPositionsObj(posTo);
    if (positionsObj.is1tString) {
      getNewOpenStep({
        1: [[positionsObj.bottom1PosFrom, posTo]],
        2: [
          [positionsObj.bottom1PosFrom, posTo],
          [positionsObj.bottom2PosFrom, positionsObj.bottom1PosFrom],
        ],
        3: [
          [positionsObj.bottom1PosFrom, posTo],
          [positionsObj.bottom2PosFrom, positionsObj.bottom1PosFrom],
          [positionsObj.bottom3PosFrom, positionsObj.bottom2PosFrom],
        ],
      });
    }

    if (positionsObj.is2tString) {
      getNewOpenStep({
        1: [[positionsObj.top1PosFrom, posTo]],
        2: [[positionsObj.bottom1PosFrom, posTo]],
        3: [
          [positionsObj.bottom1PosFrom, posTo],
          [positionsObj.bottom2PosFrom, positionsObj.bottom1PosFrom],
        ],
      });
    }

    if (positionsObj.is3tString) {
      getNewOpenStep({
        1: [[positionsObj.top1PosFrom, posTo]],
        2: [
          [positionsObj.top1PosFrom, posTo],
          [positionsObj.top2PosFrom, positionsObj.top1PosFrom],
        ],
        3: [[positionsObj.bottom1PosFrom, posTo]],
      });
    }

    if (positionsObj.is4tString) {
      getNewOpenStep({
        1: [[positionsObj.top1PosFrom, posTo]],
        2: [
          [positionsObj.top1PosFrom, posTo],
          [positionsObj.top2PosFrom, positionsObj.top1PosFrom],
        ],
        3: [
          [positionsObj.top1PosFrom, posTo],
          [positionsObj.top2PosFrom, positionsObj.top1PosFrom],
          [positionsObj.top3PosFrom, positionsObj.top2PosFrom],
        ],
      });
    }

    if (positionsObj.is1Сolumn) {
      getNewOpenStep({
        1: [[positionsObj.right1PosFrom, posTo]],
        2: [
          [positionsObj.right1PosFrom, posTo],
          [positionsObj.right2PosFrom, positionsObj.right1PosFrom],
        ],
        3: [
          [positionsObj.right1PosFrom, posTo],
          [positionsObj.right2PosFrom, positionsObj.right1PosFrom],
          [positionsObj.right3PosFrom, positionsObj.right2PosFrom],
        ],
      });
    }

    if (positionsObj.is2Сolumn) {
      getNewOpenStep({
        1: [[positionsObj.left1PosFrom, posTo]],
        2: [[positionsObj.right1PosFrom, posTo]],
        3: [
          [positionsObj.right1PosFrom, posTo],
          [positionsObj.right2PosFrom, positionsObj.right1PosFrom],
        ],
      });
    }

    if (positionsObj.is3Сolumn) {
      getNewOpenStep({
        1: [[positionsObj.left1PosFrom, posTo]],
        2: [
          [positionsObj.left1PosFrom, posTo],
          [positionsObj.left2PosFrom, positionsObj.left1PosFrom],
        ],
        3: [[positionsObj.right1PosFrom, posTo]],
      });
    }

    if (positionsObj.is4Сolumn) {
      getNewOpenStep({
        1: [[positionsObj.left1PosFrom, posTo]],
        2: [
          [positionsObj.left1PosFrom, posTo],
          [positionsObj.left2PosFrom, positionsObj.left1PosFrom],
        ],
        3: [
          [positionsObj.left1PosFrom, posTo],
          [positionsObj.left2PosFrom, positionsObj.left1PosFrom],
          [positionsObj.left3PosFrom, positionsObj.left2PosFrom],
        ],
      });
    }

    // поиск нового шага с минимальным весом
    let minWeight = Infinity;
    let newStep;
    let newDistance;

    console.log(openSteps);

    openSteps.forEach((item) => {
      if (item[4] < minWeight) {
        [, , , , minWeight] = item;
        [, , newDistance] = item;
        newStep = item;
      }
    });
    // обновляем параметры для нового шага и перемещаем его в закрытые
    distance = newDistance + 1;
    console.log(closedSteps);
    [parentStateField] = newStep;
    closedSteps.push(newStep);
    const currField = parentStateField;
    isOpen = openSteps.findIndex((i) => i[0] === currField);
    openSteps.splice(isOpen, 1);
    console.log(parentStateField);
  } while (parentStateField !== '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0');
  console.log(closedSteps);
  return closedSteps;
}
