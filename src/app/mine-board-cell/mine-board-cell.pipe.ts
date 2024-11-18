import { Pipe, PipeTransform } from '@angular/core';
import { MineBoardCell } from './mine-board-cell';
import { MineBoard } from '../mine-board/mine-board';

@Pipe({
  name: 'mineBoardCell'
})
export class MineBoardCellPipe implements PipeTransform {

  transform(cell: MineBoardCell, mineBoard?: MineBoard): '' | number {
    let mineCount = mineBoard?.getAdjacentCells(cell).filter(_ => _.isMine).length ?? 0;
    return mineCount > 0 ? mineCount : '';
  }

}
