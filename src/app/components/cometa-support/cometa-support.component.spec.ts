import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CometaSupportComponent } from './cometa-support.component';

describe('CometaSupportComponent', () => {
  let component: CometaSupportComponent;
  let fixture: ComponentFixture<CometaSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CometaSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CometaSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
