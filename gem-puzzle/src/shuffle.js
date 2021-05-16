import { getPositionsObj } from './getPositionsObj';

// функция для перемешивания массивов
export default function shuffle(cellsArr) {
  const shuffleArr = [...cellsArr];
  function mover(positions) {
    const [posFrom, posTo] = positions;
    shuffleArr[posTo] = shuffleArr[posFrom];
    shuffleArr[posFrom] = 0;
  }
  const shuffleCount = 50;
  for (let i = 0; i < shuffleCount; i += 1) {
    const posTo = shuffleArr.indexOf(0);
    const pisitions = [];
    const positionsObj = getPositionsObj(posTo);

    if (positionsObj.isNotFirstString) {
      pisitions.push([positionsObj.topPosFrom, posTo]);
    }
    if (positionsObj.isNotLeftСolumn) {
      pisitions.push([positionsObj.leftPosFrom, posTo]);
    }
    if (positionsObj.isNotRightColumn) {
      pisitions.push([positionsObj.rightPosFrom, posTo]);
    }
    if (positionsObj.isNotLastString) {
      pisitions.push([positionsObj.bottomPosFrom, posTo]);
    }
    mover(pisitions[Math.floor(Math.random() * pisitions.length)]);
  }
  return shuffleArr;
}
