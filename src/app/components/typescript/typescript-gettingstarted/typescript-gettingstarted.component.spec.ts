import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptGettingstartedComponent } from './typescript-gettingstarted.component';

describe('TypescriptGettingstartedComponent', () => {
  let component: TypescriptGettingstartedComponent;
  let fixture: ComponentFixture<TypescriptGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypescriptGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
