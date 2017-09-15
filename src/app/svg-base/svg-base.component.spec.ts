import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBaseComponent } from './svg-base.component';

describe('SvgBaseComponent', () => {
  let component: SvgBaseComponent;
  let fixture: ComponentFixture<SvgBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
