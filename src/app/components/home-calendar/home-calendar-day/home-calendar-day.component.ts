import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    standalone: true,
    selector: 'app-home-calendar-day',
    templateUrl: './home-calendar-day.component.html',
    styleUrls: ['./home-calendar-day.component.scss'],
    imports: [
        IonicModule
    ]
})
export class HomeCalendarDayComponent implements OnInit {
    @Input() day: Date = new Date();
    @Input() fill = 'clear';
    @Input() color = 'medium';

    constructor() {
    }

    ngOnInit() {
    }
}
