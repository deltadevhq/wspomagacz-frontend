import { Component, computed, input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'app-avatar-level-progress',
    templateUrl: './avatar-level-progress.component.html',
    styleUrls: ['./avatar-level-progress.component.scss'],
    imports: [IonicModule],
})
export class AvatarLevelProgressComponent {
    level = input.required<number>();
    exp = input.required<number>();

    progress = computed(() => this.exp() / (this.level() * 100));
    degree = computed(() => this.progress() * 360);
}
