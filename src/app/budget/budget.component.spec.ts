import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetComponent } from './budget.component';
import { SvgBaseComponent } from '../svg-base/svg-base.component';
import { ForceSimulationDirective } from '../force-simulation.directive';
import { BudgetLegendComponent } from '../budget-legend/budget-legend.component';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BudgetComponent,
        SvgBaseComponent,
        ForceSimulationDirective,
        BudgetLegendComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
