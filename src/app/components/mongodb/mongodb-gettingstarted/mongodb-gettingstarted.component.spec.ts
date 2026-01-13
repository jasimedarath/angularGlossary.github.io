import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MongodbGettingstartedComponent } from './mongodb-gettingstarted.component';

describe('MongodbGettingstartedComponent', () => {
  let component: MongodbGettingstartedComponent;
  let fixture: ComponentFixture<MongodbGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MongodbGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MongodbGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
