import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactTypescriptComponent } from './react-typescript.component';

describe('ReactTypescriptComponent', () => {
  let component: ReactTypescriptComponent;
  let fixture: ComponentFixture<ReactTypescriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactTypescriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactTypescriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
