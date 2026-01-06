import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactContextComponent } from './react-context.component';

describe('ReactContextComponent', () => {
  let component: ReactContextComponent;
  let fixture: ComponentFixture<ReactContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
