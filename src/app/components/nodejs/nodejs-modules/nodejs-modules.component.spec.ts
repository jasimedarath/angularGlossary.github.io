import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodejsModulesComponent } from './nodejs-modules.component';

describe('NodejsModulesComponent', () => {
  let component: NodejsModulesComponent;
  let fixture: ComponentFixture<NodejsModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodejsModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodejsModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
