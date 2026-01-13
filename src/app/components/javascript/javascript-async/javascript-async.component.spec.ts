import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptAsyncComponent } from './javascript-async.component';

describe('JavascriptAsyncComponent', () => {
  let component: JavascriptAsyncComponent;
  let fixture: ComponentFixture<JavascriptAsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptAsyncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
