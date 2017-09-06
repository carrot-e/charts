import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { D3Service } from 'd3-ng2-service';
import { BudgetComponent } from './budget/budget.component';
import { HttpClientModule } from '@angular/common/http';
import { RealtimeComponent } from './realtime/realtime.component';
import { RxComponent } from './rx/rx.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    RealtimeComponent,
    RxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
