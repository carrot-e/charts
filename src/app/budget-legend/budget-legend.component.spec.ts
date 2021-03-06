import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetLegendComponent } from './budget-legend.component';
import { SvgBaseComponent } from '../svg-base/svg-base.component';

describe('BudgetLegendComponent', () => {
  let component: BudgetLegendComponent;
  let fixture: ComponentFixture<BudgetLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetLegendComponent, SvgBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
