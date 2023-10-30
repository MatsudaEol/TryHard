import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstIntroductionPage } from './first-introduction.page';

describe('FirstIntroductionPage', () => {
  let component: FirstIntroductionPage;
  let fixture: ComponentFixture<FirstIntroductionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FirstIntroductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
