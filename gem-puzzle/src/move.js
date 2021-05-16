// функция-перемещатель на один ход
export default function move(positions, field) {
    const newStateField = [...field];
    const [positionFrom, positionTo] = positions;
    newStateField[positionTo] = newStateField[positionFrom];
    newStateField[positionFrom] = 0;
    return newStateField;
  }