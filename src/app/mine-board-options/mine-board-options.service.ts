import { Injectable } from '@angular/core';
import { MineBoardOptions, MineBoardOptionsStorageKey } from './mine-board-options';

@Injectable()
export class MineBoardOptionsService {


  static get defaultMineBoardOptions(): MineBoardOptions {
    return {
      gridSize: {
        cols: 10,
        rows: 10,
      },
      mineCount: 15
    }
  }

  options: MineBoardOptions = MineBoardOptionsService.loadFromLocalStorage();

  saveOptions(options: MineBoardOptions) {
    localStorage.setItem(MineBoardOptionsStorageKey, JSON.stringify(options));
    this.options = options;
  }

  static loadFromLocalStorage(): MineBoardOptions {
    const options = this.defaultMineBoardOptions;
    try {
      const obj = JSON.parse(localStorage.getItem(MineBoardOptionsStorageKey) ?? '{}');

      if (!isNaN(obj.gridSize.cols)) {
        options.gridSize.cols = obj.gridSize.cols;
      }
      if (!isNaN(obj.gridSize.rows)) {
        options.gridSize.rows = obj.gridSize.rows;
      }
      if (!isNaN(obj.mineCount)) {
        options.mineCount = obj.mineCount;
      }
    }
    catch { }
    return options;
  }
}
