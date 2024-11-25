import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardOptionsComponent } from './mine-board-options.component';
import { FormGroup } from '@angular/forms';
import { MineBoardOptionsService } from './mine-board-options.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('MineBoardOptionsComponent', () => {
  let component: MineBoardOptionsComponent;
  let fixture: ComponentFixture<MineBoardOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardOptionsComponent],
      providers: [
        provideAnimationsAsync(),
        MineBoardOptionsService
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(MineBoardOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have options form Group', () => {
    expect(component.optionsForm).toBeTruthy();
    expect(component.optionsForm instanceof FormGroup).toBeTrue();
  });

  it('should not save invalid form', () => {
    component.optionsForm.controls.mineCount.setValue(0);

    component.save();

    expect(TestBed.inject(MineBoardOptionsService).options.mineCount).not.toBe(0);
  });

  it('should save valid form', () => {
    component.optionsForm.controls.mineCount.setValue(10);

    component.save();

    expect(TestBed.inject(MineBoardOptionsService).options.mineCount).toBe(10);
  });
});
