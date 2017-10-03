import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas2',
  templateUrl: './canvas2.component.html',
  styleUrls: ['./canvas2.component.css']
})
export class Canvas2Component implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas;
  ctx: CanvasRenderingContext2D;
  width;
  height;
  innerCircles = [];
  center;
  currentCenters;
  innerRadius;

  constructor() {
    this.width = window.innerWidth - 10;
    this.height = window.innerHeight - 10;

    this.innerRadius = Math.min(this.width, this.height, 200) / 2;

    this.center = {
      left: {x: this.width / 2 - this.innerRadius, y: this.height / 2},
      right: {x: this.width / 2 + this.innerRadius, y: this.height / 2},
      top: {x: this.width / 2, y: this.height / 2 - this.innerRadius},
      bottom: {x: this.width / 2, y: this.height / 2 + this.innerRadius},
    };

    this.currentCenters = ['top', 'right', 'bottom', 'left'];
  }

  ngAfterViewInit() {
    this.drawAll();
    this.animate();
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);


    for (let i = 0; i < this.innerCircles.length; i++) {
      const circle = this.innerCircles[i];
      let center = this.center[this.currentCenters[i]];

      if (this.currentCenters[i] === 'left' && Math.cos(circle.angle) === 1) {
        this.currentCenters[i] = 'right';
        circle.angle = Math.PI;
        circle.v = -circle.v;
      } else if (this.currentCenters[i] === 'right' && Math.cos(circle.angle) === -1) {
        this.currentCenters[i] = 'left';
        circle.angle = Math.PI * 2;
        circle.v = -circle.v;
      } else if (this.currentCenters[i] === 'top' && Math.sin(circle.angle) === -1) {
        this.currentCenters[i] = 'bottom';
        circle.angle = 0.5 * Math.PI;
        circle.v = -circle.v;
      } else if (this.currentCenters[i] === 'bottom' && Math.sin(circle.angle) === 1) {
        this.currentCenters[i] = 'top';
        circle.angle = -0.5 * Math.PI;
        circle.v = -circle.v;
      }

      center = this.center[this.currentCenters[i]];

      circle.x = center.x + Math.cos(circle.angle) * this.innerRadius;
      circle.y = center.y - Math.sin(circle.angle) * this.innerRadius;
      circle.angle += Math.PI / circle.v;

      circle.draw(this.ctx);
    }
  }

  drawAll() {
    const amount = 4;
    const velocity = 90;
    for (let i = 0; i < amount; i++) {
      const r = this.innerRadius / 8;
      let angle;
      switch (i) {
        case 0: // TOP
          angle = -Math.PI / 2;
          break;
        case 1: // RIGHT
          angle = Math.PI;
          break;
        case 2: // BOTTOM
          angle = Math.PI * 0.5;
          break;
        case 3: // LEFT
          angle = Math.PI * 2;
          break;
        default:
          angle = 0;
      }

      const circle = new Particle(this.center.left.x + this.innerRadius, this.center.left.y, velocity, r, angle);
      circle.draw(this.ctx);
      this.innerCircles.push(circle);
    }
  }
}

class Particle {
  color = '#01A2A6';
  // palette = ['#171833', '#01A2A6', '#29D9C2', '#BDF25D', '#053F6F'];
  constructor(public x, public y, public v, public radius, public angle = 0) {
    // this.color = this.palette[Math.floor(Math.random() * 5)];

  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
