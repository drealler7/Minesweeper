import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardComponent } from './mine-board.component';
import {Dialog } from '@angular/cdk/dialog';
import { MineBoardState } from '../mine-board-state/mine-board-state';
import { MineBoardCompleteComponent } from '../mine-board-complete/mine-board-complete.component';
import { MineBoardOptionsComponent } from '../mine-board-options/mine-board-options.component';
describe('MineBoardComponent', () => {
  let component: MineBoardComponent;
  let fixture: ComponentFixture<MineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardComponent]
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
    component.mineBoard.state = MineBoardState.openingCard
    const toggleSpy = spyOn(component.mineBoard, 'toggleFlag').and.callFake((cell) => expect(cell).toBe(cell));

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
    component.mineBoard.state = MineBoardState.openingCard
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.callFake((cell) => Promise.resolve(expect(cell).toBe(cell)));

    await component.openCell(cell);

    expect(openCellSpy).toHaveBeenCalledTimes(0);
  });

  it('should restart board', async () => {
    const cell = component.mineBoard.grid[0][0];
    await component.openCell(cell);

    component.restart();

    component.mineBoard.grid.forEach(row => expect(row.every(_=>!_.isMine && !_.isFlagged && !_.isOpen)).toBeTrue());
    expect(component.mineBoard.state).toBe(MineBoardState.Initial);
  });

  it('should open options dialog', () => {
    const dialogOpen = spyOn(TestBed.inject(Dialog),'open').and.callThrough();

    component.openOptionsDialog();

    expect(dialogOpen).toHaveBeenCalledTimes(1);
  });


  it('should open board complete dialog', async () => {
    const cell = component.mineBoard.grid[0][0];
    const dialogOpen = spyOn(TestBed.inject(Dialog),'open').and.callThrough();
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.callFake((cell) => {
      expect(cell).toBe(cell);
      component.mineBoard.state = MineBoardState.Complete;
      return Promise.resolve();
    });

    await component.openCell(cell);

    expect(openCellSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpen).toHaveBeenCalledTimes(1);
  });
});
