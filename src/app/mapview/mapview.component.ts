import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  @ViewChild('svg') svg;
  constructor() { }

  ngOnInit() {
    this.svg
  }

}
