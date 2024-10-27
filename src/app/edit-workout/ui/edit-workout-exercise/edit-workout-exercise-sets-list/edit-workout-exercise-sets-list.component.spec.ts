import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditWorkoutExerciseSetsListComponent } from './edit-workout-exercise-sets-list.component';

describe('EditWorkoutExerciseSetsListComponent', () => {
  let component: EditWorkoutExerciseSetsListComponent;
  let fixture: ComponentFixture<EditWorkoutExerciseSetsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditWorkoutExerciseSetsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkoutExerciseSetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
