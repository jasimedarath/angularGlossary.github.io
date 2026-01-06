import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactEventsComponent } from './react-events.component';

describe('ReactEventsComponent', () => {
  let component: ReactEventsComponent;
  let fixture: ComponentFixture<ReactEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
