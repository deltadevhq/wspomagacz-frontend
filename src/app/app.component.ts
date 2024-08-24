import {Component} from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
    alertCircleOutline,
    caretBack,
    caretForward,
    cloudyOutline,
    flameOutline,
    flash,
    homeOutline,
    personOutline,
    settings,
    timeOutline,
    trophyOutline
} from "ionicons/icons";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
    constructor() {
        addIcons({
            flash,
            timeOutline,
            settings,
            homeOutline,
            personOutline,
            flameOutline,
            trophyOutline,
            caretBack,
            caretForward,
            cloudyOutline,
            alertCircleOutline,
        })
    }
}
