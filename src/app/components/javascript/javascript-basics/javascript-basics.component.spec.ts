import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptBasicsComponent } from './javascript-basics.component';

describe('JavascriptBasicsComponent', () => {
  let component: JavascriptBasicsComponent;
  let fixture: ComponentFixture<JavascriptBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptBasicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
