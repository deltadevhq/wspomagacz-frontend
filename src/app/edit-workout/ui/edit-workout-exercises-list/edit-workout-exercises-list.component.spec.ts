import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditWorkoutExercisesListComponent } from './edit-workout-exercises-list.component';

describe('EditWorkoutExercisesComponent', () => {
  let component: EditWorkoutExercisesListComponent;
  let fixture: ComponentFixture<EditWorkoutExercisesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditWorkoutExercisesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditWorkoutExercisesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
