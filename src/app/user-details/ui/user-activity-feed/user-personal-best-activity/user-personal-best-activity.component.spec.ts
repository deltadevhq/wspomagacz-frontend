import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserPersonalBestActivityComponent } from './user-personal-best-activity.component';

describe('UserPersonalBestActivityComponent', () => {
  let component: UserPersonalBestActivityComponent;
  let fixture: ComponentFixture<UserPersonalBestActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserPersonalBestActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPersonalBestActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
