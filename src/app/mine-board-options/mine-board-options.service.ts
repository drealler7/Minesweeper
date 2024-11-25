import { Injectable } from '@angular/core';
import { MineBoardOptions } from './mine-board-options';

@Injectable()
export class MineBoardOptionsService {
  static get defaultMineBoardOptions(): MineBoardOptions {
    return {
      gridSize: {
        cols: 10,
        rows: 10,
      },
      mineCount: 30
    }
  }

  options: MineBoardOptions = MineBoardOptionsService.defaultMineBoardOptions;
}
