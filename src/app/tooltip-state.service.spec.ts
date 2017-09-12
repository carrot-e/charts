import { TestBed, inject } from '@angular/core/testing';

import { TooltipStateService } from './tooltip-state.service';

describe('TooltipStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TooltipStateService]
    });
  });

  it('should be created', inject([TooltipStateService], (service: TooltipStateService) => {
    expect(service).toBeTruthy();
  }));
});
