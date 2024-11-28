import { MineBoardTimer } from './mine-board-timer';

describe('Mine Board Timer', () => {

  it('should increment seconds', async () => {
    const secondsIncrements = 2;
    const millisecondsIncrements = secondsIncrements * 1000;
    const intervalSpy = spyOn(window,'setInterval').and.callThrough();

    const timer = new MineBoardTimer();

    await new Promise<void>((resolve)=> setTimeout(resolve,millisecondsIncrements));

    expect(intervalSpy).toHaveBeenCalled();
    expect(timer.seconds).toBe(secondsIncrements);
  });


  it('should stop increment timer', async () => {
    const secondsIncrements = 1;
    const millisecondsIncrements = secondsIncrements * 1000;
    const intervalSpy = spyOn(window,'setInterval').and.callThrough();
    const timer = new MineBoardTimer();
    await new Promise<void>((resolve)=> setTimeout(resolve,millisecondsIncrements));

     timer.stopTimer();
    await new Promise<void>((resolve)=> setTimeout(resolve,millisecondsIncrements));


    expect(intervalSpy).toHaveBeenCalled();
    expect(timer.seconds).toBe(secondsIncrements);
  });
});
