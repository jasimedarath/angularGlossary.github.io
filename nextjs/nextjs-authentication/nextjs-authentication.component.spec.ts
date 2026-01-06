import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsAuthenticationComponent } from './nextjs-authentication.component';

describe('NextjsAuthenticationComponent', () => {
  let component: NextjsAuthenticationComponent;
  let fixture: ComponentFixture<NextjsAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsAuthenticationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
