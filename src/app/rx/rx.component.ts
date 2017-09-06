import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {
  @ViewChild('btn') button: ElementRef;
  @ViewChild('input') input: ElementRef;
  constructor() { }

  ngOnInit() {
    const btnStream$ = Observable.fromEvent(this.button.nativeElement, 'click');
    btnStream$.subscribe(
      (e) => console.log(e),
      (error) => console.error(error),
      () => console.log('completed')
    );

    const inputStream$ = Observable.fromEvent(this.input.nativeElement, 'keydown');
    inputStream$.subscribe(
      (e) => console.log(e),
      (error) => console.error(error),
      () => console.log('completed')
    );
  }
}
