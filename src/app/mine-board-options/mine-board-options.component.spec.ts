import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardOptionsComponent } from './mine-board-options.component';
import { FormGroup } from '@angular/forms';
import { MineBoardOptionsService } from './mine-board-options.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DialogRef } from '@angular/cdk/dialog';

describe('MineBoardOptionsComponent', () => {
  let component: MineBoardOptionsComponent;
  let fixture: ComponentFixture<MineBoardOptionsComponent>;
  let dialogRef = {close:(result:unknown)=>{}}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardOptionsComponent],
      providers: [
        provideAnimationsAsync(),
        MineBoardOptionsService,
        {
          provide:DialogRef,
          useValue:dialogRef
        }
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
    const dialogSpy = spyOn(dialogRef,'close').and.callThrough();

    component.save();

    expect(dialogSpy).not.toHaveBeenCalled();
    expect(TestBed.inject(MineBoardOptionsService).options.mineCount).not.toBe(0);
  });

  it('should save valid form', () => {
    component.optionsForm.controls.mineCount.setValue(10);
    const dialogSpy = spyOn(dialogRef,'close').and.callThrough();

    component.save();

    expect(dialogSpy).toHaveBeenCalled();
    expect(TestBed.inject(MineBoardOptionsService).options.mineCount).toBe(10);
  });
});
