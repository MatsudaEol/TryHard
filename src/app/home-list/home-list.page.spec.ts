import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HomeListPage } from './home-list.page';

describe('HomeListPage', () => {
  let component: HomeListPage;
  let fixture: ComponentFixture<HomeListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
