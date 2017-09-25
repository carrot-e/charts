import { HeatmapDirective } from './heatmap.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<div hoverfocus appHeatmap></div>`
})
class TestHeatmapComponent { }

describe('HeatmapDirective', () => {
  let component: TestHeatmapComponent;
  let fixture: ComponentFixture<TestHeatmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHeatmapComponent, HeatmapDirective]
    });
    fixture = TestBed.createComponent(TestHeatmapComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    // const directive = new HeatmapDirective();
    expect(component).toBeTruthy();
  });
});
