import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbMongooseComponent } from './mongodb-mongoose.component';

describe('MongodbMongooseComponent', () => {
  let component: MongodbMongooseComponent;
  let fixture: ComponentFixture<MongodbMongooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongodbMongooseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongodbMongooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
