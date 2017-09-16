import { AfterContentInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BudgetItem } from './budget-item';
import { TooltipStateService } from './tooltip-state.service';
import * as d3 from 'd3';

@Directive({
  selector: '[appForceSimulation]'
})
export class ForceSimulationDirective implements OnChanges, AfterContentInit {
  svg: d3.Selection<Element, {}, Element, {}>;
  bubbles: d3.Selection<Element, BudgetItem, Element, {}>;
  simulation: d3.Simulation<d3.SimulationNodeDatum, d3.SimulationLinkDatum>;
  @Input('forceStrength') forceStrength = 0.03;
  @Input('width') width;
  @Input('height') height;
  @Input('nodes') nodes;
  @Input('colorScale') colorScale;

  constructor(
    private tooltipState: TooltipStateService,
    private el: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('nodes' in changes && changes.nodes.currentValue) {
      this.renderNodes();
    }
  }
  renderNodes() {
    this.bubbles = this.svg.selectAll('.bubble')
      .data(this.nodes)
      .enter()
      .append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('fill', (d: any) => this.colorScale(d.diff).toString())
      .attr('stroke', (d: any) => d3.rgb(this.colorScale(d.diff).toString()).darker().toString())
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
        this.simulation.force('x', d3.forceX().strength(this.forceStrength).x((dd: BudgetItem) => {
          if (d.title === dd.title) {
            return this.width / 3 * 2;
          }
          return this.width / 3;
        }));
        this.simulation.alpha(0.5).restart();
      });

    this.bubbles
      .transition()
      .duration(500)
      .attr('r', (d: any) => d.radius);

    this.simulation.nodes(this.nodes);
    this.simulation.alpha(0.5).restart();
  }

  ngAfterContentInit() {
    this.svg = d3.select(this.el.nativeElement).select('.root');

    this.simulation = d3.forceSimulation()
      .velocityDecay(0.15)
      .force('x', d3.forceX().strength(this.forceStrength).x(this.width / 2))
      .force('y', d3.forceY().strength(this.forceStrength).y(this.height / 2))
      .force('charge', d3.forceManyBody().strength((d: any) => -Math.pow(d.radius, 2.0) / 20))
      .on('tick', () => this.ticked());

    this.simulation.stop();
  }

  private ticked() {
    this.bubbles
      .attr('cx', (d: any) => d.x)
      .attr('cy', (d: any) => d.y);
  }
}
