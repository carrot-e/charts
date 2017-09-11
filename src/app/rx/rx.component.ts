import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {reject} from "q";

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
    // this.fromArrays();
    // this.fromScratch();
    // this.fromPromise();

    this.operations();
  }

  operations() {
    // Observable.of('Hello')
    //   .merge(Observable.of([1, 2, 3]))
    //   .subscribe(console.log);

    // Observable.interval(2000)
    //   .merge(Observable.interval(500))
    //   .take(25)
    //   .subscribe(console.log);

    // const source1$ = Observable.interval(2000)
    //   .map(v => `Source 1: ${v}`);
    // const source2$ = Observable.interval(500)
    //   .map(v => `Source 2: ${v}`);
    //
    // Observable.merge(source1$, source2$)
    //   .take(10)
    //   .subscribe(console.log);

    const source1$ = Observable.range(5, 2)
      .map(v => `Source 1: ${v}`);
    const source2$ = Observable.range(6, 5)
      .map(v => `Source 2: ${v}`);

    Observable.concat(source1$, source2$)
      .subscribe(console.log);

  }

  fromPromise() {
    const myPromise = new Promise(resolve => {
      console.log('creating promise');
      setTimeout(() => resolve('Hello from promise'), 3000);
    });

    // myPromise.then((i) => console.log(i));
    Observable.fromPromise(myPromise)
      .subscribe((i) => console.log(i));
  }

  fromScratch() {
    const source$ = new Observable(observer => {
      console.log('creating');
      observer.next('hello');

      observer.error(new Error('Smth wrong'));

      setTimeout(() => observer.complete(), 1000);
    });
    source$
      .catch(error => {
        console.log('caught an error!');
        return Observable.of(error);
      })
      .finally(() => console.log('finally'))
      .subscribe(
      i => console.log(i),
      error => console.warn(error),
      () => console.log('complete')
    );
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
