import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-base',
  templateUrl: './svg-base.component.html',
  styleUrls: ['./svg-base.component.css']
})
export class SvgBaseComponent implements OnInit {
  public transform: string;

  @Input('width') width: number;
  @Input('height') height: number;
  @Input('margin') margin: any;

  constructor() {}

  ngOnInit() {
    this.transform = `translate(${this.margin.left}, ${this.margin.top})`;
  }
}
