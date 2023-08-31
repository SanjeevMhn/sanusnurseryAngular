import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDataGridRowComponent } from './category-data-grid-row.component';

describe('CategoryDataGridRowComponent', () => {
  let component: CategoryDataGridRowComponent;
  let fixture: ComponentFixture<CategoryDataGridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDataGridRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDataGridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
