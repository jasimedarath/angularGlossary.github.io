import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextjsDatabaseComponent } from './nextjs-database.component';

describe('NextjsDatabaseComponent', () => {
  let component: NextjsDatabaseComponent;
  let fixture: ComponentFixture<NextjsDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextjsDatabaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextjsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
