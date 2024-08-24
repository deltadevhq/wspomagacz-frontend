import {Component} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {HomeCalendarComponent} from "../components/home-calendar/home-calendar.component";

@Component({
    standalone: true,
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    imports: [
        IonicModule,
        NgForOf,
        HomeCalendarComponent,
    ]
})
export class HomePageComponent {

    constructor() {
    }
}
