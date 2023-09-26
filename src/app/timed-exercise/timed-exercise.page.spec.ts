import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimedExercisePage } from './timed-exercise.page';

describe('TimedExercisePage', () => {
  let component: TimedExercisePage;
  let fixture: ComponentFixture<TimedExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TimedExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
