import { Component, Input } from '@angular/core';
import { MineBoardCell } from './mine-board-cell';
import { MineBoard } from '../mine-board/mine-board';

@Component({
    selector: 'app-mine-board-cell',
    templateUrl: './mine-board-cell.component.html',
    styleUrl: './mine-board-cell.component.scss',
    standalone: false
})
export class MineBoardCellComponent {
  @Input({ required: true }) mineBoardCell!: MineBoardCell;
  @Input({ required: true }) mineBoard!: MineBoard;
  @Input({ required: true }) openCell!: (cell: MineBoardCell) => Promise<void>;
  @Input({ required: true }) toggleFlag!: (cell: MineBoardCell) => void;
  contextMenu(event: Event) {
    this.toggleFlag(this.mineBoardCell);
    event.preventDefault();
  }

  click(event: Event) {
    this.openCell(this.mineBoardCell);
    event.preventDefault();
  }
}
