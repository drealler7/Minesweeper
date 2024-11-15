import { MineBoard, MineBoardOptions } from './mine-board';

describe('MineBoard', () => {
  const options: MineBoardOptions = {
    mineCount: 10,
    gridSize: { rows: 10, cols: 10 },
  };
  let board = new MineBoard(options);
  beforeEach(() => {
    board = new MineBoard(options);
  })

  it('should create an instance', () => {
    expect(board).toBeTruthy();
  });

  it('should have grid row length same as options row', () => {
    expect(board.grid.length).toBe(options.gridSize.rows);
  });

  it('should have grid col length same as options col', () => {
    expect(board.grid.length).toBe(options.gridSize.rows);
    board.grid.forEach((_) => expect(_.length).toBe(options.gridSize.cols));
  });

  it('should open none mine random cell', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const cell = board.grid[x][y];

    board.open(cell);

    expect(cell.isMine).toBeFalse();
    expect(cell.isFlagged).toBeFalse();
    expect(cell.isOpen).toBeTrue();
  });

  it('should Initials mines', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const cell = board.grid[x][y];
    const HasMineBeforeOpen = board.grid.some((_) => _.some((__) => __.isMine));

    board.open(cell);

    const HasMineAfterOpen = board.grid.some((_) => _.some((__) => __.isMine));

    expect(HasMineBeforeOpen).toBeFalse();
    expect(HasMineAfterOpen).toBeTrue();
  });

  it('should toggle cell flag to flagged', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const cell = board.grid[x][y];

    board.toggleFlag(cell);

    expect(cell.isFlagged).toBeTrue();
  });

  it('should toggle cell flag to not flagged', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const cell = board.grid[x][y];

    board.toggleFlag(cell);
    board.toggleFlag(cell);

    expect(cell.isFlagged).toBeFalse();
  });

  it('should not open flagged cell', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const cell = board.grid[x][y];

    board.toggleFlag(cell);
    board.open(cell);


    expect(cell.isFlagged).toBeTrue();
    expect(cell.isOpen).toBeFalse();
  });
  it('should not toggle flag of open cell', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const cell = board.grid[x][y];

    board.open(cell);
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
});
