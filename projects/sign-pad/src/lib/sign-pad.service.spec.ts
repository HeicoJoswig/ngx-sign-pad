import { TestBed } from '@angular/core/testing';

import { SignPadService } from './sign-pad.service';

describe('SignPadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignPadService = TestBed.get(SignPadService);
    expect(service).toBeTruthy();
  });
});
