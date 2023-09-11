import { TestBed } from '@angular/core/testing';

import { OrderDetailModalService } from './order-detail-modal.service';

describe('OrderDetailModalService', () => {
  let service: OrderDetailModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
