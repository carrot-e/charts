import {Component, ElementRef, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-mousemove',
  templateUrl: './mousemove.component.html',
  styleUrls: ['./mousemove.component.css']
})
export class MousemoveComponent implements OnInit {

  public data = [];
  constructor(private el: ElementRef) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'mousemove')
      .debounceTime(10)
      .subscribe((e: any) => {
        this.data.push({
          x: e.offsetX ? e.offsetX : e.layerX,
          y: e.offsetY ? e.offsetY : e.layerY
        });

        // We need to clone the array to trigger the changes handler
        this.data = this.data.slice();
      });
  }
}
