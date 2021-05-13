import getStepsList from './getStepsList';
import moveCell from './moveCell';

const truPositions = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0';
// функция автозавершения игры
export default async function autoRun(cells, cellsNum, move) {
  const moveTextElement = move;
  let moves = 0;
  const list = getStepsList(cellsNum);
  async function makeStep(item) {
    // для отображения хода на UI
    const nullCell = cells[item[1]];
    const currentCell = cells[item[0]];
    const leftPosNull = +nullCell.style.left.substr(0, nullCell.style.left.length - 2);
    const topPosNull = +nullCell.style.top.substr(0, nullCell.style.top.length - 2);
    const leftPosCur = +currentCell.style.left.substr(0, currentCell.style.left.length - 2);
    const topPosCur = +currentCell.style.top.substr(0, currentCell.style.top.length - 2);
    nullCell.style.left = `${leftPosCur}px`;
    nullCell.style.top = `${topPosCur}px`;
    currentCell.style.left = `${leftPosNull}px`;
    currentCell.style.top = `${topPosNull}px`;
    moves += 1;
    moveTextElement.innerText = `Move:${moves}`;
    const completeAnim = await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    return completeAnim; // поставила задержку, чтобы клетка успела передвинуться
  }

  let i = 0;
  while (i < list.length) {
    await makeStep(list[i]); // передвижение клеток на экране
    moveCell(list[i], cells, cellsNum); // передвижение клеток в хранящих массивах
    i += 1;
    if (cellsNum.join(' ') === truPositions) {
      alert(`You solved the puzzle in ${moves} moves!`);
    }
  }
}
