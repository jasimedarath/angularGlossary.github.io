import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressjsMiddlewareComponent } from './expressjs-middleware.component';

describe('ExpressjsMiddlewareComponent', () => {
  let component: ExpressjsMiddlewareComponent;
  let fixture: ComponentFixture<ExpressjsMiddlewareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressjsMiddlewareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressjsMiddlewareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
