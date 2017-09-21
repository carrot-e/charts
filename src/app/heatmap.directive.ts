import {
  AfterContentInit, AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appHeatmap]'
})
export class HeatmapDirective implements AfterViewInit, OnChanges {

  private canvas;
  private wrapper;
  private context;

  private _data;
  get data() {
    return this._data;
  }

  @Input('data')
  set data(data: any[]) {
    console.log('invoked!')
    this._data = data;
  }
  // get data() { return this.data; };

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  ngAfterViewInit() {
    const wrapper = this.wrapper = this.renderer.createElement('div');
    const canvas = this.canvas = this.renderer.createElement('canvas');

    this.renderer.appendChild(wrapper, canvas);
    this.renderer.appendChild(this.el.nativeElement, wrapper);

    this.setWrapperProps();
    this.setCanvasProps();

    this.context = canvas.getContext('2d');
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
    this.renderer.setStyle(this.canvas, 'position', 'absolute');
    this.renderer.setStyle(this.canvas, 'top', '0');
    this.renderer.setStyle(this.canvas, 'left', '0');
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes && changes.data.currentValue) {
      this.draw();
    }
  }

  draw() {
    for (let i of this._data) {
      this.context.strokeStyle = 'red';
      this.context.beginPath();
      this.context.arc(i.x, i.y, 5, 0, 2 * Math.PI);
      this.context.stroke();
    }
  }
}
