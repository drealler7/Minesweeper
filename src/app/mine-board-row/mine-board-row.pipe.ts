import { Pipe, PipeTransform } from '@angular/core';
import { MineBoardCell } from '../mine-board-cell/mine-board-cell';

@Pipe({
  name: 'mineBoardRow'
})
export class MineBoardRowPipe implements PipeTransform {

  transform(cells: MineBoardCell[], ..._: unknown[]): MineBoardCell[][] {
    return cells.reduce<MineBoardCell[][]>((rows, cell) => {
      const row = rows.find(_ => _.every(_ => _.row === cell.row)) ?? [];
      row.push(cell);
      row.sort((c1, c2) => c1.row - c2.row);
      if (!rows.includes(row)) {
        rows.push(row);
      }
      return rows;
    }, []);
  }

}
