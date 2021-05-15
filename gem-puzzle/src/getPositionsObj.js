export function getPositionsObj(posNullCell) {
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

// позиции для ллинных ходов(с экспортами не накосячила?????????????????)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export function getLongPositionsObj(posNullCell) {
  return {
    is1String: posNullCell < 4,
    is2String: posNullCell > 3 && posNullCell < 8,
    is3String: posNullCell > 7 && posNullCell < 12,
    is4String: posNullCell > 11,

    is1Сolumn: posNullCell % 4 === 0,
    is2Сolumn: (posNullCell - 1) % 4 === 0,
    is3Сolumn: (posNullCell - 2) % 4 === 0,
    is4Сolumn: (posNullCell + 1) % 4 === 0,

    top1PosFrom: posNullCell - 4,
    top2PosFrom: posNullCell - 8,
    top3PosFrom: posNullCell - 12,

    left1PosFrom: posNullCell - 1,
    left2PosFrom: posNullCell - 2,
    left3PosFrom: posNullCell - 3,

    righ1tPosFrom: posNullCell + 1,
    right2PosFrom: posNullCell + 2,
    right3PosFrom: posNullCell + 3,

    bottom1PosFrom: posNullCell + 4,
    bottom2PosFrom: posNullCell + 8,
    bottom3PosFrom: posNullCell + 12,
  };
}
