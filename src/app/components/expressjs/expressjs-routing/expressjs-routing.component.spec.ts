import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressjsRoutingComponent } from './expressjs-routing.component';

describe('ExpressjsRoutingComponent', () => {
  let component: ExpressjsRoutingComponent;
  let fixture: ComponentFixture<ExpressjsRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpressjsRoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpressjsRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
