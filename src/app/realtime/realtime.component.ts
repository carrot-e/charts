import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { D3, D3Service } from 'd3-ng2-service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;
  private svg;
  private min = 0;
  private max = 100;

  private margin = {top: 0, right: 0, bottom: 0, left: 0};
  private fullWidth = 600;
  private fullHeight = 600;
  private width = this.fullWidth - this.margin.left - this.margin.right;
  private height = this.fullHeight - this.margin.top - this.margin.bottom;

  @ViewChild('chart') chart;

  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.renderBase();
    // Observable.interval(10000)
    //   .map((i: number) => Math.floor(Math.random() * (this.max - this.min)) + this.min)
    //   .subscribe(d => console.log(d));
  }

  renderBase() {
    this.svg = this.d3.select(this.chart.nativeElement)
      .append('svg')
        .attr('width', this.fullWidth)
        .attr('height', this.fullHeight)
        .call(this.responsivefy, this.d3)
      .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const d3 = this.d3;

    const yScale = d3.scaleLinear()
      .domain([this.min, this.max])
      .range([this.height, 0]);

    const yAxis = d3.axisLeft(yScale);
    this.svg.call(yAxis);

    const xScale = d3.scaleTime()
      .domain([new Date(2016, 0, 1, 6), new Date(2016, 0, 1, 9)])
      .range([0, this.width]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeMinute.every(45))
      .tickSizeInner(10)
      .tickSizeOuter(20)
      .tickPadding(10);

    this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);
  }

  private responsivefy(svg, d3) {
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
