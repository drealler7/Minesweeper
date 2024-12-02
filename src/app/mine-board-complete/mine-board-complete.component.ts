import { Component, inject } from '@angular/core';
import { MineBoard } from '../mine-board/mine-board';
import {  MatDialogModule, } from '@angular/material/dialog';
import { MineBoardTimerPipe } from '../mine-board-timer/mine-board-timer.pipe';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-mine-board-complete',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MineBoardTimerPipe],
  templateUrl: './mine-board-complete.component.html',
  styleUrl: './mine-board-complete.component.scss'
})
export class MineBoardCompleteComponent {
  readonly seconds = inject(MineBoard).timer.seconds;
  readonly dialogRef = inject(DialogRef);
}
