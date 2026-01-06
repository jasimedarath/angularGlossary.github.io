import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnNgrxComponent } from './learn-ngrx.component';

describe('LearnNgrxComponent', () => {
  let component: LearnNgrxComponent;
  let fixture: ComponentFixture<LearnNgrxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnNgrxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnNgrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
