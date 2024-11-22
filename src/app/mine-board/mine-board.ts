import { MineBoardCell } from '../mine-board-cell/mine-board-cell';
import { MineBoardState } from '../mine-board-state/mine-board-state';

export type MineBoardOptions = {
  mineCount: number;
  gridSize: { rows: number; cols: number };
};

export class MineBoard {
  state: MineBoardState = MineBoardState.Initial;
  grid: MineBoardCell[][];
  constructor(readonly options: MineBoardOptions) {
    this.grid = MineBoard.generateGrid(options);
  }

  async openCell(cell: MineBoardCell) {
    if (this.state === MineBoardState.gameOver) {
      return;
    } else if (this.state === MineBoardState.Initial) {
      this.initializeMineCells(cell);
    }
    if (this.state !== MineBoardState.OpeningCard) {
      this.state = MineBoardState.OpeningCard;
    }

    cell.isOpen ||= !cell.isFlagged;

    if(cell.isOpen && cell.isMine){
      this.state = MineBoardState.gameOver;
      return;
    }

    await new Promise<void>(_ => setTimeout(_, 1));
    await this.openAdjacentCells(cell);

    this.state = MineBoardState.Initialized;

  }

  toggleFlag(cell: MineBoardCell) {
    cell.isFlagged = !cell.isOpen && !cell.isFlagged;
  }

  getAdjacentCells(cell: MineBoardCell): MineBoardCell[] {
    const cellRowIndex = this.grid.findIndex(_ => _.includes(cell));
    const cellColIndex = this.grid[cellRowIndex].indexOf(cell);

    return this.grid.reduce((adjacentCells, row, rowIndex) => {
      if (Math.abs(cellRowIndex - rowIndex) <= 1) {
        adjacentCells.push(...row.filter((_, colIndex) => _ !== cell && Math.abs(cellColIndex - colIndex) <= 1));
      }
      return adjacentCells;
    }, []);
  }

  private async openAdjacentCells(cell: MineBoardCell) {
    if (!cell.isOpen) {
      return;
    }

    const adjacentCells = this.getAdjacentCells(cell);

    if (adjacentCells.filter(_ => _.isMine).length == adjacentCells.filter(_ => _.isFlagged).length) {
      await Promise.all(adjacentCells.filter(_ => !_.isOpen).map(_ => this.openCell(_)));
    }

  }

  private initializeMineCells(cell: MineBoardCell): true {

    const cellRowIndex = this.grid.findIndex(_ => _.includes(cell));
    const cellColIndex = this.grid[cellRowIndex].indexOf(cell);

    const getMineCells = () => this.grid.reduce((all, row, rowIndex) => all.concat(...row.filter((col, colIndex) => col.isMine && (Math.abs(rowIndex - cellRowIndex) > 1 || Math.abs(colIndex - cellColIndex) > 1))), []);
    const getSafeCells = () => this.grid.reduce((all, row, rowIndex) => all.concat(...row.filter((col, colIndex) => !col.isMine && (Math.abs(rowIndex - cellRowIndex) > 1 || Math.abs(colIndex - cellColIndex) > 1))), []);
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
