import { TestBed } from '@angular/core/testing';

import { CanecaService } from './caneca.service';

describe('CanecaService', () => {
  let service: CanecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
