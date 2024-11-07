import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineBoardComponent } from './mine-board.component';
import { MineBoardCellModule } from '../mine-board-cell/mine-board-cell.module';



@NgModule({
  declarations: [MineBoardComponent],
  imports: [
    CommonModule,
    MineBoardCellModule
  ],
  exports:[MineBoardComponent]
})
export class MineBoardModule { }
