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

    const isNotFirstString = posTo > 3;
    const isNotLeftСolumn = posTo % 4 !== 0;
    const isNotRightColumn = (posTo + 1) % 4 !== 0;
    const isNotLastString = posTo < 12;

    const topPosFrom = posTo - 4;
    const leftPosFrom = posTo - 1;
    const rightPosFrom = posTo + 1;
    const bottomPosFrom = posTo + 4;

    if (isNotFirstString) {
      pisitions.push([topPosFrom, posTo]);
    }
    if (isNotLeftСolumn) {
      pisitions.push([leftPosFrom, posTo]);
    }
    if (isNotRightColumn) {
      pisitions.push([rightPosFrom, posTo]);
    }
    if (isNotLastString) {
      pisitions.push([bottomPosFrom, posTo]);
    }
    mover(pisitions[Math.floor(Math.random() * pisitions.length)]);
  }
  return shuffleArr;
}
