import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetComponent } from './budget/budget.component';
import { HttpClientModule } from '@angular/common/http';
import { RealtimeComponent } from './realtime/realtime.component';
import { RxComponent } from './rx/rx.component';
import { RouterModule, Routes } from '@angular/router';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PopulationComponent } from './population/population.component';
import { SvgBaseComponent } from './svg-base/svg-base.component';
import { ForceSimulationDirective } from './force-simulation.directive';
import { BudgetLegendComponent } from './budget-legend/budget-legend.component';
import { MousemoveComponent } from './mousemove/mousemove.component';
import { HeatmapDirective } from './heatmap.directive';
import { MapviewComponent } from './mapview/mapview.component';
import { MapComponent } from './map/map.component';
import { CanvasComponent } from './canvas/canvas.component';

const routes: Routes = [
  { path: 'budget', component: BudgetComponent },
  { path: 'realtime', component: RealtimeComponent },
  { path: 'rx', component: RxComponent },
  { path: 'population', component: PopulationComponent },
  { path: 'mousemove', component: MousemoveComponent },
  { path: 'mapview', component: MapviewComponent },
  { path: 'canvas', component: CanvasComponent },
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
    RxComponent,
    TooltipComponent,
    PopulationComponent,
    SvgBaseComponent,
    ForceSimulationDirective,
    BudgetLegendComponent,
    MousemoveComponent,
    HeatmapDirective,
    MapviewComponent,
    MapComponent,
    CanvasComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
