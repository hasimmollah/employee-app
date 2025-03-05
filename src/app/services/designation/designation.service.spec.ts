import { TestBed } from '@angular/core/testing';

import { DesignationService } from './designation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DesignationService', () => {
  let service: DesignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], // ✅ Add this
      providers: [DesignationService],});
    service = TestBed.inject(DesignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
