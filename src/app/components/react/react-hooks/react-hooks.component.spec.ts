import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactHooksComponent } from './react-hooks.component';

describe('ReactHooksComponent', () => {
  let component: ReactHooksComponent;
  let fixture: ComponentFixture<ReactHooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactHooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactHooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
