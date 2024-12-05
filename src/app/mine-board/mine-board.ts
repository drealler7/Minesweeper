import { MineBoardCell } from '../mine-board-cell/mine-board-cell';
import { MineBoardOptions } from '../mine-board-options/mine-board-options';
import { MineBoardTimer } from '../mine-board-timer/mine-board-timer';

export class MineBoard {
  cells: MineBoardCell[];
  readonly timer = new MineBoardTimer();
  constructor(readonly options: MineBoardOptions) {
    this.cells = MineBoard.generateGrid(options);
  }

  async openCell(cell: MineBoardCell): Promise<void> {
    if (this.isGameOver() || this.isComplete() || cell.isFlagged) {
      return;
    }

    if (this.cells.every(_ => !_.isMine)) {
      this.initializeMineCells(cell);
    }


    cell.isOpen = true;
    if (cell.isMine) {
      this.timer.stopTimer();
      return;
    }

    await new Promise<void>(_ => setTimeout(_, 1));
    await this.openAdjacentCells(cell);

    if(this.isComplete()){
      this.timer.stopTimer();
    }
  }


  toggleFlag(cell: MineBoardCell) {
    cell.isFlagged = !cell.isOpen && !cell.isFlagged;
  }

  getAdjacentCells(cell: MineBoardCell): MineBoardCell[] {
    return this.cells.filter(_ =>
      _ !== cell &&
      Math.abs(_.row - cell.row) <= 1 &&
      Math.abs(_.col - cell.col) <= 1
    );
  }

  isGameOver(): boolean {
    return this.cells.some(_ => _.isMine && _.isOpen);
  }
  isComplete(): boolean {
    return this.cells.every(_ => _.isOpen && !_.isMine || !_.isOpen && _.isMine);
  }



  private async openAdjacentCells(cell: MineBoardCell) {
    if (!cell.isOpen) {
      return;
    }

    const adjacentCells = this.getAdjacentCells(cell);

    if (adjacentCells.filter(_ => _.isMine).length == adjacentCells.filter(_ => _.isFlagged).length) {
      await Promise.all(adjacentCells.filter(_ => !_.isOpen &&  !_.isFlagged).map(_ => this.openCell(_)));
    }

  }

  private initializeMineCells(cell: MineBoardCell) {

    const adjacentCells = this.getAdjacentCells(cell);

    const otherCells = this.cells.filter(_ => _ !== cell && !adjacentCells.includes(_));

    for (let i = 0; i < this.options.mineCount && otherCells.length; i++) {
      let randomIndex = Math.floor(Math.random() * otherCells.length);
      otherCells[randomIndex].isMine = true;
      otherCells.splice(randomIndex, 1);
    }
  }

  private static generateGrid(options: MineBoardOptions) {
    const cells: MineBoardCell[] = [];
    for (let row = 0; row < options.gridSize.rows; row++) {
      for (let col = 0; col < options.gridSize.cols; col++) {
        cells.push(new MineBoardCell(row, col));
      }
    }
    return cells;
  }
}
