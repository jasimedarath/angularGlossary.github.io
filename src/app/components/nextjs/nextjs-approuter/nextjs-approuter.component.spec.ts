import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsApprouterComponent } from './nextjs-approuter.component';

describe('NextjsApprouterComponent', () => {
  let component: NextjsApprouterComponent;
  let fixture: ComponentFixture<NextjsApprouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsApprouterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsApprouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
