// функция-перемещатель длинным ходом(теперь принимает не пару-массив, а массив пар-массивов)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export default function move(positions, field) {
    const newStateField = [...field];
    const parentsStringArr = [];
    positions.forEach ((stepPositions) => {
        // console.log(newStateField);
        const [positionFrom, positionTo] = stepPositions;
        newStateField[positionTo] = newStateField[positionFrom];
        newStateField[positionFrom] = 0;
        parentsStringArr.push(newStateField.join(' '));
        // console.log(newStateField);
    });
    return [newStateField, parentsStringArr];
  }