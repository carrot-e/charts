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
import { Canvas2Component } from './canvas2/canvas2.component';
import { Canvas3Component } from './canvas3/canvas3.component';

const routes: Routes = [
  { path: 'budget', component: BudgetComponent },
  { path: 'realtime', component: RealtimeComponent },
  { path: 'rx', component: RxComponent },
  { path: 'population', component: PopulationComponent },
  { path: 'mousemove', component: MousemoveComponent },
  { path: 'mapview', component: MapviewComponent },
  { path: 'canvas', component: CanvasComponent },
  { path: 'canvas2', component: Canvas2Component },
  { path: 'canvas3', component: Canvas3Component },
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
    CanvasComponent,
    Canvas2Component,
    Canvas3Component
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
