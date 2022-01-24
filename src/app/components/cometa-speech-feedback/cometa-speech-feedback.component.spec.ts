import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CometaSpeechFeedbackComponent } from './cometa-speech-feedback.component';

describe('CometaSpeechFeedbackComponent', () => {
  let component: CometaSpeechFeedbackComponent;
  let fixture: ComponentFixture<CometaSpeechFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CometaSpeechFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CometaSpeechFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
