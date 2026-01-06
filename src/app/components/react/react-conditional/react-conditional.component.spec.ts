import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactConditionalComponent } from './react-conditional.component';

describe('ReactConditionalComponent', () => {
  let component: ReactConditionalComponent;
  let fixture: ComponentFixture<ReactConditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactConditionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactConditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
