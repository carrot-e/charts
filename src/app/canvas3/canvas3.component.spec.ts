import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Canvas3Component } from './canvas3.component';

describe('Canvas3Component', () => {
  let component: Canvas3Component;
  let fixture: ComponentFixture<Canvas3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Canvas3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Canvas3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
