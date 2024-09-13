import { Component } from '@angular/core';
import {
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.component.html',
    styleUrls: ['tabs.component.scss'],
    standalone: true,
    imports: [IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon],
})
export class TabsComponent {
    constructor() {}
}
