import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodejsGettingstartedComponent } from './nodejs-gettingstarted.component';

describe('NodejsGettingstartedComponent', () => {
  let component: NodejsGettingstartedComponent;
  let fixture: ComponentFixture<NodejsGettingstartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodejsGettingstartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodejsGettingstartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
