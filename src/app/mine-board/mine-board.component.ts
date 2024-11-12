import { Component } from '@angular/core';
import { MineBoard } from './mine-board';

@Component({
  selector: 'app-mine-board',
  templateUrl: './mine-board.component.html',
  styleUrl: './mine-board.component.scss'
})
export class MineBoardComponent {
  readonly mineBoard = new MineBoard({mineCount:41,gridSize:{cols:5,rows:10}});
}
