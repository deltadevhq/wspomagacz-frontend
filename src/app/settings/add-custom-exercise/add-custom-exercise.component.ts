import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../shared/data-access/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExerciseService } from '../../shared/data-access/exercise.service';
import { Equipment } from '../../shared/models/Equipment';
import { Muscle } from '../../shared/models/Muscle';
import {
  AddCustomExerciseAddEquipmentListComponent,
} from './add-custom-exercise-add-equipment-list/add-custom-exercise-add-equipment-list.component';
import {
  AddCustomExerciseAddMusclesListComponent,
} from './add-custom-exercise-add-muscles-list/add-custom-exercise-add-muscles-list.component';

@Component({
  selector: 'app-add-custom-exercise',
  templateUrl: './add-custom-exercise.component.html',
  styleUrls: ['./add-custom-exercise.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInput,
    IonText,
    IonTitle,
    IonToolbar,
    NgIf,
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonList,
    NgForOf,
    IonItemGroup,
  ],
})
export class AddCustomExerciseComponent {
  authService = inject(AuthService);
  exerciseService = inject(ExerciseService);
  modalController = inject(ModalController);

  exerciseName = new FormControl<string>("", {
    validators: [
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^(?!.*\s{2,})[A-Za-z0-9ĄąĆćĘęŁłŃńÓóŚśŹźŻż]+(?: [A-Za-z0-9ĄąĆćĘęŁłŃńÓóŚśŹźŻż]+)*$/),
    ],
  });

  equipment: Equipment[] = [];
  muscles: Muscle[] = [];

  async save() {
    this.exerciseService.add$.next({
      name: this.exerciseName.getRawValue()!,
      equipment: [],
      muscles: [],
    });

    await this.modalController.dismiss(null, 'save');
  }

  removeEquipment(index: number) {
    if (index >= 0 && index < this.equipment.length) {
      this.equipment.splice(index, 1);
    } else {
      console.warn('Invalid index provided for removing equipment:', index);
    }
  }

  async addEquipment() {
    const modal = await this.modalController.create({
      component: AddCustomExerciseAddEquipmentListComponent,
      componentProps: {
        equipment: this.equipment,
      }
    });

    await modal.present();

    const {data, role} = await modal.onDidDismiss();

    if (role === 'confirm') {
      this.equipment = data;
    }
  }

  removeMuscle(index: number) {
    if (index >= 0 && index < this.equipment.length) {
      this.equipment.splice(index, 1);
    } else {
      console.warn('Invalid index provided for removing equipment:', index);
    }
  }

  async addMuscles() {
    const modal = await this.modalController.create({
      component: AddCustomExerciseAddMusclesListComponent,
      componentProps: {
        muscles: this.muscles,
      }
    });

    await modal.present();

    const {data, role} = await modal.onDidDismiss();

    if (role === 'confirm') {
      this.muscles = data;
    }
  }
}
