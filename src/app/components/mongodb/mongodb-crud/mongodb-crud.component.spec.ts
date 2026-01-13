import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbCrudComponent } from './mongodb-crud.component';

describe('MongodbCrudComponent', () => {
  let component: MongodbCrudComponent;
  let fixture: ComponentFixture<MongodbCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongodbCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongodbCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
