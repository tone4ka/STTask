// функция-перемещатель на один ход
export default function moveCell(positions, cells, cellsNum) {
  const newCells = cells;
  const newCellsNum = cellsNum;
  if (typeof positions === 'string') return;
  const [posFrom, posTo] = positions;
  const posFromCell = newCells[posFrom];
  const posToCell = newCells[posTo];
  newCellsNum[posTo] = cellsNum[posFrom];
  newCellsNum[posFrom] = 0;
  newCells[posTo] = posFromCell;
  newCells[posFrom] = posToCell;
}
