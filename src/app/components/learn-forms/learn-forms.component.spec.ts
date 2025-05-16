import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnFormsComponent } from './learn-forms.component';

describe('LearnFormsComponent', () => {
  let component: LearnFormsComponent;
  let fixture: ComponentFixture<LearnFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
