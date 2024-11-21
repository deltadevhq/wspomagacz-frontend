import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserWorkoutActivityComponent } from './user-workout-activity.component';

describe('WorkoutActivityComponent', () => {
  let component: UserWorkoutActivityComponent;
  let fixture: ComponentFixture<UserWorkoutActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserWorkoutActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserWorkoutActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
