import { MineBoardCell } from '../mine-board-cell/mine-board-cell';

export type MineBoardOptions = {
  mineCount: number;
  gridSize: { rows: number; cols: number };
};

export class MineBoard {


  private minesInitialized?: boolean;
  grid: MineBoardCell[][];
  constructor(private readonly options: MineBoardOptions) {
    this.grid = MineBoard.generateGrid(options);
  }

  open(cell: MineBoardCell) {
    this.minesInitialized ??= this.initializeMineCells(cell);

    cell.isOpen ||= !cell.isFlagged;
  }
  toggleFlag(cell: MineBoardCell) {
    cell.isFlagged = !cell.isOpen && !cell.isFlagged;
  }
  private initializeMineCells(cell: MineBoardCell): true {

    const cellRowIndex = this.grid.findIndex(_=>_.includes(cell));
    const cellColIndex = this.grid[cellRowIndex].indexOf(cell);

    const getMineCells = () => this.grid.reduce((all, row,rowIndex) => all.concat(...row.filter((col,colIndex) => col.isMine && (Math.abs(rowIndex - cellRowIndex) > 1 || Math.abs(colIndex - cellColIndex) > 1))), []);
    const getSafeCells = () => this.grid.reduce((all, row,rowIndex) => all.concat(...row.filter((col,colIndex) => !col.isMine && (Math.abs(rowIndex - cellRowIndex) > 1 || Math.abs(colIndex - cellColIndex) > 1))), []);
    let mineCells = getMineCells();
    let safeCells = getSafeCells();

    while (mineCells.length < this.options.mineCount && safeCells.length > 0) {
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
