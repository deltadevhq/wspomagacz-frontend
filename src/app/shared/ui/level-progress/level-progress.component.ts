import { Component, inject } from '@angular/core';
import { IonProgressBar } from '@ionic/angular/standalone';
import { ExperienceService } from '../../data-access/experience.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-level-progress',
  templateUrl: './level-progress.component.html',
  styleUrls: ['./level-progress.component.scss'],
  imports: [
    IonProgressBar,
    NgIf,
    AsyncPipe,
  ],
})
export class LevelProgressComponent {
  experienceService = inject(ExperienceService);
  level$ = toObservable(this.experienceService.level);
}
