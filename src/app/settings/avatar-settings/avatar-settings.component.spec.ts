import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarSettingsComponent } from './avatar-settings.component';

describe('AvatarSettingsComponent', () => {
  let component: AvatarSettingsComponent;
  let fixture: ComponentFixture<AvatarSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AvatarSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
