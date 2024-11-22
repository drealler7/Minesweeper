import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineBoardModule } from './mine-board/mine-board.module';

@Component({
    selector: 'app-root',
    imports: [CommonModule, MineBoardModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Minesweeper';

}
