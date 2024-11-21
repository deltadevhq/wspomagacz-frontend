import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserActivityComponent } from './user-activity.component';

describe('UserActivityComponent', () => {
  let component: UserActivityComponent;
  let fixture: ComponentFixture<UserActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [UserActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
