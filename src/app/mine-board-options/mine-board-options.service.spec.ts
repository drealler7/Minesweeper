import { TestBed } from '@angular/core/testing';
import { MineBoardOptionsService } from './mine-board-options.service';
import { MineBoardOptionsStorageKey } from './mine-board-options';

describe('MineBoardOptionsService', () => {
  let service: MineBoardOptionsService;
  let localStorageGetItemSpy:jasmine.Spy<(key: string) => string | null>;
  beforeEach(() => {
    localStorageGetItemSpy = spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(MineBoardOptionsService.defaultMineBoardOptions))

    TestBed.configureTestingModule({
      providers:[MineBoardOptionsService]
    });
    service = TestBed.inject(MineBoardOptionsService);
  });
  it('should have default options', () => {
    expect(service.options.mineCount).toBe(MineBoardOptionsService.defaultMineBoardOptions.mineCount);
    expect(service.options.gridSize.rows).toBe(MineBoardOptionsService.defaultMineBoardOptions.gridSize.rows);
    expect(service.options.gridSize.cols).toBe(MineBoardOptionsService.defaultMineBoardOptions.gridSize.cols);
    expect(localStorageGetItemSpy).toHaveBeenCalled();
  });

  it('should save options on local storage', () => {
    const localStorageSpy = spyOn(localStorage,'setItem').and.callFake((key:string,value:string) =>{
      expect(key).toBe(MineBoardOptionsStorageKey);
      expect(JSON.parse(value)).toBeTruthy();
    });

    service.saveOptions(MineBoardOptionsService.defaultMineBoardOptions);

    expect(localStorageSpy).toHaveBeenCalledTimes(1)
  });


});
