import { Component, ElementRef, OnInit } from '@angular/core';
import {TooltipData, TooltipStateService} from '../tooltip-state.service';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  state: TooltipData;
  style: SafeStyle;

  constructor(
    private tooltipState: TooltipStateService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.state = this.tooltipState.data;
    this.tooltipState.state.subscribe((data) => {
      this.state = data;
      this.style = this.sanitizer.bypassSecurityTrustStyle(`top: ${data.y}px; left: ${data.x}px`);
    });
  }

}
