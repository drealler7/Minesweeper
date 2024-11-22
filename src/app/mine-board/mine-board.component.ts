import { Component } from '@angular/core';
import { MineBoard } from './mine-board';
import { MineBoardCell } from '../mine-board-cell/mine-board-cell';

@Component({
  selector: 'app-mine-board',
  templateUrl: './mine-board.component.html',
  styleUrl: './mine-board.component.scss'
})
export class MineBoardComponent {
  readonly mineBoard = new MineBoard({ mineCount: 20, gridSize: { cols: 10, rows: 10 } });
  openingCell: boolean = false;

  async openCell(cell: MineBoardCell) {
    if(this.openingCell){
      return;
    }
    this.openingCell = true;
    await this.mineBoard.openCell(cell);
    this.openingCell = false;
  }
  toggleFlag(cell: MineBoardCell) {
    if(this.openingCell){
      return;
    }
    this.mineBoard.toggleFlag(cell);
  }
}
