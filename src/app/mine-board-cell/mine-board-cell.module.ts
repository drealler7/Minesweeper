import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineBoardCellComponent } from './mine-board-cell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MineBoardCellPipe } from './mine-board-cell.pipe';


@NgModule({
  declarations: [MineBoardCellComponent, MineBoardCellPipe],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule
  ],
  exports: [
    MineBoardCellComponent
  ]
})
export class MineBoardCellModule { }
