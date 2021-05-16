import moveLong from './moveLong.js';

export default function getNewOpenStep(positions, parentStateField, closedSteps, openSteps) {
  const positionsArr = Object.values(positions);
  for (let path = 0; path < positionsArr.length; path += 1) {
    const fieldArr = parentStateField.split(' ').map((i) => +i);
    const newStateAndParentsArr = moveLong(positions[path], fieldArr);
    // console.log(newStateAndParentsArr);
    const newStateField = newStateAndParentsArr[0];
    const parrentsStringArr = newStateAndParentsArr[1];
    const heuristic = newStateField.reduce((count, i, ind) => {
      if (ind !== 15) return i !== ind + 1 ? count + Math.abs(i - (ind + 1)) : count;
      return i !== 0 ? count + Math.abs(i - (ind + 1)) : count;
    }, 0);
    const step = newStateField.join(' ');
    if (!closedSteps.some((i) => i[0] === step)) {
      const isOpen = openSteps.findIndex((i) => i[0] === step);
      if (isOpen === -1) {
        openSteps.push([step, parentStateField, distance, heuristic, distance + heuristic, parrentsStringArr]);
      } else if (openSteps[isOpen][4] < distance + heuristic) {
        openSteps[isOpen] = [step, parentStateField, distance, heuristic, distance + heuristic, parrentsStringArr];
      }
    }
  }
}
