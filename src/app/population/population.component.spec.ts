import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationComponent } from './population.component';
import { SvgBaseComponent } from '../svg-base/svg-base.component';

describe('PopulationComponent', () => {
  let component: PopulationComponent;
  let fixture: ComponentFixture<PopulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationComponent, SvgBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
