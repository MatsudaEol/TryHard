import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentfitnessanalysisPage } from './studentfitnessanalysis.page';

describe('StudentfitnessanalysisPage', () => {
  let component: StudentfitnessanalysisPage;
  let fixture: ComponentFixture<StudentfitnessanalysisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StudentfitnessanalysisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
