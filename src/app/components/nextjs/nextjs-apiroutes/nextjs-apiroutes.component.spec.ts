import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsApiroutesComponent } from './nextjs-apiroutes.component';

describe('NextjsApiroutesComponent', () => {
  let component: NextjsApiroutesComponent;
  let fixture: ComponentFixture<NextjsApiroutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsApiroutesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsApiroutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
