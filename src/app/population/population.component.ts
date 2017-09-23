import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopulatedArea } from '../populated-area';
import { DomSanitizer } from '@angular/platform-browser';
import { RegionDensity } from '../region-density';
import * as d3 from 'd3';

@Component({
  selector: 'app-population',
  templateUrl: './population.component.html',
  styleUrls: ['./population.component.css']
})
export class PopulationComponent implements OnInit {

  @ViewChild('svg') svg;
  @ViewChild('mapContainer') mapContainer;
  map;

  public chartWidth = 612.47321;
  public chartHeight = 408.0199;
  public chartMargin = {top: 20, right: 10, bottom: 20, left: 10};

  constructor(
    public http: HttpClient,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.http.get('/assets/ukraine.svg', {responseType: 'text'}).subscribe(data => {
      this.map = this.sanitizer.bypassSecurityTrustHtml(data);
    });

    this.http.get('/assets/cities1000UA.csv', {responseType: 'text'}).subscribe(data => {
      this.renderPopulation(d3.csvParse(data));
    });

    // TEMP workaround: this is to wait while imported SVG gets rendered
    setTimeout(() => {
      this.http.get('/assets/ukraine-population-density.csv', {responseType: 'text'})
        .subscribe(data => this.renderDensity(d3.csvParse(data)));
    }, 0);
  }

  renderDensityLegend(svg, colorScale) {
    // Add a legend for the color values.
    const legendContainer = svg.append('g')
      .classed('legend-container', true)
      .attr('transform', `translate(10, 270)`);

    const legend = legendContainer.selectAll('.density-legend')
      .data(colorScale.ticks(6).slice(1).reverse())
      .enter().append('g')
      .attr('class', 'density-legend')
      .attr('transform', (d, i) => `translate(0, ${10 + i * 20})`);

    legendContainer.append('text')
      .text('Population density')
      .style('font-family', 'sans-serif')
      .style('font-size', '.7em');

    legend.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', colorScale);

    legend.append('text')
      .attr('x', 26)
      .attr('y', 10)
      .attr('dy', '.35em')
      .style('font-family', 'sans-serif')
      .style('font-size', '.7em')
      .text(String);
  }

  renderDensity(data) {
    const colorScale = d3.scaleSequential(d3.interpolateWarm)
      .domain(d3.extent(data, (d: RegionDensity) => +d.density));
    const svg = d3.select(this.mapContainer.nativeElement).select('svg');

    svg.selectAll('path')
      .data(data, function(d: RegionDensity) {
        return d ? d.regionId : this['id'];
      })
      .style('fill', (d: RegionDensity) => colorScale(+d.density));

    this.renderDensityLegend(svg, colorScale);
  }

  renderPopulation(data) {
    const width = this.chartWidth - this.chartMargin.left - this.chartMargin.right;
    const height = this.chartHeight - this.chartMargin.top - this.chartMargin.bottom;
    const svg = d3.select(this.svg.el.nativeElement).select('g');

    const scaleLongitude = d3.scaleLinear()
      .domain([
        +d3.min(data, (d: PopulatedArea) => d.longitude),
        +d3.max(data, (d: PopulatedArea) => d.longitude)
      ])
      .range([0, width]);

    const scaleLatitude = d3.scaleLinear()
      .domain([
        +d3.min(data, (d: PopulatedArea) => d.latitude),
        +d3.max(data, (d: PopulatedArea) => d.latitude)
      ])
      .range([height, 0]);

    const scalePopulation = d3.scalePow()
      .exponent(0.5)
      .domain(d3.extent(data, (d: PopulatedArea) => +d.population))
      .range([0, 20]);

    svg.selectAll('.populated-area')
      .data(data)
      .enter()
      .append('circle')
      .classed('populated-area', true)
      .attr('cx', (d: PopulatedArea) => scaleLongitude(d.longitude))
      .attr('cy', (d: PopulatedArea) => scaleLatitude(d.latitude))
      .style('fill', 'rgba(255, 255, 255, 0.8)')
      .transition()
      .duration(250)
      .attr('r', (d: PopulatedArea) => scalePopulation(d.population));
  }
}
