// функция-перемещатель длинным ходом(теперь принимает не пару-массив, а массив пар-массивов)
export default function move(positions, field) {
    const newStateField = [...field];
    const parentsStringArr = [field.join(' ')];// это я добавила промежуточных родителей для А*...
    positions.forEach ((stepPositions) => {
        const [positionFrom, positionTo] = stepPositions;
        newStateField[positionTo] = newStateField[positionFrom];
        newStateField[positionFrom] = 0;
        parentsStringArr.push(newStateField.join(' '));
    });
    return [newStateField, parentsStringArr];
  }