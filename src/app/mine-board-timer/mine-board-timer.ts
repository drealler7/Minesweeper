
export class MineBoardTimer  {

  seconds = 0;
  private readonly interval = setInterval(()=>this.seconds++,1000);


  stopTimer() {
    clearInterval(this.interval);
  }
}
