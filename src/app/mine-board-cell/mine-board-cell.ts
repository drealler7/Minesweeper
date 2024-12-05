export class MineBoardCell {
  isFlagged = false;
  isMine = false;
  isOpen = false;
  constructor(readonly row: number, readonly col: number) { }
}
