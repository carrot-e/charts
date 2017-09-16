import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BudgetItem } from '../budget-item';
import * as d3 from 'd3';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  private parentNativeElement: any;

  public chartWidth = 600;
  public chartHeight = 400;
  public chartMargin = {top: 0, right: 0, bottom: 0, left: 0};
  public nodes;
  public colorScale = d3.scaleOrdinal()
    .range(['#ff4632', '#c3f1b9'])
    .domain(['lt', 'gt']);

  constructor(
    element: ElementRef,
    private http: HttpClient
  ) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.http.get('/assets/budget-2017.csv', {responseType: 'text'}).subscribe(data => {
      this.render(d3.csvParse(data));
    });
  }

  render(data: BudgetItem[]) {
    data.map(i => {
      i.amount = +i.amount2017;
      return i;
    });

    this.nodes = this.getNodes(data, this.chartWidth, this.chartHeight);
  }

  private getNodes(data, width, height) {
    const maxAmount = +d3.max(data, (d: BudgetItem) => d.amount);
    const minAmount = +d3.min(data, (d: BudgetItem) => d.amount);
    const total2017 = d3.sum(data, (d: BudgetItem) => d.amount2017);
    const total2016 = d3.sum(data, (d: BudgetItem) => d.amount2016);
    const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([2, 85])
      .domain([minAmount, maxAmount]);

    data.sort((a, b) => b.amount - a.amount);

    return data.map(d => ({
      title: d.title,
      amount: d.amount,
      radius: radiusScale(d.amount),
      x: Math.random() * width,
      y: Math.random() * height,
      diff: d.amount / total2017 > d.amount2016 / total2016 ? 'gt' : 'lt',
      diffPercents: (d.amount / total2017 - d.amount2016 / total2016) * 100
    }));
  }
}
