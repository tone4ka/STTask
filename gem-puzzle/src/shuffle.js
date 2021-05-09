export default function shuffle(array) {
  const shuffleArr = [...array];
  let currentIndex = shuffleArr.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffleArr[currentIndex];
    shuffleArr[currentIndex] = shuffleArr[randomIndex];
    shuffleArr[randomIndex] = temporaryValue;
  }
  return shuffleArr;
}
