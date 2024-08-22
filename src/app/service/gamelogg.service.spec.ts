import { TestBed } from '@angular/core/testing';

import { GameloggService } from './gamelogg.service';

describe('GameloggService', () => {
  let service: GameloggService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameloggService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
