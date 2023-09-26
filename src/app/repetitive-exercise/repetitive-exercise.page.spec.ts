import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepetitiveExercisePage } from './repetitive-exercise.page';

describe('RepetitiveExercisePage', () => {
  let component: RepetitiveExercisePage;
  let fixture: ComponentFixture<RepetitiveExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RepetitiveExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
