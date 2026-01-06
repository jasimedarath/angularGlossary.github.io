import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactListsComponent } from './react-lists.component';

describe('ReactListsComponent', () => {
  let component: ReactListsComponent;
  let fixture: ComponentFixture<ReactListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
