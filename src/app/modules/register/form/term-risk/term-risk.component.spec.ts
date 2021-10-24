import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermRiskComponent } from './term-risk.component';

describe('TermRiskComponent', () => {
  let component: TermRiskComponent;
  let fixture: ComponentFixture<TermRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
