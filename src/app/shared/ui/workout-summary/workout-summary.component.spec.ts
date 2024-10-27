import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkoutSummaryComponent } from './workout-summary.component';

describe('WorkoutInfoComponent', () => {
  let component: WorkoutSummaryComponent;
  let fixture: ComponentFixture<WorkoutSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
