import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsDeploymentComponent } from './nextjs-deployment.component';

describe('NextjsDeploymentComponent', () => {
  let component: NextjsDeploymentComponent;
  let fixture: ComponentFixture<NextjsDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsDeploymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
