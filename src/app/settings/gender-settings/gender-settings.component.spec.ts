import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenderSettingsComponent } from './gender-settings.component';

describe('GenderSettingsComponent', () => {
  let component: GenderSettingsComponent;
  let fixture: ComponentFixture<GenderSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GenderSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
