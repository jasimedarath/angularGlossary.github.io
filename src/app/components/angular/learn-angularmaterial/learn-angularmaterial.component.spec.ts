import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnAngularmaterialComponent } from './learn-angularmaterial.component';

describe('LearnAngularmaterialComponent', () => {
  let component: LearnAngularmaterialComponent;
  let fixture: ComponentFixture<LearnAngularmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnAngularmaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnAngularmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
