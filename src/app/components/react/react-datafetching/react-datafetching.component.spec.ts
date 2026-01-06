import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactDatafetchingComponent } from './react-datafetching.component';

describe('ReactDatafetchingComponent', () => {
  let component: ReactDatafetchingComponent;
  let fixture: ComponentFixture<ReactDatafetchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactDatafetchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactDatafetchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
