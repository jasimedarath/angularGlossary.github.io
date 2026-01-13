import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptAdvancedComponent } from './typescript-advanced.component';

describe('TypescriptAdvancedComponent', () => {
  let component: TypescriptAdvancedComponent;
  let fixture: ComponentFixture<TypescriptAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptAdvancedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypescriptAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
