import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnRxjsComponent } from './learn-rxjs.component';

describe('LearnRxjsComponent', () => {
  let component: LearnRxjsComponent;
  let fixture: ComponentFixture<LearnRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnRxjsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
