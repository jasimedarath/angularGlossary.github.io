import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactComponentsComponent } from './react-components.component';

describe('ReactComponentsComponent', () => {
  let component: ReactComponentsComponent;
  let fixture: ComponentFixture<ReactComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
