import { Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { tile } from 'd3-tile/index.js';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('svg') svg;
  constructor() { }

  ngOnInit() {
    this.render();
  }

  render() {
    const pi = Math.PI,
      tau = 2 * pi;

    const width = Math.max(500, window.innerWidth),
      height = Math.max(500, window.innerHeight);

    const projection = d3.geoMercator()
      .scale(1 / tau)
      .translate([0, 0])
      // .center([-74.0064, 40.7142]);

    const center = projection([-74.0064, 40.7142]);

    const path = d3.geoPath()
      .projection(projection);

    const tiler = tile()
      .size([width, height])
      ();

    console.log(d3.select(this.svg.el.nativeElement)
      .select('g').empty());

    // const center = projection([-74.0064, 40.7142]);
    d3.select(this.svg.el.nativeElement)
      .select('g')
      .selectAll('g')
      .data(tiler)
      .enter()
      .append('g')
      // .attr('transform')
      .each(function(d) {
        console.log(d);
        const g = d3.select(this);
        d3.json('https://vector.mapzen.com/osm/roads/' + d[2] + '/' + d[0] + '/' + d[1] + '.json?api_key=vector-tiles-LM25tq4',
          (error, json: any) => {
            if (error) {
              throw error;
            }

            g.selectAll('path')
              .data(json.features.sort(function(a: any, b: any) { return a.properties.sort_key - b.properties.sort_key; }))
              .enter().append('path')
              .attr('class', (dd: any) => dd.properties.kind)
              .attr('d', path);
          });
      });
  }
}
