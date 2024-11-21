import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BirthdaySettingsComponent } from './birthday-settings.component';

describe('BirthdaySettingsComponent', () => {
  let component: BirthdaySettingsComponent;
  let fixture: ComponentFixture<BirthdaySettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BirthdaySettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BirthdaySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
