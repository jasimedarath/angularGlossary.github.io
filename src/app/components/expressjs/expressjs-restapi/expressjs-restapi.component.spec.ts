import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressjsRestapiComponent } from './expressjs-restapi.component';

describe('ExpressjsRestapiComponent', () => {
  let component: ExpressjsRestapiComponent;
  let fixture: ComponentFixture<ExpressjsRestapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressjsRestapiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressjsRestapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
