import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsOptimizationComponent } from './nextjs-optimization.component';

describe('NextjsOptimizationComponent', () => {
  let component: NextjsOptimizationComponent;
  let fixture: ComponentFixture<NextjsOptimizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsOptimizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsOptimizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
