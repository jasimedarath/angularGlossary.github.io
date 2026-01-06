import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactStylingComponent } from './react-styling.component';

describe('ReactStylingComponent', () => {
  let component: ReactStylingComponent;
  let fixture: ComponentFixture<ReactStylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactStylingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
