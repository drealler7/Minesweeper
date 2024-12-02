import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardCompleteComponent } from './mine-board-complete.component';
import { MineBoard } from '../mine-board/mine-board';
import { DialogRef } from '@angular/cdk/dialog';

describe('MineBoardCompleteComponent', () => {
  let component: MineBoardCompleteComponent;
  let fixture: ComponentFixture<MineBoardCompleteComponent>;
  const mineBoardTime = 30;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardCompleteComponent],
      providers: [
        {
          provide: MineBoard,
          useValue: {
            timer: {
              seconds: mineBoardTime
            }
          }
        }, {
          provide: DialogRef,
          useValue: {
            close: ()=>{}
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MineBoardCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should should have mine board seconds', () => {
    expect(component.seconds).toBe(mineBoardTime);
  });

  it('should should dialog ref', () => {
    expect(component.dialogRef).toBe(TestBed.inject(DialogRef));
  });
});
