import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineBoardComponent } from './mine-board.component';
import { MineBoardModule } from './mine-board.module';

describe('MineBoardComponent', () => {
  let component: MineBoardComponent;
  let fixture: ComponentFixture<MineBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MineBoardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have Mine board', () => {
    expect(component.mineBoard).toBeTruthy();
  });
});
