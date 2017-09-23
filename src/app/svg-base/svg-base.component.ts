import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-base',
  templateUrl: './svg-base.component.html',
  styleUrls: ['./svg-base.component.css']
})
export class SvgBaseComponent implements OnInit {
  public transform: string;

  @Input('width') width = 0;
  @Input('height') height = 0;
  @Input('margin') margin = {top: 0, right: 0, bottom: 0, left: 0};

  constructor(public el: ElementRef) {}

  ngOnInit() {
    this.transform = `translate(${this.margin.left}, ${this.margin.top})`;
  }
}
