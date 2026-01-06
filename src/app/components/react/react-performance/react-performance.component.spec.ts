import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactPerformanceComponent } from './react-performance.component';

describe('ReactPerformanceComponent', () => {
  let component: ReactPerformanceComponent;
  let fixture: ComponentFixture<ReactPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
