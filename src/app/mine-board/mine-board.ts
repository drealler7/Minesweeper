import { MineBoardCell } from '../mine-board-cell/mine-board-cell';

export type MineBoardOptions = {
  mineCount: number;
  gridSize: { rows: number; cols: number };
};

export class MineBoard {
  private minesInitialized?: boolean;
  grid: MineBoardCell[][];
  constructor(private options: MineBoardOptions) {
    this.grid = MineBoard.generateGrid(options);
  }

  open(x: number, y: number) {
    const cell = this.grid[x][y];

    this.minesInitialized ??= this.initializeMineCells(cell);

    cell.isOpen = true;
  }
  private initializeMineCells(cell: MineBoardCell): true {

    const getMineCells = () => this.grid.reduce((all, c) => all.concat(...c.filter(_ => _.isMine)), []);
    const getSafeCells = () => this.grid.reduce((all, c) => all.concat(...c.filter(_ => !_.isMine)), []);
    let mineCells = getMineCells();
    let safeCells = getSafeCells();

    while (mineCells.length < this.options.mineCount && safeCells.length > 9) {
      let randomIndex = Math.floor(Math.random() * safeCells.length);
      safeCells[randomIndex].isMine = true;
      mineCells = getMineCells();
      safeCells = getSafeCells();
    }
    return true;
  }

  private static generateGrid(options: MineBoardOptions) {
    const grid: MineBoardCell[][] = [];
    for (let rIndex = 0; rIndex < options.gridSize.rows; rIndex++) {
      const row: MineBoardCell[] = [];
      for (let cIndex = 0; cIndex < options.gridSize.cols; cIndex++) {
        row.push(new MineBoardCell());
      }
      grid.push(row);
    }
    return grid;
  }
}
