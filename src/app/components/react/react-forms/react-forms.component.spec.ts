import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactFormsComponent } from './react-forms.component';

describe('ReactFormsComponent', () => {
  let component: ReactFormsComponent;
  let fixture: ComponentFixture<ReactFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
