import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactJsxComponent } from './react-jsx.component';

describe('ReactJsxComponent', () => {
  let component: ReactJsxComponent;
  let fixture: ComponentFixture<ReactJsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactJsxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactJsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
