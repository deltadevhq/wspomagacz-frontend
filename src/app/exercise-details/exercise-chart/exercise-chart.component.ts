import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ExerciseService } from '../../shared/data-access/exercise.service';
import { ExerciseStats } from '../../shared/models/Exercise';
import { IonIcon, IonItem, IonLabel, IonList, IonText } from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-exercise-chart',
  templateUrl: './exercise-chart.component.html',
  styleUrls: ['./exercise-chart.component.scss'],
  imports: [
    IonText,
    IonItem,
    IonLabel,
    IonList,
    NgForOf,
    IonIcon,
    NgIf,

  ],
})
export class ExerciseChartComponent implements AfterViewInit, OnDestroy {
  private exerciseService = inject(ExerciseService);

  @Input({required: true}) exerciseId!: number;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;
  selectedDate: string = 'Brak danych'; // Default date
  selectedWeight: number = 0; // Default weight

  stats?: ExerciseStats = {
    data: [], exercise_id: 0, exercise_type: '', personal_best: {
      date: '', weight: 0
    }, user_id: 0
  };

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    this.exerciseService.getExerciseStats(this.exerciseId).subscribe((stats) => {
      if (!stats) {
        return;
      }

      this.stats = {
        ...stats,
        data: stats.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      };

      this.selectedDate = this.stats.data[this.stats.data.length - 1].date;
      this.selectedWeight = this.stats.data[this.stats.data.length - 1].weight;

      // Calculate min and max to create the gradient range
      const minValue = Math.min(...this.stats.data.map((entry) => entry.weight));
      const maxValue = Math.max(...this.stats.data.map((entry) => entry.weight));

      const ctx = this.canvasRef.nativeElement.getContext('2d');

      const canvasHeight = this.canvasRef.nativeElement.height;
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0.2, '#5DC551');
      gradient.addColorStop(0.8, '#F87171');

      // Add padding to the range
      const rangePadding = (maxValue - minValue) * 0.4; // 40% padding

      const data = {
        labels: this.stats.data.map((entry) => entry.date).slice(-5),
        datasets: [
          {
            data: this.stats.data.map((entry) => entry.weight).slice(-5),
            borderColor: gradient,
            backgroundColor: gradient,
            pointBackgroundColor: gradient,
            pointRadius: 4,
            hoverRadius: 6,
            tension: 0.4,
          },
        ],
      };

      // Keep track of the last hovered index (default is the last data point)
      let lastHoveredIndex = data.datasets[0].data.length - 1;

      const options: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: false, // Disable default tooltips
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: true, // Enable the y-axis for scaling
            grid: {
              drawTicks: false,
              drawOnChartArea: false,
            },
            ticks: {
              display: false, // Hide y-axis labels
            },
            suggestedMin: minValue - rangePadding, // Add padding below
            suggestedMax: maxValue + rangePadding, // Add padding above
          },
        },
        onHover: (event, elements) => {
          if (elements.length) {
            const index = elements[0].index;
            this.selectedDate = data.labels[index];
            this.selectedWeight = data.datasets[0].data[index] as number;

            lastHoveredIndex = index;
          }

          this.chart.update();
        },
      };

      const linePlugin = {
        id: 'hoverLine',
        beforeDraw: (chart: any) => {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;

          // Get the x position of the hovered or last data point
          const xPosition = xAxis.getPixelForValue(lastHoveredIndex);

          // Create a vertical gradient
          const gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // Fully transparent at the top
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)'); // Fully visible in the center
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Fully transparent at the bottom

          // Save the current context state
          ctx.save();

          // Draw the tapered line
          ctx.beginPath();
          ctx.moveTo(xPosition, yAxis.top);
          ctx.lineTo(xPosition, yAxis.bottom);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1; // Maximum width at the center
          ctx.lineCap = 'round'; // Rounded edges for smooth tapering
          ctx.stroke();

          // Restore the context state
          ctx.restore();
        },
      };

      this.chart = new Chart(this.canvasRef.nativeElement, {
        type: 'line',
        data,
        options,
        plugins: [linePlugin],
      });
    });
  }
}
