import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataGridRowComponent } from './orders-data-grid-row.component';

describe('OrdersDataGridRowComponent', () => {
  let component: OrdersDataGridRowComponent;
  let fixture: ComponentFixture<OrdersDataGridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDataGridRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDataGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
