// заменила обычное перемешивание на 50 случайных ходов
export default function shuffle(cells) {
  const shuffleArr = [...cells];

  function move(positions) {
    // console.log(positions);
    const [posFrom, posTo] = positions;
    shuffleArr[posTo] = shuffleArr[posFrom];
    shuffleArr[posFrom] = 0;
  }
  for (let i = 0; i < 50; i += 1) {
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
    move(pisitions[Math.floor(Math.random() * pisitions.length)]);
  }
  return shuffleArr;
}
