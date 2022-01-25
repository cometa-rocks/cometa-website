import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CometaSlidesComponent } from './cometa-slides.component';

describe('CometaSlidesComponent', () => {
  let component: CometaSlidesComponent;
  let fixture: ComponentFixture<CometaSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CometaSlidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CometaSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
