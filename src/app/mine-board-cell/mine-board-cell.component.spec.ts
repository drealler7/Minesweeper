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
    fixture.componentRef.setInput('mineBoardCell', new MineBoardCell());
    fixture.componentRef.setInput('mineBoard', new MineBoard({ gridSize: { cols: 10, rows: 20 }, mineCount: 10 }));
    fixture.componentRef.setInput('openCell', (cell:MineBoardCell) => Promise.resolve(expect(cell).toBe(component.mineBoardCell)));
    fixture.componentRef.setInput('toggleFlag', (cell:MineBoardCell) => expect(cell).toBe(component.mineBoardCell));
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

    component.mineBoard = new MineBoard({ gridSize: { cols: 10, rows: 20 }, mineCount: 10 });

    expect(component.mineBoard).toBeTruthy();
  });

  it('should toggle Flag', () => {
    const event = new Event('contextmenu');
    const componentSpy = spyOn(component, 'toggleFlag').and.callFake((cell) => expect(cell).toBe(component.mineBoardCell));
    const eventSpy = spyOn(event, 'preventDefault').and.callFake(() => {});

    component.contextMenu(event);

    expect(componentSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should open cell', () => {

    const event = new Event('click');
    const componentSpy = spyOn(component, 'openCell').and.callFake((cell) => Promise.resolve(expect(cell).toBe(component.mineBoardCell)));
    const eventSpy = spyOn(event, 'preventDefault').and.callFake(() => {});

    component.click(event);

    expect(componentSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalled();
  });
});
