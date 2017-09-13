import { Component, ElementRef, OnInit } from '@angular/core';
import { D3Service, D3 } from 'd3-ng2-service';
import { HttpClient } from '@angular/common/http';
import { BudgetItem } from '../budget-item';
import { TooltipStateService } from '../tooltip-state.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;

  constructor(
    element: ElementRef,
    d3Service: D3Service,
    private http: HttpClient,
    private tooltipState: TooltipStateService
  ) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.http.get('/assets/budget-2017.csv', {responseType: 'text'}).subscribe(data => {
      this.render(this.d3.csvParse(data));
    });
  }

  render(data: any) {
    const d3 = this.d3;
    const margin = {top: 0, right: 0, bottom: 0, left: 0};
    const fullWidth = 600;
    const fullHeight = 600;
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top - margin.bottom;
    const forceStrength = 0.05;

    data.map(i => {
      i.amount = +i.amount2017;
      return i;
    });

    const svg = d3.select(this.parentNativeElement)
      .select('.budget')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const simulation = d3.forceSimulation()
      .velocityDecay(0.15)
      .force('x', d3.forceX().strength(forceStrength).x(width / 2))
      .force('y', d3.forceY().strength(forceStrength).y(height / 2))
      .force('charge', d3.forceManyBody().strength((d: any) => -Math.pow(d.radius, 2.0) / 20))
      .on('tick', ticked);

    simulation.stop();
    const nodes = this.getNodes(data, width, height);

    const colorScale = d3.scaleOrdinal()
      .range(['#ff4632', '#c3f1b9'])
      .domain(['lt', 'gt']);

    const bubbles = svg.selectAll('.bubble')
      .data(nodes)
      .enter()
      .append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', (d: any) => colorScale(d.diff).toString())
      .attr('stroke', (d: any) => d3.rgb(colorScale(d.diff).toString()).darker().toString())
      .on('mouseover', (d, i, all) => {
        d3.select(all[i]).style('stroke', '#333');
        this.tooltipState.show(d, d3.event);
      })
      .on('mouseout', (d, i, all) => {
        d3.select(all[i]).style('stroke', null);
        this.tooltipState.hide();
      })
      .on('click', (d: BudgetItem) => {
        this.tooltipState.hide();
        simulation.force('x', d3.forceX().strength(forceStrength).x((dd: BudgetItem) => {
          if (d.title === dd.title) {
            return width / 3 * 2;
          }
          return width / 3;
        }));
        simulation.alpha(0.5).restart();
      });

    bubbles
      .transition()
      .duration(500)
      .attr('r', (d: any) => d.radius);

    simulation.nodes(nodes);
    simulation.alpha(0.5).restart();

    function ticked() {
      bubbles
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    }
  }

  private getNodes(data, width, height) {
    const d3 = this.d3;
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
