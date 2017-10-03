import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'app-canvas3',
  templateUrl: './canvas3.component.html',
  styleUrls: ['./canvas3.component.css']
})
export class Canvas3Component implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas;
  ctx: CanvasRenderingContext2D;
  width;
  height;
  palette = [tinycolor.random().lighten(5), tinycolor.random().lighten(5)];
  gradient;
  constructor() {
    this.width = window.innerWidth - 10;
    this.height = window.innerHeight - 10;
  }

  ngAfterViewInit() {
    this.animate();
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.gradient = new Gradient(
      this.palette,
      [0, 1],
      {x: this.width / 2, y: 0},
      {x: this.width / 2, y: this.height},
      4,
      -4
    );
  }


  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.gradient.from.y >= this.height * 0.05 || this.gradient.from.y < -this.height * 0.6) {
      this.gradient.dy = -this.gradient.dy;
    }
    if (this.gradient.from.x >= this.width * 1.5 || this.gradient.from.x < -this.width * 1.5) {
      this.gradient.dx = -this.gradient.dx;
    }

    this.gradient.from.y += this.gradient.dy * Math.random();
    this.gradient.to.y -= this.gradient.dy * Math.random();
    this.gradient.from.x += this.gradient.dx * Math.random();
    this.gradient.to.x -= this.gradient.dx * Math.random();

    for (let i = 0; i < this.gradient.palette.length; i++) {
      this.gradient.palette[i] = tinycolor(this.gradient.palette[i]).spin(0.3);
    }

    this.ctx.fillStyle = this.gradient.get(this.ctx);
    this.ctx.fillRect(0, 0, this.width, this.height);

    // this.ctx.beginPath();
    // this.ctx.moveTo(this.gradient.from.x, this.gradient.from.y);
    // this.ctx.lineTo(this.gradient.to.x, this.gradient.to.y);
    // this.ctx.stroke();
  }
}

class Gradient {
  constructor(
    public palette,
    public stops,
    public from,
    public to,
    public dx,
    public dy) {}

  get(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(this.from.x, this.from.y, this.to.x, this.to.y);

    for (let i = 0; i < this.palette.length; i++) {
      gradient.addColorStop(this.stops[i], this.palette[i]);
    }

    return gradient;
  }
}
