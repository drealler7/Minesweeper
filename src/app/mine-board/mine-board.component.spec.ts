import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardComponent } from './mine-board.component';
import {Dialog } from '@angular/cdk/dialog';
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
    const cell = component.mineBoard.cells[0];
    const toggleSpy = spyOn(component.mineBoard, 'toggleFlag').and.callFake((cell) => expect(cell).toBe(cell));
    component.toggleFlag(cell);

    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should Open Cell', async () => {
    const cell = component.mineBoard.cells[0];
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.returnValue(Promise.resolve());
    await component.openCell(cell);

    expect(openCellSpy).toHaveBeenCalled();
  });



  it('should restart board', async () => {
    const cell = component.mineBoard.cells[0];
    await component.openCell(cell);

    component.restart();

    expect(component.mineBoard.cells.every(_=>!_.isMine && !_.isFlagged && !_.isOpen)).toBeTrue();
  });

  it('should open options dialog', () => {
    const dialogOpen = spyOn(TestBed.inject(Dialog),'open').and.callThrough();

    component.openOptionsDialog();

    expect(dialogOpen).toHaveBeenCalledTimes(1);
  });


  it('should open board complete dialog', async () => {
    const cell = component.mineBoard.cells[0];
    const dialogOpen = spyOn(TestBed.inject(Dialog),'open').and.callThrough();
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.returnValue(Promise.resolve());
    const isCompleteSpy = spyOn(component.mineBoard, 'isComplete').and.returnValue(true);

    await component.openCell(cell);

    expect(isCompleteSpy).toHaveBeenCalledTimes(1);
    expect(openCellSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpen).toHaveBeenCalledTimes(1);
  });

  it('should open game over dialog', async () => {
    const cell = component.mineBoard.cells[0];
    const dialogOpen = spyOn(TestBed.inject(Dialog),'open').and.callThrough();
    const openCellSpy = spyOn(component.mineBoard, 'openCell').and.returnValue(Promise.resolve());
    const isCompleteSpy = spyOn(component.mineBoard, 'isComplete').and.returnValue(false);
    const isGameOverSpy = spyOn(component.mineBoard, 'isGameOver').and.returnValue(true);

    await component.openCell(cell);

    expect(openCellSpy).toHaveBeenCalledTimes(1);
    expect(isGameOverSpy).toHaveBeenCalledTimes(1);
    expect(isCompleteSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpen).toHaveBeenCalledTimes(1);
  });
});
