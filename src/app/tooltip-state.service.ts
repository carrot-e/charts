import { EventEmitter, Injectable } from '@angular/core';

export interface TooltipData {
  isVisible: boolean;
  title?;
  amount?;
  diffPercents?;
  x?;
  y?;
}

@Injectable()
export class TooltipStateService {
  data: TooltipData = { isVisible: false };
  state: EventEmitter<TooltipData> = new EventEmitter();
  show(data, e) {
    this.data = {
      isVisible: true,
      title: data.title,
      amount: data.amount,
      diffPercents: data.diffPercents,
      x: e.clientX + 10,
      y: e.clientY - 10
    };

    this.state.emit(this.data);
  }

  hide() {
    this.data.isVisible = false;
    this.state.emit(this.data);
  }
}
