export default function getPositionsObj(posNullCell) {
  return {
    isNotFirstString: posNullCell > 3,
    isNotLeftСolumn: posNullCell % 4 !== 0,
    isNotRightColumn: (posNullCell + 1) % 4 !== 0,
    isNotLastString: posNullCell < 12,
    topPosFrom: posNullCell - 4,
    leftPosFrom: posNullCell - 1,
    rightPosFrom: posNullCell + 1,
    bottomPosFrom: posNullCell + 4,
  };
}
