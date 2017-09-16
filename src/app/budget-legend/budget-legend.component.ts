import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-budget-legend',
  templateUrl: './budget-legend.component.html',
  styleUrls: ['./budget-legend.component.css']
})
export class BudgetLegendComponent implements OnInit {

  @Input('colorScale') colorScale;
  @Input('width') width;
  @Input('height') height;
  @Input('margin') margin;
  public texts = ['Amount decreased compared to 2016', 'Amount increased compared to 2016'];
  constructor() { }

  ngOnInit() {
  }

}
