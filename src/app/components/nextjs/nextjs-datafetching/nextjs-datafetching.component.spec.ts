import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsDatafetchingComponent } from './nextjs-datafetching.component';

describe('NextjsDatafetchingComponent', () => {
  let component: NextjsDatafetchingComponent;
  let fixture: ComponentFixture<NextjsDatafetchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsDatafetchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsDatafetchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
