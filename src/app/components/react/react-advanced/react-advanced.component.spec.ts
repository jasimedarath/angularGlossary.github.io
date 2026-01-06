import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactAdvancedComponent } from './react-advanced.component';

describe('ReactAdvancedComponent', () => {
  let component: ReactAdvancedComponent;
  let fixture: ComponentFixture<ReactAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactAdvancedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
