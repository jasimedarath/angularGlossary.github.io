import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactGettingstartedComponent } from './react-gettingstarted.component';

describe('ReactGettingstartedComponent', () => {
  let component: ReactGettingstartedComponent;
  let fixture: ComponentFixture<ReactGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
