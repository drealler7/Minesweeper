import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineBoardComponent } from './mine-board/mine-board.component';

@Component({
    selector: 'app-root',
    imports: [CommonModule, MineBoardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Minesweeper';

}
