import { MineBoardCell } from './mine-board-cell';

describe('MineBoardCell', () => {
  let cell = new MineBoardCell();
  beforeEach(()=>{
    cell = new MineBoardCell();
  })
  it('should create an instance', () => {
    expect(cell).toBeTruthy();
  });

  it('should have isMine set to false by default', () => {
    expect(cell.isMine).toBeFalse();
  });

  it('should set isMine property to true', () => {
    cell.isMine = true;
    expect(cell.isMine).toBeTrue();
  });

  it('should have isMarked set to false by default', () => {
    expect(cell.isFlagged).toBeFalse();
  });

  it('should set isMarked property to true', () => {
    cell.isFlagged = true;
    expect(cell.isFlagged).toBeTrue();
  });
});
