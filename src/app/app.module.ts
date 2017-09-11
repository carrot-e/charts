import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { D3Service } from 'd3-ng2-service';
import { BudgetComponent } from './budget/budget.component';
import { HttpClientModule } from '@angular/common/http';
import { RealtimeComponent } from './realtime/realtime.component';
import { RxComponent } from './rx/rx.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'budget', component: BudgetComponent },
  { path: 'realtime', component: RealtimeComponent },
  { path: 'rx', component: RxComponent },
  {
    path: '',
    redirectTo: '/budget',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BudgetComponent,
    RealtimeComponent,
    RxComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
