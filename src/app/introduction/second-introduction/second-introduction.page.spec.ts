import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondIntroductionPage } from './second-introduction.page';

describe('SecondIntroductionPage', () => {
  let component: SecondIntroductionPage;
  let fixture: ComponentFixture<SecondIntroductionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SecondIntroductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
