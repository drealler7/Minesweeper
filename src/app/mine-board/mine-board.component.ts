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
import { MineBoardState } from '../mine-board-state/mine-board-state';
import { MineBoardTimerPipe } from '../mine-board-timer/mine-board-timer.pipe';
import { MineBoardCompleteComponent } from '../mine-board-complete/mine-board-complete.component';
import { MineBoardGameOverComponent } from '../mine-board-game-over/mine-board-game-over.component';

@Component({
  selector: 'app-mine-board',
  templateUrl: './mine-board.component.html',
  styleUrl: './mine-board.component.scss',
  imports: [
    CommonModule,
    MineBoardCellModule,
    MatButtonModule,
    MatIconModule,
    MineBoardTimerPipe
  ],
  providers: [MineBoardOptionsService]
})
export class MineBoardComponent {

  private readonly optionsService = inject(MineBoardOptionsService);
  private readonly dialog = inject(Dialog);
  mineBoard = this.generateMineBoard();

  async openCell(cell: MineBoardCell) {
    if (this.mineBoard.state === MineBoardState.Initial || this.mineBoard.state === MineBoardState.Initialized) {
      await this.mineBoard.openCell(cell);
    }
    if (this.mineBoard.state === MineBoardState.Complete) {
      this.openCompleteDialog();
    }else if(this.mineBoard.state === MineBoardState.gameOver) {
      this.openGameOverDialog();
    }
  }
  toggleFlag(cell: MineBoardCell) {
    if (this.mineBoard.state === MineBoardState.Initial || this.mineBoard.state === MineBoardState.Initialized) {
      this.mineBoard.toggleFlag(cell);
    }
  }

  restart() {
    this.mineBoard = this.generateMineBoard();
  }

  openOptionsDialog() {
    const dialogRef = this.dialog.open<boolean>(MineBoardOptionsComponent, {
      providers: [
        {
          provide: MineBoardOptionsService,
          useValue: this.optionsService
        }
      ],
      width: '90%',
      maxWidth: '350px'
    });

    dialogRef.closed.subscribe(updated => {
      if (updated) {
        this.restart();
      }
    });
  }

  private openCompleteDialog() {
    const dialogRef = this.dialog.open(MineBoardCompleteComponent, {
      providers: [
        {
          provide: MineBoard,
          useValue: this.mineBoard
        }
      ],
      width: '90%',
      maxWidth: '350px'
    });

    dialogRef.closed.subscribe(() => {
      this.restart();
    });
  }

  private openGameOverDialog() {
    const dialogRef = this.dialog.open(MineBoardGameOverComponent, {
      providers: [
        {
          provide: MineBoard,
          useValue: this.mineBoard
        }
      ],
      width: '90%',
      maxWidth: '350px'
    });

    dialogRef.closed.subscribe(() => {
      this.restart();
    });
  }


  private generateMineBoard() {
    return new MineBoard(this.optionsService.options);
  }
}
