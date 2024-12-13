import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { toObservable } from '@angular/core/rxjs-interop';
import { Muscle } from '../../../shared/models/Muscle';
import { MuscleService } from '../../../shared/data-access/muscle.service';

@Component({
  selector: 'app-add-custom-exercise-add-muscles-list',
  templateUrl: './add-custom-exercise-add-muscles-list.component.html',
  styleUrls: ['./add-custom-exercise-add-muscles-list.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonTitle,
    IonToolbar,
    NgForOf,

  ],
})
export class AddCustomExerciseAddMusclesListComponent {
  muscles: Muscle[] = [];

  private muscleService = inject(MuscleService);
  muscles$ = toObservable(this.muscleService.muscles);

  private modalController = inject(ModalController);

  confirm() {
    return this.modalController.dismiss(this.muscles, 'confirm');
  }

  addMuscle(muscle: Muscle) {
    const muscleExists = this.muscles.find((m) => m.id === muscle.id);

    if (muscleExists) {
      return;
    }

    this.muscles.push(muscle);
  }
}
