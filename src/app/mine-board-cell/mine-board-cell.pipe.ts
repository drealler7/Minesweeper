import { Pipe, PipeTransform } from '@angular/core';
import { MineBoardCell } from './mine-board-cell';

@Pipe({
  name: 'mineBoardCell'
})
export class MineBoardCellPipe implements PipeTransform {

  transform(value: MineBoardCell, ...args: unknown[]): string {
    return '';
  }

}
