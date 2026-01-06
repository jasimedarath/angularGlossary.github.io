import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactTestingComponent } from './react-testing.component';

describe('ReactTestingComponent', () => {
  let component: ReactTestingComponent;
  let fixture: ComponentFixture<ReactTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactTestingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
