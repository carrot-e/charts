import { Component } from '@angular/core';
import { TooltipStateService } from './tooltip-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TooltipStateService]
})
export class AppComponent {

}
