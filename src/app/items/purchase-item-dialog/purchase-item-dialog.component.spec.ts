import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseItemDialogComponent } from './purchase-item-dialog.component';

describe('PurchaseItemDialogComponent', () => {
  let component: PurchaseItemDialogComponent;
  let fixture: ComponentFixture<PurchaseItemDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseItemDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
