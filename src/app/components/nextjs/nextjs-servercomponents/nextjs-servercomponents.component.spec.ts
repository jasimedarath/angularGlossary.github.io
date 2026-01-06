import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsServercomponentsComponent } from './nextjs-servercomponents.component';

describe('NextjsServercomponentsComponent', () => {
  let component: NextjsServercomponentsComponent;
  let fixture: ComponentFixture<NextjsServercomponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsServercomponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsServercomponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
