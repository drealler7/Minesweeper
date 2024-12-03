import { Component, inject } from '@angular/core';
import {  MatDialogModule, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-mine-board-complete',
  imports: [
    MatButtonModule,
    MatDialogModule],
  templateUrl: './mine-board-game-over.component.html',
  styleUrl: './mine-board-game-over.component.scss'
})
export class MineBoardGameOverComponent {
  readonly dialogRef = inject(DialogRef);
}
