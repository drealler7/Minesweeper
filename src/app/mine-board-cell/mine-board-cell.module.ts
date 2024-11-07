import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineBoardCellComponent } from './mine-board-cell.component';
import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';
import {  MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [MineBoardCellComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule
  ],
  exports:[
    MineBoardCellComponent
  ]
})
export class MineBoardCellModule { }
