import { MineBoardTimerPipe } from './mine-board-timer.pipe';

describe('MineBoardTimerPipe', () => {
    let pipe:MineBoardTimerPipe;
    beforeEach(()=>{
      pipe = new MineBoardTimerPipe();

  });
  it('should return formatted seconds', () => {
    const seconds = 6;
    const expected = '00:06';

    const transformed = pipe.transform(seconds);

    expect(transformed).toBe(expected);
  });

  it('should return formatted minutes and seconds', () => {
    const seconds = 360;
    const expected = '06:00';

    const transformed = pipe.transform(seconds);

    expect(transformed).toBe(expected);
  });
});
