import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerceiraIntroductionPage } from './terceira-introduction.page';

describe('TerceiraIntroductionPage', () => {
  let component: TerceiraIntroductionPage;
  let fixture: ComponentFixture<TerceiraIntroductionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TerceiraIntroductionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
