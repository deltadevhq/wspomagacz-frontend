import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

export interface HighlightedDate {
    date: Date;
    color: string;
}

@Component({
    standalone: true,
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    imports: [IonicModule, AsyncPipe, NgIf, NgForOf],
})
export class CalendarComponent implements OnInit {
    protected readonly weekdays: string[] = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];

    protected readonly today: Date = new Date();

    @Input() initialDate: Date = new Date();
    @Input() highlightedDates: HighlightedDate[] = [];

    @Output() selectedDateChange = new EventEmitter<Date>();

    ngOnInit() {
        this.selectedDay$.next(this.initialDate);

        this.selectedDay$.subscribe((date) => {
            this.selectedDateChange.emit(date);
        });

        this.monthFirstDay$.next(this.calculateMonthFirstDay(this.initialDate));
    }

    readonly selectedDay$ = new BehaviorSubject<Date>(new Date());
    protected readonly monthFirstDay$ = new BehaviorSubject<Date>(
        this.calculateMonthFirstDay(this.today),
    );

    protected readonly monthDays$ = this.monthFirstDay$.pipe(
        map((firstDay) => {
            const daysInMonth = new Date(
                firstDay.getFullYear(),
                firstDay.getMonth() + 1,
                0,
            ).getDate();
            const firstDayOfWeek = firstDay.getDay();
            const offsetDays = Array.from(
                { length: firstDayOfWeek },
                () => null,
            );
            const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
                const day = new Date(firstDay);
                day.setDate(firstDay.getDate() + i);
                return day;
            });
            return [...offsetDays, ...monthDays];
        }),
    );

    protected readonly monthAgo$ = this.monthFirstDay$.pipe(
        map((day) => {
            const monthAgo = new Date(day);
            monthAgo.setMonth(day.getMonth() - 1);
            return this.calculateMonthFirstDay(monthAgo);
        }),
    );

    protected readonly monthAhead$ = this.monthFirstDay$.pipe(
        map((day) => {
            const monthAhead = new Date(day);
            monthAhead.setMonth(day.getMonth() + 1);
            return this.calculateMonthFirstDay(monthAhead);
        }),
    );

    protected calculateMonthFirstDay(day: Date) {
        return new Date(day.getFullYear(), day.getMonth(), 1);
    }

    fillDate(date: Date): string {
        const selectedDay = this.selectedDay$.value.toDateString();
        const day = date.toDateString();

        const isSelectedDay = selectedDay === day;
        const isToday = day === this.today.toDateString();

        const isHighlighted = this.highlightedDates.some(
            (highlightedDate) => highlightedDate.date.toDateString() === day,
        );

        if (isSelectedDay || isHighlighted) {
            return 'solid';
        } else if (isToday) {
            return 'outline';
        }

        return 'clear';
    }

    colorDate(date: Date): string {
        const selectedDay = this.selectedDay$.value.toDateString();
        const day = date.toDateString();

        const isSelectedDay = selectedDay === day;
        const isToday = day === this.today.toDateString();

        const highlightedDate = this.highlightedDates.find(
            (highlightedDate) => highlightedDate.date.toDateString() === day,
        );

        if (isSelectedDay || isToday) {
            return 'primary';
        } else if (highlightedDate) {
            return highlightedDate.color;
        }

        return 'medium';
    }
}
