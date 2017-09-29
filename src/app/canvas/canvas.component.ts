import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas;
  ctx: CanvasRenderingContext2D;
  width;
  height;
  circles = [];
  mouse = {x: null, y: null};
  constructor() {
    this.width = window.innerWidth - 10;
    this.height = window.innerHeight - 10;
  }

  ngAfterViewInit() {
    this.drawAll();
    this.animate();
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  onMouseMove(event) {
    this.mouse.x = event.x;
    this.mouse.y = event.y;

  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      if (circle.x + circle.radius > this.width || circle.x - circle.radius < 0) {
        circle.dx = -circle.dx;
      }
      if (circle.y + circle.radius > this.height || circle.y - circle.radius < 0) {
        circle.dy = -circle.dy;
      }

      if (Math.abs(circle.x - this.mouse.x) < 100 && Math.abs(circle.y - this.mouse.y) < 100) {
        circle.radius += 2;
      } else if (circle.radius > circle.initialRadius) {
        circle.radius -= 2;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;

      circle.draw(this.ctx);
    }
  }

  drawAll() {
    const amount = 200;
    const minRadius = 2;
    const maxRadius = 40;

    for (let i = 0; i < amount; i++) {
      const r = Math.random() * maxRadius + minRadius;
      const x = Math.random() * (this.width - 2 * r) + r;
      const y = Math.random() * (this.height - 2 * r) + r;
      const dx = Math.random() * 5 + 1;
      const dy = Math.random() * 5 + 1;
      const circle = new Circle(x, y, dx, dy, r);
      circle.draw(this.ctx);
      this.circles.push(circle);
    }
  }
}

class Circle {
  color: string;
  palette = ['#171833', '#01A2A6', '#29D9C2', '#BDF25D', '#053F6F'];
  initialRadius: number;
  constructor(public x, public y, public dx, public dy, public radius) {
    this.color = this.palette[Math.floor(Math.random() * this.palette.length)];
    this.initialRadius = this.radius;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
