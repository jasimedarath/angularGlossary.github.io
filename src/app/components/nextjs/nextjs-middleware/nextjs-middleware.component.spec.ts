import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsMiddlewareComponent } from './nextjs-middleware.component';

describe('NextjsMiddlewareComponent', () => {
  let component: NextjsMiddlewareComponent;
  let fixture: ComponentFixture<NextjsMiddlewareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsMiddlewareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsMiddlewareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
