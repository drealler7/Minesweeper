import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardComponent } from './mine-board.component';
import { MineBoardModule } from './mine-board.module';

describe('MineBoardComponent', () => {
  let component: MineBoardComponent;
  let fixture: ComponentFixture<MineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Mine board', () => {
    expect(component.mineBoard).toBeTruthy();
  });

  it('should toggle Flag', () => {
    const cell = component.mineBoard.grid[0][0];
    const toggleSpy = spyOn(component.mineBoard, 'toggleFlag').and.callFake((cell) => expect(cell).toBe(cell));
    component.toggleFlag(cell);

    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should not toggle Flag if already opening cell', () => {
    const cell = component.mineBoard.grid[0][0];
    const toggleSpy = spyOn(component.mineBoard, 'toggleFlag').and.callFake((cell) => expect(cell).toBe(cell));
    component.openingCell = true;
    component.toggleFlag(cell);

    expect(toggleSpy).toHaveBeenCalledTimes(0);
  });

  it('should Open Cell', async () => {
    const cell = component.mineBoard.grid[0][0];
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.callFake((cell) => Promise.resolve(expect(cell).toBe(cell)));
    await component.openCell(cell);

    expect(openCellSpy).toHaveBeenCalled();
  });

  it('should not Open Cell if already opening cell', async () => {
    const cell = component.mineBoard.grid[0][0];
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.callFake((cell) => Promise.resolve(expect(cell).toBe(cell)));
    component.openingCell = true;
    await component.openCell(cell);

    expect(openCellSpy).toHaveBeenCalledTimes(0);
  });
});
