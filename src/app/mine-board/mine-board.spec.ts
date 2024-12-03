import { MineBoardCell } from '../mine-board-cell/mine-board-cell';
import { MineBoardOptions } from '../mine-board-options/mine-board-options';
import { MineBoardState } from '../mine-board-state/mine-board-state';
import { MineBoardTimer } from '../mine-board-timer/mine-board-timer';
import { MineBoard } from './mine-board';

describe('MineBoard', () => {
  const options: MineBoardOptions = {
    mineCount: 10,
    gridSize: { rows: 10, cols: 10 },
  };

  let board: MineBoard;
  beforeEach(() => {
    board = new MineBoard(options);
  });

  const getRandomCell = () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    return board.grid[x][y];
  }

  const getSafeCellWithAdjacentMines = () => {
    for (const cells of board.grid) {
      for (const cell of cells) {
        if (!cell.isMine && board.getAdjacentCells(cell).some(_ => _.isMine)) {
          return cell;
        }
      }
    }
    return undefined;
  }



  it('should create an instance', () => {
    expect(board).toBeTruthy();
  });

  it('should have grid row length same as options row', () => {
    expect(board.grid.length).toBe(options.gridSize.rows);
  });

  it('should have grid col length same as options col', async () => {
    expect(board.grid.length).toBe(options.gridSize.rows);
    board.grid.forEach((_) => expect(_.length).toBe(options.gridSize.cols));
  });

  it('should open random none mine cell', async () => {
    const cell = getRandomCell();

    await board.openCell(cell);

    expect(cell.isMine).toBeFalse();
    expect(cell.isFlagged).toBeFalse();
    expect(cell.isOpen).toBeTrue();
  });

  it('should Initials mines', async () => {
    const cell = getRandomCell();
    const HasMineBeforeOpen = board.grid.some((_) => _.some((__) => __.isMine));

    await board.openCell(cell);

    const HasMineAfterOpen = board.grid.some((_) => _.some((__) => __.isMine));

    expect(board.state).toBe(MineBoardState.Initialized);
    expect(HasMineBeforeOpen).toBeFalse();
    expect(HasMineAfterOpen).toBeTrue();
  });


  it('should have game over state if a mine is opened', async () => {
    const cell = getRandomCell();
    await board.openCell(cell);
    const timerSpy = spyOn(board.timer, 'stopTimer').and.callThrough();

    const mineCell = board.grid.find(_ => _.some(__ => __.isMine))!.find((_) => _.isMine)!;

    await board.openCell(mineCell);

    expect(board.state).toBe(MineBoardState.gameOver);
    expect(timerSpy).toHaveBeenCalled();
  });


  it('should open adjacent cells', async () => {

    const cell = getRandomCell();

    await board.openCell(cell);
    const AdjacentCells = board.getAdjacentCells(cell);

    AdjacentCells.forEach(_ => expect(_.isOpen).toBeTrue());
  });

  it('should not open adjacent cell if adjacent flagged mine cells count is less than adjacent mine cells count', async () => {

    const cell = getRandomCell();
    await board.openCell(cell);
    const safeCellWithAdjacentMine = getSafeCellWithAdjacentMines();
    const AdjacentCells = board.getAdjacentCells(safeCellWithAdjacentMine!);
    const alreadyOpen = AdjacentCells.filter(_ => _.isOpen);

    await board.openCell(safeCellWithAdjacentMine!);

    expect(safeCellWithAdjacentMine).toBeTruthy();
    expect(alreadyOpen.length).toBe(AdjacentCells.filter(_ => _.isOpen).length);
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
    expect(board.state).toBe(MineBoardState.Initial);

  });

  it('should not toggle flag of open cell', async () => {
    const cell = getRandomCell();

    await board.openCell(cell);
    board.toggleFlag(cell);


    expect(cell.isFlagged).toBeFalse();
    expect(cell.isOpen).toBeTrue();
  });

  it('should return adjacent Cells of middle cells', () => {
    const x = 1,
      y = 1;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(8);
  });

  it('should return adjacent Cells of top most cell', () => {
    const x = 0,
      y = 1;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of bottom most cell', () => {
    const x = board.grid.length - 1,
      y = 1;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of left most cell', () => {
    const x = 1,
      y = 0;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of right most cell', () => {
    const x = 1,
      y = board.grid[x].length - 1;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(5);
  });

  it('should return adjacent Cells of very top left cell', () => {
    const x = 0,
      y = 0;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });

  it('should return adjacent Cells of very top right cell', () => {
    const x = 0,
      y = board.grid[x].length - 1;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });

  it('should return adjacent Cells of very bottom left cell', () => {
    const x = board.grid.length - 1,
      y = 0;
    const cell = board.grid[x][y];

    const AdjacentCells = board.getAdjacentCells(cell);

    expect(AdjacentCells.length).toBe(3);
  });

  it('should return adjacent Cells of very bottom right cell', () => {
    const x = board.grid.length - 1,
      y = board.grid[x].length - 1;
    const cell = board.grid[x][y];

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
      cell = board.grid.find(_ => _.some(_ => !_.isOpen && !_.isMine))?.find(_ => !_.isOpen && !_.isMine);
    }
    while (cell);

    expect(timerSpy).toHaveBeenCalled();
    expect(board.state).toBe(MineBoardState.Complete);
  });
});
