import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mousemove',
  templateUrl: './mousemove.component.html',
  styleUrls: ['./mousemove.component.css']
})
export class MousemoveComponent implements OnInit {

  public data;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'mousemove')
      .debounceTime(5)
      .subscribe((e: any) => {
        this.data = {
          x: e.offsetX ? e.offsetX : e.layerX,
          y: e.offsetY ? e.offsetY : e.layerY
        };
      });
  }
}
