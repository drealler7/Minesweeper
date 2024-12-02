import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() openCell = new EventEmitter<MineBoardCell>();
  @Output() toggleFlag = new EventEmitter<MineBoardCell>();
  contextMenu(event: Event) {
    this.toggleFlag.emit(this.mineBoardCell);
    event.preventDefault();
  }

  click(event: Event) {
    this.openCell.emit(this.mineBoardCell);
    event.preventDefault();
  }
}
