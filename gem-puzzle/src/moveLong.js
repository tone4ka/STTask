// функция-перемещатель длинным ходом(теперь принимает не пару-массив, а массив пар-массивов)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default function move(positions, field) {
    const newStateField = [...field];
    positions.forEach ((stepPositions) => {
        const [positionFrom, positionTo] = stepPositions;
        newStateField[positionTo] = newStateField[positionFrom];
        newStateField[positionFrom] = 0;
    });
    return newStateField;
  }