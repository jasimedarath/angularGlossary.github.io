import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsGettingstartedComponent } from './nextjs-gettingstarted.component';

describe('NextjsGettingstartedComponent', () => {
  let component: NextjsGettingstartedComponent;
  let fixture: ComponentFixture<NextjsGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
