import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-budget-legend',
  templateUrl: './budget-legend.component.html',
  styleUrls: ['./budget-legend.component.css']
})
export class BudgetLegendComponent implements OnInit {

  @Input('colorScale') colorScale = d3.scaleOrdinal();
  @Input('width') width = 0;
  @Input('height') height = 0;
  @Input('margin') margin = {top: 0, left: 0, right: 0, bottom: 0};
  public texts = ['Amount decreased compared to 2016', 'Amount increased compared to 2016'];
  constructor() { }

  ngOnInit() {
  }

}
