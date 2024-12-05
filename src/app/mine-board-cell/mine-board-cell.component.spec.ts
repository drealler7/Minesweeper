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
    fixture.componentRef.setInput('mineBoardCell', new MineBoardCell(0,0));
    fixture.componentRef.setInput('mineBoard', new MineBoard({ gridSize: { cols: 10, rows: 20 }, mineCount: 10 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to set a mine board cell', () => {

    component.mineBoardCell = new MineBoardCell(0,0);

    expect(component.mineBoardCell).toBeTruthy();
  });

  it('should be able to set a mine board cell grid', () => {

    component.mineBoard = new MineBoard({ gridSize: { cols: 10, rows: 20 }, mineCount: 10 });

    expect(component.mineBoard).toBeTruthy();
  });

  it('should toggle Flag', () => {
    const event = new Event('contextmenu');

    const toggleCellSpy = spyOn(component.toggleFlag, 'emit').and.callThrough();
    const eventSpy = spyOn(event, 'preventDefault').and.callFake(() => {});

    component.contextMenu(event);

    expect(toggleCellSpy).toHaveBeenCalledOnceWith(component.mineBoardCell);
    expect(eventSpy).toHaveBeenCalled();
  });

  it('should open cell', () => {

    const event = new Event('click');
    const openCellSpy = spyOn(component.openCell, 'emit').and.callThrough();
    const eventSpy = spyOn(event, 'preventDefault').and.callFake(() => {});

    component.click(event);

    expect(openCellSpy).toHaveBeenCalledOnceWith(component.mineBoardCell);
    expect(eventSpy).toHaveBeenCalled();
  });
});
