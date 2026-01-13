import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptEs6Component } from './javascript-es6.component';

describe('JavascriptEs6Component', () => {
  let component: JavascriptEs6Component;
  let fixture: ComponentFixture<JavascriptEs6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptEs6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptEs6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
