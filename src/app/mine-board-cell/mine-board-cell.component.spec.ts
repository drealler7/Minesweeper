import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineBoardCellComponent } from './mine-board-cell.component';
import { MineBoardCellModule } from './mine-board-cell.module';
import { MineBoardCell } from './mine-board-cell';
import { MineBoard } from '../mine-board/mine-board';

describe('MineBoardCellComponent', () => {
  let component: MineBoardCellComponent;
  let fixture: ComponentFixture<MineBoardCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardCellModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineBoardCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to set a mine board cell', () => {

    component.mineBoardCell = new MineBoardCell();

    expect(component.mineBoardCell).toBeTruthy();
  });

  it('should be able to set a mine board cell grid', () => {

    component.mineBoard = new MineBoard({gridSize:{cols:10,rows:20},mineCount:10});

    expect(component.mineBoard).toBeTruthy();
  });
});
