import { MineBoard, MineBoardOptions } from './mine-board';

describe('MineBoard', () => {
  const options: MineBoardOptions = {
    mineCount: 10,
    gridSize: { rows: 10, cols: 10 },
  };
  let board = new MineBoard(options);
  beforeEach(()=>{
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

    board.open(x, y);

    expect(cell.isMine).toBeFalse();
    expect(cell.isMarked).toBeFalse();
    expect(cell.isOpen).toBeTrue();
  });

  it('should Initials mines', () => {
    const x = Math.floor(Math.random() * options.gridSize.rows),
      y = Math.floor(Math.random() * options.gridSize.cols);
    const HasMineBeforeOpen = board.grid.some((_) => _.some((__) => __.isMine));

    board.open(x, y);

    const HasMineAfterOpen = board.grid.some((_) => _.some((__) => __.isMine));

    expect(HasMineBeforeOpen).toBeFalse();
    expect(HasMineAfterOpen).toBeTrue();
  });
});
