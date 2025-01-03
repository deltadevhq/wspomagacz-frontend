import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';
import { Exercise } from '../shared/models/Exercise';
import { ExerciseChartComponent } from './exercise-chart/exercise-chart.component';

@Component({
  standalone: true,
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  imports: [NgForOf, NgIf, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText, IonList, IonItem, IonLabel, IonTitle, ExerciseChartComponent],
})
export class ExerciseDetailsComponent {
  exercise?: Exercise;

  modalController = inject(ModalController);
}
