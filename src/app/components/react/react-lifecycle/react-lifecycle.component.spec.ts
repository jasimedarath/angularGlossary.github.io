import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactLifecycleComponent } from './react-lifecycle.component';

describe('ReactLifecycleComponent', () => {
  let component: ReactLifecycleComponent;
  let fixture: ComponentFixture<ReactLifecycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactLifecycleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactLifecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
