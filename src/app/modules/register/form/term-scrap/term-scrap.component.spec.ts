import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermScrapComponent } from './term-scrap.component';

describe('TermScrapComponent', () => {
  let component: TermScrapComponent;
  let fixture: ComponentFixture<TermScrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermScrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
