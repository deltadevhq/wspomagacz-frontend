import { Component, computed, inject, signal } from '@angular/core';
import { ExerciseService } from '../shared/data-access/exercise.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { Exercise } from '../shared/models/Workout';

@Component({
    standalone: true,
    selector: 'app-exercises',
    templateUrl: './exercises-modal.component.html',
    styleUrls: ['./exercises-modal.component.scss'],
    imports: [IonicModule, NgForOf, NgIf],
})
export class ExercisesModalComponent {
    private exerciseService = inject(ExerciseService);

    exercises = this.exerciseService.exercises;

    private exerciseDetailsModal = inject(ModalController);
    private exercisesModal = inject(ModalController);

    private searchQuery = signal('');

    standardExercises = computed(() => {
        const query = this.searchQuery().toLowerCase();
        return this.exercises().filter(
            (exercise) =>
                exercise.exercise_name.toLowerCase().includes(query) &&
                exercise.exercise_type === 'standard',
        );
    });

    customExercises = computed(() => {
        const query = this.searchQuery().toLowerCase();
        return this.exercises().filter(
            (exercise) =>
                exercise.exercise_name.toLowerCase().includes(query) &&
                exercise.exercise_type === 'custom',
        );
    });

    addedExercises: Exercise[] = [];

    cancel() {
        return this.exercisesModal.dismiss(null, 'cancel');
    }

    confirm() {
        return this.exercisesModal.dismiss(null, 'confirm');
    }

    async openExerciseDetailsModal(exercise: Exercise) {
        const modal = await this.exerciseDetailsModal.create({
            component: ExerciseDetailsComponent,
            componentProps: {
                exercise: exercise,
            },
        });

        await modal.present();
    }

    handleInput(event: any) {
        const query = event.target.value.toLowerCase();
        this.searchQuery.set(query);
    }
}
