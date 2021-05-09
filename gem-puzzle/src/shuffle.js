// export default function shuffle(array) {
//   const shuffleArr = [...array];
//   let currentIndex = 10;
//   let temporaryValue;
//   let randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = shuffleArr[currentIndex];
//     shuffleArr[currentIndex] = shuffleArr[randomIndex];
//     shuffleArr[randomIndex] = temporaryValue;
//   }
//   return shuffleArr;
// }

export default function shuffle(cells) {
  const shuffleArr = [...cells];

  function move(positions) {
    // console.log(positions);
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
    move(pisitions[Math.floor(Math.random() * pisitions.length)]);
  }
  return shuffleArr;
}
