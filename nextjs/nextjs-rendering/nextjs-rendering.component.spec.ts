import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsRenderingComponent } from './nextjs-rendering.component';

describe('NextjsRenderingComponent', () => {
  let component: NextjsRenderingComponent;
  let fixture: ComponentFixture<NextjsRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsRenderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
