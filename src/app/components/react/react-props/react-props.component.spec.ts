import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactPropsComponent } from './react-props.component';

describe('ReactPropsComponent', () => {
  let component: ReactPropsComponent;
  let fixture: ComponentFixture<ReactPropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactPropsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactPropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
