import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridRowComponent } from './data-grid-row.component';

describe('DataGridRowComponent', () => {
  let component: DataGridRowComponent;
  let fixture: ComponentFixture<DataGridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGridRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
