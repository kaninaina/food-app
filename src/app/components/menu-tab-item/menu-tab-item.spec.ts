import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTabItem } from './menu-tab-item';

describe('MenuTabItem', () => {
  let component: MenuTabItem;
  let fixture: ComponentFixture<MenuTabItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTabItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTabItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
