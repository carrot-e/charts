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
    // this.fromEvents();
    this.fromArrays();
  }

  fromArrays() {
    const numbers = [22, 33, 44, 55, 77];
    const numbers$ = Observable.from(numbers);
    numbers$.subscribe(
      (v) => console.log(v),
      (error) => console.error(error),
      () => console.log('complete')
    );

    const posts = [
      {title: 'title 1', body: 'body 1'},
      {title: 'title 2', body: 'body 2'},
      {title: 'title 3', body: 'body 3'},
    ];

    Observable.from(posts)
      .subscribe(v => console.log(v));
  }

  fromEvents() {
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
