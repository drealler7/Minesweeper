import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MineBoardGameOverComponent } from './mine-board-game-over.component';
import { DialogRef } from '@angular/cdk/dialog';

describe('MineBoardGameOverComponent', () => {
  let component: MineBoardGameOverComponent;
  let fixture: ComponentFixture<MineBoardGameOverComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardGameOverComponent],
      providers: [
         {
          provide: DialogRef,
          useValue: {
            close: ()=>{}
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MineBoardGameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should should dialog ref', () => {
    expect(component.dialogRef).toBe(TestBed.inject(DialogRef));
  });
});
