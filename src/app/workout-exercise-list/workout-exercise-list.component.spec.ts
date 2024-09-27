import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkoutExerciseListComponent } from './workout-exercise-list.component';

describe('ReorderableWorkoutListComponent', () => {
    let component: WorkoutExerciseListComponent;
    let fixture: ComponentFixture<WorkoutExerciseListComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [WorkoutExerciseListComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkoutExerciseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
