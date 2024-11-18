import { MineBoard } from '../mine-board/mine-board';
import { MineBoardCellPipe } from './mine-board-cell.pipe';

describe('MineBoardCellPipe', () => {
  let mineBoard!: MineBoard;
  let pipe!: MineBoardCellPipe;
  beforeEach(() => {
    pipe = new MineBoardCellPipe();
    mineBoard = new MineBoard({ gridSize: { cols: 10, rows: 20 }, mineCount: 10 });
  });
  it('should return empty string if adjacent are not mines', () => {
    const cell = mineBoard.grid[Math.floor(Math.random() * mineBoard.options.gridSize.rows)][Math.floor(Math.random() * mineBoard.options.gridSize.cols)];
    const adjacentCells = mineBoard.getAdjacentCells(cell)
    adjacentCells.forEach(_ => _.isMine = false);

    const transformed = pipe.transform(cell,mineBoard);

    expect(transformed).toBe('');
  });

  it('should return empty string if mineBoard is undefined', () => {
    const cell = mineBoard.grid[Math.floor(Math.random() * mineBoard.options.gridSize.rows)][Math.floor(Math.random() * mineBoard.options.gridSize.cols)];

    const transformed = pipe.transform(cell,undefined);

    expect(transformed).toBe('');
  });

  it('should return number of mine adjacent cells', () => {
    const cell = mineBoard.grid[Math.floor(Math.random() * mineBoard.options.gridSize.rows)][Math.floor(Math.random() * mineBoard.options.gridSize.cols)];
    const adjacentCells = mineBoard.getAdjacentCells(cell)
    adjacentCells.forEach(_ => _.isMine = true);

    const transformed = pipe.transform(cell,mineBoard);

    expect(transformed).toBe(adjacentCells.length);
  });


});
