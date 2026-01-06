import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWebpackComponent } from './learn-webpack.component';

describe('LearnWebpackComponent', () => {
  let component: LearnWebpackComponent;
  let fixture: ComponentFixture<LearnWebpackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnWebpackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnWebpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
