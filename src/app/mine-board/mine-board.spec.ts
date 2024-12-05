import { MineBoardCell } from '../mine-board-cell/mine-board-cell';
import { MineBoardOptions } from '../mine-board-options/mine-board-options';
import { MineBoardTimer } from '../mine-board-timer/mine-board-timer';
import { MineBoard } from './mine-board';

describe('MineBoard', () => {
  const options: MineBoardOptions = {
    mineCount: 1,
    gridSize: { rows: 5, cols: 5 },
  };

  let board: MineBoard;
  beforeEach(() => {
    board = new MineBoard(options);
  });

  const getRandomCell = () => board.cells[Math.floor(Math.random() * options.gridSize.cols)];




  it('should open random none mine cell', async () => {
    const cell = getRandomCell();

    await board.openCell(cell);

    expect(cell.isMine).toBeFalse();
    expect(cell.isFlagged).toBeFalse();
    expect(cell.isOpen).toBeTrue();
  });

  it('should Initials mines', async () => {
    const cell = getRandomCell();
    options.mineCount = 10;
    const HasMineBeforeOpen = board.cells.some((_) => _.isMine);

    await board.openCell(cell);

    const HasMineAfterOpen = board.cells.some((_) => _.isMine);

    expect(HasMineBeforeOpen).toBeFalse();
    expect(HasMineAfterOpen).toBeTrue();
  });


  it('should have game over state if a mine is opened', async () => {
    const timerSpy = spyOn(board.timer, 'stopTimer').and.callThrough();
    const cell = getRandomCell();
    cell.isMine = true;

    await board.openCell(cell);

    expect(timerSpy).toHaveBeenCalled();
  });


  it('should open adjacent cells', async () => {

    const cell = getRandomCell();

    await board.openCell(cell);
    const AdjacentCells = board.getAdjacentCells(cell);

    AdjacentCells.forEach(_ => expect(_.isOpen).toBeTrue());
  });
  it('should open adjacent cell if adjacent flagged mine cells count is equal to adjacent mine cells count', async () => {
    const cell = board.cells[0];
    const adjacentCells = board.getAdjacentCells(cell);
    const adjacentMine = adjacentCells[0];
    adjacentMine.isMine = true;
    adjacentMine.isFlagged = true;

    await board.openCell(cell);

    expect(adjacentMine.isOpen).toBeFalse();
    expect(adjacentMine.isFlagged).toBeTrue();
    expect(adjacentCells.every(_=> _ === adjacentMine || _.isOpen )).toBeTrue();
  });

  it('should open adjacent cell mine if none mine adjacent cell is flagged', async () => {
    const cell = board.cells[0];
    const adjacentCells = board.getAdjacentCells(cell);
    const adjacentMine = adjacentCells[0];
    const adjacentNoneMine = adjacentCells[1];
    adjacentMine.isMine = true;
    adjacentNoneMine.isFlagged = true;

    await board.openCell(cell);

    expect(adjacentMine.isOpen).toBeTrue();
    expect(adjacentMine.isFlagged).toBeFalse();
    expect(adjacentNoneMine.isOpen).toBeFalse();
    expect(adjacentNoneMine.isFlagged).toBeTrue();

  });

  it('should not open adjacent cell if adjacent flagged mine cells count is less than adjacent mine cells count', async () => {

    const cell = board.cells[0];
    const adjacentCells = board.getAdjacentCells(cell);
    const adjacentMine = adjacentCells[0];
    adjacentMine.isMine = true;

    await board.openCell(cell);

    expect(cell.isOpen).toBeTrue();
    expect(adjacentCells.every(_ => !_.isOpen)).toBeTrue();
  });

  it('should toggle cell flag to flagged', () => {
    const cell = getRandomCell();

    board.toggleFlag(cell);

    expect(cell.isFlagged).toBeTrue();
  });

  it('should toggle cell flag to not flagged', () => {
    const cell = getRandomCell();

    board.toggleFlag(cell);
    board.toggleFlag(cell);

    expect(cell.isFlagged).toBeFalse();
  });

  it('should not open flagged cell', async () => {
    const cell = getRandomCell();

    board.toggleFlag(cell);
    await board.openCell(cell);


    expect(cell.isFlagged).toBeTrue();
    expect(cell.isOpen).toBeFalse();
  });

  it('should not initialize from a flagged cell', async () => {
    const cell = getRandomCell();

    board.toggleFlag(cell);
    await board.openCell(cell);


    expect(cell.isFlagged).toBeTrue();
    expect(cell.isOpen).toBeFalse();
  });

  it('should not toggle flag of open cell', async () => {
    const cell = getRandomCell();

    await board.openCell(cell);
    board.toggleFlag(cell);


    expect(cell.isFlagged).toBeFalse();
    expect(cell.isOpen).toBeTrue();
  });

  it('should return adjacent Cells of middle cells', () => {
    const cell = board.cells.find(_ => _.row === 1 && _.col === 1)!;

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(8);
  });

  it('should return adjacent Cells of top most cell', () => {
    const cell = board.cells.find(_ => _.row === 1 && _.col === 0)!;

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of bottom most cell', () => {
    const cell = board.cells.find(_ => _.row === options.gridSize.rows - 1 && _.col === 1)!;

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of left most cell', () => {
    const cell = board.cells.find(_ => _.row === 0 && _.col === 1)!;


    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of right most cell', () => {
    const cell = board.cells.find(_ => _.row === 1 && _.col === options.gridSize.cols - 1)!;


    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of very top left cell', () => {

    const cell = board.cells.find(_ => _.row === 0 && _.col === 0)!;

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });

  it('should return adjacent Cells of very top right cell', () => {
    const cell = board.cells.find(_ => _.row === 0 && _.col === options.gridSize.cols - 1)!;


    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });

  it('should return adjacent Cells of very bottom left cell', () => {
    const cell = board.cells.find(_ => _.row === options.gridSize.rows - 1 && _.col === 0)!;

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });

  it('should return adjacent Cells of very bottom right cell', () => {
    const cell = board.cells.find(_ => _.row === options.gridSize.rows - 1 && _.col === options.gridSize.cols - 1)!;


    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });


  it('should have timer', () => {
    expect(board.timer).toBeInstanceOf(MineBoardTimer);
  });


  it('should set state to game complete', async () => {
    const timerSpy = spyOn(board.timer, 'stopTimer').and.callThrough();

    let cell: MineBoardCell | undefined = getRandomCell();

    do {
      await board.openCell(cell);
      cell = board.cells.find(_ => !_.isOpen && !_.isMine);
    }
    while (cell);

    expect(timerSpy).toHaveBeenCalled();
  });
});
