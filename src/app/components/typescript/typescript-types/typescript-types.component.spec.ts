import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptTypesComponent } from './typescript-types.component';

describe('TypescriptTypesComponent', () => {
  let component: TypescriptTypesComponent;
  let fixture: ComponentFixture<TypescriptTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypescriptTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypescriptTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
