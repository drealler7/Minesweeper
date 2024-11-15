import { Component, Input } from '@angular/core';
import { MineBoardCell } from './mine-board-cell';
import { MineBoard } from '../mine-board/mine-board';

@Component({
  selector: 'app-mine-board-cell',
  templateUrl: './mine-board-cell.component.html',
  styleUrl: './mine-board-cell.component.scss'
})
export class MineBoardCellComponent {
  @Input({ required: true }) mineBoardCell?: MineBoardCell;
  @Input({ required: true }) mineBoard?: MineBoard;
  toggleFlag(event: Event) {
    this.mineBoard?.toggleFlag(this.mineBoardCell!);
    event.preventDefault();
  }
}
