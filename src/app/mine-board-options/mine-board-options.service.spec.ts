import { TestBed } from '@angular/core/testing';
import { MineBoardOptionsService } from './mine-board-options.service';

describe('MineBoardOptionsService', () => {
  let service: MineBoardOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[MineBoardOptionsService]
    });
    service = TestBed.inject(MineBoardOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default options', () => {
    expect(service.options.mineCount).not.toBeNaN();
    expect(service.options.gridSize.rows).not.toBeNaN();
    expect(service.options.gridSize.cols).not.toBeNaN();
  });
});
