import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditWorkoutExerciseComponent } from './edit-workout-exercise.component';

describe('EditWorkoutExerciseComponent', () => {
  let component: EditWorkoutExerciseComponent;
  let fixture: ComponentFixture<EditWorkoutExerciseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditWorkoutExerciseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkoutExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
