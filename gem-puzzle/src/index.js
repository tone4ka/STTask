let cells = [];
for (let i = 1; i <= 15; i += 1) {
  cells.push(i);
}
cells.push(0);

function shuffle(cellsArr) {
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

const gameField = shuffle(cells);
console.log('gameField');
console.log(gameField);
cells = cells.join(' ');

function move(positions) {
  if (typeof positions === 'string') return;
  const [posFrom, posTo] = positions;
  gameField[posTo] = gameField[posFrom];
  gameField[posFrom] = 0;
}

function stepsList(field) {
  const startFieldState = [...field].join(' ');
  let currentStateField = [...field].join(' ');
  let h;
  let step;
  function currentMove(positions) {
    const newStateField = currentStateField.split(' ').map((i) => +i);
    const [posFrom, posTo] = positions;
    newStateField[posTo] = newStateField[posFrom];
    newStateField[posFrom] = 0;
    h = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    step = newStateField.join(' ');
  }
  const win = gameField.every((i, ind, arr) => {
    if (ind === 15) return i === 0;
    if (ind === 0) return i === 1;
    return i === arr[ind - 1] + 1;
  });
  if (win) {
    console.log('the list is complete!');
    return [];
  }
  let posTo = field.indexOf(0);
  let counter = 0;
  field.forEach((item, index) => {
    for (let i = index + 1; i < field.length; i += 1) {
      if (item > field[i] && field[i] !== 0) counter += 1;
    }
  });
  counter = counter + Math.trunc(posTo / 4) + 1;
  if (counter % 2 !== 0) {
    console.log('no solution');
    return 'no solution!';
  }
  // А*..................
  // for null step
  const stepParentGHFopen = [];
  const stepParentGHFclosed = [];
  let parent = null;
  let g = 0;
  h = field.reduce((count, i, ind) => {
    if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
    return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
  }, 0);
  let f = g + h;
  step = currentStateField;
  stepParentGHFopen.push([step, parent, g, h, f]);
  // for others steps
  while (stepParentGHFopen.length > 0) {
    let isOpen;
    if (parent === null) {
      stepParentGHFclosed.push([step, parent, g, h, f]);
      const stepNull = step;
      isOpen = stepParentGHFopen.findIndex((i) => i[0] === stepNull);
      stepParentGHFopen.splice(isOpen, 1);
    }
    g += 1;
    const currentStateFieldArr = currentStateField.split(' ').map((i) => +i);
    parent = currentStateField;
    posTo = currentStateFieldArr.indexOf(0);
    if (posTo > 3) {
      currentMove([posTo - 4, posTo]);
      f = g + h;
      const stepNotFirstString = step;
      if (!stepParentGHFclosed.some((i) => i[0] === stepNotFirstString)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === stepNotFirstString);
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
      }
      if (step === cells) {
        stepParentGHFclosed.push([step, parent, g, h, f]);
        break;
      }
    }
    if (posTo % 4 !== 0) {
      currentMove([posTo - 1, posTo]);
      f = g + h;
      const stepNotLeft = step;
      if (!stepParentGHFclosed.some((i) => i[0] === stepNotLeft)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === stepNotLeft);
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
      }
      if (step === cells) {
        stepParentGHFclosed.push([step, parent, g, h, f]);
        break;
      }
    }
    if ((posTo + 1) % 4 !== 0) {
      currentMove([posTo + 1, posTo]);
      f = g + h;
      const stepNotRight = step;
      if (!stepParentGHFclosed.some((i) => i[0] === stepNotRight)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === stepNotRight);
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
      }
      if (step === cells) {
        stepParentGHFclosed.push([step, parent, g, h, f]);
        break;
      }
    }
    if (posTo < 12) {
      currentMove([posTo + 4, posTo]);
      f = g + h;
      const stepNotLastString = step;
      if (!stepParentGHFclosed.some((i) => i[0] === stepNotLastString)) {
        isOpen = stepParentGHFopen.findIndex((i) => i[0] === stepNotLastString);
        if (isOpen !== -1) {
          if (stepParentGHFopen[isOpen][4] < f) {
            stepParentGHFopen[isOpen] = [step, parent, g, h, f];
          }
        } else {
          stepParentGHFopen.push([step, parent, g, h, f]);
        }
        if (step === cells) {
          stepParentGHFclosed.push([step, parent, g, h, f]);
          break;
        }
      }
    }
    // looking for a new step with minimum weight f
    let minF = Infinity;
    let newStep = null;
    let newG = null;
    stepParentGHFopen.forEach((i) => {
      if (i[4] < minF) {
        [, , , , minF] = i;
        [, , newG] = i;
        newStep = i;
      }
    });
    g = newG;
    [currentStateField] = newStep;
    stepParentGHFclosed.push(newStep);
    const currField = currentStateField;
    isOpen = stepParentGHFopen.findIndex((i) => i[0] === currField);
    stepParentGHFopen.splice(isOpen, 1);
  }
  console.log('closed:');
  console.log(stepParentGHFclosed);
  // create the path list
  let curState = cells;
  const parentsArr = [];
  do {
    const state = curState;
    const elem = stepParentGHFclosed.find((i) => i[0] === state);
    [, curState] = elem;
    parentsArr.unshift(curState);
  } while (curState !== startFieldState);
  const pathList = [];
  for (let i = 0; i < parentsArr.length; i += 1) {
    const pposTo = parentsArr[i].split(' ').indexOf('0');
    if (i === parentsArr.length - 1) {
      pathList.push([15, posTo]);
    } else {
      const pposFrom = parentsArr[i + 1].split(' ').indexOf('0');
      pathList.push([pposFrom, pposTo]);
    }
  }
  console.log('the list is complete!');
  return pathList;
}

function autoGame(field, posList) {
  if (typeof posList === 'string') {
    console.log(posList);
    return posList;
  }
  const startFieldState = [...field];
  posList.forEach((i) => {
    const [posFrom, posTo] = i;
    startFieldState[posTo] = startFieldState[posFrom];
    startFieldState[posFrom] = 0;
  });
  console.log('finishFieldState:');
  console.log(startFieldState);
  return startFieldState;
}

// functions run
const list = stepsList(gameField);
console.log('pathList:');
console.log(list);
autoGame(gameField, list);
