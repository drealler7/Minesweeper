type GridSizeType = {
  rows: number,
  cols: number
};
export const MineBoardOptionsStorageKey = 'BoardOptions';

export type MineBoardOptions = {
  mineCount: number,
  gridSize: GridSizeType
}


