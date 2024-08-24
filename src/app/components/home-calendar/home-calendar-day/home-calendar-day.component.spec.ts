import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HomeCalendarDayComponent} from './home-calendar-day.component';

describe('HomeCalendarDayComponent', () => {
    let component: HomeCalendarDayComponent;
    let fixture: ComponentFixture<HomeCalendarDayComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), HomeCalendarDayComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeCalendarDayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
