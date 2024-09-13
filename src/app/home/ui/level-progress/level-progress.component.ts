import { Component, computed, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-level-progress',
    templateUrl: './level-progress.component.html',
    styleUrls: ['./level-progress.component.scss'],
    imports: [IonicModule],
})
export class LevelProgressComponent {
    level = input.required<number>();
    exp = input.required<number>();

    progress = computed(() => this.exp() / (this.level() * 100));
}
