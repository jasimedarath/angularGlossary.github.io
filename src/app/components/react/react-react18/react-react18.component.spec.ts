import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactReact18Component } from './react-react18.component';

describe('ReactReact18Component', () => {
  let component: ReactReact18Component;
  let fixture: ComponentFixture<ReactReact18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactReact18Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactReact18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
