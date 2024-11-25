import { Component, inject } from '@angular/core';
import { MineBoard } from './mine-board';
import { MineBoardCell } from '../mine-board-cell/mine-board-cell';
import { MineBoardOptionsService } from '../mine-board-options/mine-board-options.service';

@Component({
    selector: 'app-mine-board',
    templateUrl: './mine-board.component.html',
    styleUrl: './mine-board.component.scss',
    standalone: false
})
export class MineBoardComponent {
  mineBoard = this.generateMineBoard();
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

  
  private generateMineBoard(){
    return new MineBoard(inject(MineBoardOptionsService).options);
  }
}
