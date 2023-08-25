import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNavItemComponent } from './admin-nav-item.component';

describe('AdminNavItemComponent', () => {
  let component: AdminNavItemComponent;
  let fixture: ComponentFixture<AdminNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNavItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
