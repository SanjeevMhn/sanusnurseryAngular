import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDataGridComponent } from './orders-data-grid.component';

describe('OrdersDataGridComponent', () => {
  let component: OrdersDataGridComponent;
  let fixture: ComponentFixture<OrdersDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
