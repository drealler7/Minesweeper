import { Component, inject } from '@angular/core';
import { MineBoard } from './mine-board';
import { MineBoardCell } from '../mine-board-cell/mine-board-cell';
import { MineBoardOptionsService } from '../mine-board-options/mine-board-options.service';
import { Dialog } from '@angular/cdk/dialog';
import { MineBoardOptionsComponent } from '../mine-board-options/mine-board-options.component';
import { MineBoardCellModule } from '../mine-board-cell/mine-board-cell.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mine-board',
  templateUrl: './mine-board.component.html',
  styleUrl: './mine-board.component.scss',
  imports: [
    CommonModule,
    MineBoardCellModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [MineBoardOptionsService]
})
export class MineBoardComponent {

  private readonly optionsService = inject(MineBoardOptionsService);
  private readonly dialog = inject(Dialog);
  mineBoard = this.generateMineBoard();
  openingCell: boolean = false;

  async openCell(cell: MineBoardCell) {
    if (this.openingCell) {
      return;
    }
    this.openingCell = true;
    await this.mineBoard.openCell(cell);
    this.openingCell = false;
  }
  toggleFlag(cell: MineBoardCell) {
    if (this.openingCell) {
      return;
    }
    this.mineBoard.toggleFlag(cell);
  }

  restart() {
    this.mineBoard = this.generateMineBoard();
  }

  openOptions() {
    const dialogRef = this.dialog.open(MineBoardOptionsComponent, {
      providers: [
        {
          provide: MineBoardOptionsService,
          useValue: this.optionsService
        }
      ],
      width: '90%',
      maxWidth: '350px'
    });

    dialogRef.closed.subscribe(_ => this.restart());
  }

  private generateMineBoard() {
    return new MineBoard(this.optionsService.options);
  }
}
