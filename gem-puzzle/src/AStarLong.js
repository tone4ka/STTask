import { getLongPositionsObj } from './getPositionsObj.js';
import getNewOpenStep from './getNewOpenStep.js';

export default function AStarLong(field) {
  let parentStateField = [...field].join(' ');
  const openSteps = [];
  const closedSteps = [];
  let distance = 0;
  let isOpen;
  // запускаем цикл поиска новых шагов для каждого соседа
  // (переделала условия добавления новых открытых вершин под длинные ходы)
  do {
    const parentStateFieldArr = parentStateField.split(' ').map((i) => +i);
    const posTo = parentStateFieldArr.indexOf(0);
    const positionsObj = getLongPositionsObj(posTo);
    if (positionsObj.is1String) {
      getNewOpenStep(
        {
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
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is2String) {
      getNewOpenStep(
        {
          1: [[positionsObj.top1PosFrom, posTo]],
          2: [[positionsObj.bottom1PosFrom, posTo]],
          3: [
            [positionsObj.bottom1PosFrom, posTo],
            [positionsObj.bottom2PosFrom, positionsObj.bottom1PosFrom],
          ],
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is3String) {
      getNewOpenStep(
        {
          1: [[positionsObj.top1PosFrom, posTo]],
          2: [
            [positionsObj.top1PosFrom, posTo],
            [positionsObj.top2PosFrom, positionsObj.top1PosFrom],
          ],
          3: [[positionsObj.bottom1PosFrom, posTo]],
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is4String) {
      getNewOpenStep(
        {
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
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is1Сolumn) {
      getNewOpenStep(
        {
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
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is2Сolumn) {
      getNewOpenStep(
        {
          1: [[positionsObj.left1PosFrom, posTo]],
          2: [[positionsObj.right1PosFrom, posTo]],
          3: [
            [positionsObj.right1PosFrom, posTo],
            [positionsObj.right2PosFrom, positionsObj.right1PosFrom],
          ],
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is3Сolumn) {
      getNewOpenStep(
        {
          1: [[positionsObj.left1PosFrom, posTo]],
          2: [
            [positionsObj.left1PosFrom, posTo],
            [positionsObj.left2PosFrom, positionsObj.left1PosFrom],
          ],
          3: [[positionsObj.right1PosFrom, posTo]],
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }
    if (positionsObj.is4Сolumn) {
      getNewOpenStep(
        {
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
        },
        parentStateField,
        closedSteps,
        openSteps,
        distance,
      );
    }

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
  return closedSteps;
}
