import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as d3 from 'd3';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  private parentNativeElement: any;
  private svg;
  private minX = 0;
  private maxX = 10;
  private minY = 0;
  private maxY = 100;
  private dt = 500;

  private margin = {top: 10, right: 10, bottom: 20, left: 30};
  private fullWidth = 600;
  private fullHeight = 600;
  private width = this.fullWidth - this.margin.left - this.margin.right;
  private height = this.fullHeight - this.margin.top - this.margin.bottom;

  private xScale;
  private yScale;

  private clock$;
  public isOn = true;

  @ViewChild('chart') chart;

  constructor(element: ElementRef) {
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.renderBase();

    this.clock$ = Observable.create(observer => {
      const that = this;
      let timeout,
        i = 0;

      (function push() {
        timeout = setTimeout(() => {
          if (that.isOn) {
            observer.next(i++);
          }
          push();
        }, that.dt);
      })();

      return () => clearTimeout(timeout);
    })
      .map((i: number) => {
        return {i, v: Math.floor(Math.random() * (this.maxY - this.minY)) + this.minY};
      })
      .subscribe((d) => this.renderTick(d));
  }

  control() {
    this.isOn = !this.isOn;
  }

  renderTick({i, v}) {
    d3
      .select('.circles-group')
      .transition()
      .duration(this.dt)
      .ease(d3.easeLinear)
      .attr('transform', `translate(${-i * this.xScale(this.minX + 1) + this.xScale(this.maxX)})`);

    d3.select('.circles-group').append('rect')
      .attr('x', this.xScale(i))
      .attr('y', this.yScale(v))
      .attr('width', 10)
      .attr('height', this.height - this.yScale(v));

    if (i > this.maxX) {
      d3
        .select('.circles-group rect:first-child')
        .remove();
    }
  }

  renderBase() {
    this.svg = d3.select(this.chart.nativeElement)
      .append('svg')
      .attr('width', this.fullWidth)
      .attr('height', this.fullHeight)
      .call(this.responsivefy)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.yScale = d3.scaleLinear()
      .domain([this.minY, this.maxY])
      .range([this.height, 0]);

    const yAxis = d3.axisLeft(this.yScale);
    this.svg.call(yAxis);

    this.xScale = d3.scaleLinear()
      .domain([this.minX, this.maxX])
      .range([0, this.width]);

    const xAxis = d3.axisBottom(this.xScale)
      .ticks(this.maxX);

    this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    this.svg
      .append('g')
      .attr('class', 'circles-group')
      .attr('transform', `translate(${this.xScale(this.maxX)})`);
  }

  private responsivefy(svg) {
    // get container + svg aspect ratio
    const container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10),
      aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr('viewBox', '0 0 ' + width + ' ' + height)
      .attr('preserveAspectRatio', 'xMinYMid')
      .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3
      .select(window)
      .on('resize.' + container.attr('id'), resize);

    // get width of container and resize svg to fit it
    function resize() {
      const targetWidth = parseInt(container.style('width'), 10);
      svg.attr('width', targetWidth);
      svg.attr('height', Math.round(targetWidth / aspect));
    }
  }
}
