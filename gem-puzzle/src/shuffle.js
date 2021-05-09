// функция для перемешивания массивов
export default function shuffle(cellsArr) {
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
