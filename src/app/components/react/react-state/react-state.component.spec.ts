import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactStateComponent } from './react-state.component';

describe('ReactStateComponent', () => {
  let component: ReactStateComponent;
  let fixture: ComponentFixture<ReactStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactStateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
