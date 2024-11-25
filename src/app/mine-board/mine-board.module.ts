import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineBoardComponent } from './mine-board.component';
import { MineBoardCellModule } from '../mine-board-cell/mine-board-cell.module';
import { MineBoardOptionsComponent } from '../mine-board-options/mine-board-options.component';
import { MineBoardOptionsService } from '../mine-board-options/mine-board-options.service';



@NgModule({
  declarations: [MineBoardComponent],
  providers: [MineBoardOptionsService],
  imports: [
    CommonModule,
    MineBoardCellModule,
    MineBoardOptionsComponent
  ],
  exports: [MineBoardComponent]
})
export class MineBoardModule { }
