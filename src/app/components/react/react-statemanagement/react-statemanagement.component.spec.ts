import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactStatemanagementComponent } from './react-statemanagement.component';

describe('ReactStatemanagementComponent', () => {
  let component: ReactStatemanagementComponent;
  let fixture: ComponentFixture<ReactStatemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactStatemanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactStatemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
