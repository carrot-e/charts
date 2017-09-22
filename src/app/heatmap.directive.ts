import {
  AfterContentInit, AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2,
  SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';

@Directive({
  selector: '[appHeatmap]'
})
export class HeatmapDirective implements AfterViewInit, OnChanges {

  private canvas;
  private wrapper;
  private context;
  private width;
  private height;

  private shadowCanvas;
  private colorScale;


  @Input('point') point;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) {

    this.shadowCanvas = this.renderer.createElement('canvas');
  }

  ngAfterViewInit() {
    const wrapper = this.wrapper = this.renderer.createElement('div');

    const canvas = this.canvas = this.renderer.createElement('canvas');
    this.renderer.appendChild(wrapper, canvas);
    this.renderer.appendChild(wrapper, this.shadowCanvas);

    this.renderer.appendChild(this.el.nativeElement, wrapper);
    this.setWrapperProps();

    this.setCanvasProps();
    this.context = canvas.getContext('2d');

    this.width = this.wrapper.getBoundingClientRect().width;
    this.height = this.wrapper.getBoundingClientRect().height;
  }

  setWrapperProps() {
    this.renderer.setStyle(this.wrapper, 'position', 'absolute');
    this.renderer.setStyle(this.wrapper, 'width', '100%');
    this.renderer.setStyle(this.wrapper, 'height', '100%');
    this.renderer.setStyle(this.wrapper, 'top', '0');
  }

  setCanvasProps() {
    this.renderer.setProperty(this.canvas, 'width', this.wrapper.getBoundingClientRect().width);
    this.renderer.setProperty(this.canvas, 'height', this.wrapper.getBoundingClientRect().height);
    this.renderer.setProperty(this.shadowCanvas, 'width', this.wrapper.getBoundingClientRect().width);
    this.renderer.setProperty(this.shadowCanvas, 'height', this.wrapper.getBoundingClientRect().height);
    this.renderer.setStyle(this.canvas, 'position', 'absolute');
    this.renderer.setStyle(this.canvas, 'top', '0');
    this.renderer.setStyle(this.canvas, 'left', '0');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('point' in changes && changes.point.currentValue) {
      this.draw2(changes.point.currentValue);
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw2(point) {
    const alphaData = this.getAlpha(point);

    this.drawColors(alphaData);
  }

  drawColors(alphaData) {
    this.clear();
    const image = this.context.createImageData(this.width, this.height);

    for (let i = 0; i < alphaData.length; i += 8) {
      const c = d3.rgb(this.getColorScale()(alphaData[i + 3]));

      image.data[i] = c.r;
      image.data[i + 1] = c.g;
      image.data[i + 2] = c.b;
      image.data[i + 3] = alphaData[i + 3];
    }

    this.context.putImageData(image, 0, 0);
  }

  getColorScale() {
    if (this.colorScale) {
      return this.colorScale;
    }
    const i0 = d3.interpolateHslLong(d3.hsl(120, 100, 32), d3.hsl(60, 100, 45)),
      i1 = d3.interpolateHslLong(d3.hsl(60, 100, 45), d3.hsl(0, 0, 95)),
      interpolateTerrain = function(t) { return t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2); };

    this.colorScale = d3.scaleSequential(interpolateTerrain)
      .domain([0, 255]);

    return this.colorScale;
  }

  getValueScale() {
    return d3.scaleLinear()
      .domain([0, 10])
      .range([0, 1]);
  }

  getAlpha(point) {
    const canvas = this.shadowCanvas;
    const context = canvas.getContext('2d');
    const radius = 50;
    const blur = 0.2;
    const gradient = context.createRadialGradient(point.x, point.y, radius * blur, point.x, point.y, radius);
    gradient.addColorStop(0, `rgba(0, 0, 0, ${this.getValueScale()(1)})`);
    gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
    context.fillStyle = gradient;
    context.fillRect(point.x - radius, point.y - radius, 2 * radius, 2 * radius);

    return context.getImageData(0, 0, this.width, this.height).data;
  }
}
