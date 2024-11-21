import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisplayNameSettingsComponent } from './display-name-settings.component';

describe('DisplayNameSettingsComponent', () => {
  let component: DisplayNameSettingsComponent;
  let fixture: ComponentFixture<DisplayNameSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DisplayNameSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayNameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
