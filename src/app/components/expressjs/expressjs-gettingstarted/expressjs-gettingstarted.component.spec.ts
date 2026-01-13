import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressjsGettingstartedComponent } from './expressjs-gettingstarted.component';

describe('ExpressjsGettingstartedComponent', () => {
  let component: ExpressjsGettingstartedComponent;
  let fixture: ComponentFixture<ExpressjsGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressjsGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressjsGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
