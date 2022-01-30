import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CometaPricingComponent } from './cometa-pricing.component';

describe('CometaPricingComponent', () => {
  let component: CometaPricingComponent;
  let fixture: ComponentFixture<CometaPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CometaPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CometaPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
