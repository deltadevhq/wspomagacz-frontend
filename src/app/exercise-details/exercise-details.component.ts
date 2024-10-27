import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
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
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';
import Chart from 'chart.js/auto';
import { ExerciseService } from '../shared/data-access/exercise.service';
import { Exercise } from '../shared/models/Exercise';

@Component({
  standalone: true,
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss'],
  imports: [NgForOf, NgIf, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonText, IonList, IonItem, IonLabel],
})
export class ExerciseDetailsComponent implements AfterViewInit {
  exercise?: Exercise;

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart: any = [];

  private exerciseService = inject(ExerciseService);

  modalController = inject(ModalController);
  private cdr = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;

    // TODO: Chart data should be fetched from the API

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [29, 32, 35, 42, 34, 30],
        datasets: [
          {
            label: 'Weight lifted',
            data: [29, 32, 35, 42, 34, 30],
            borderColor: '#F87171',
            fill: false,
            tension: 0.33,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
      },
    });

    // Mark for change detection
    this.cdr.detectChanges();
  }
}
