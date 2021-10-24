import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermGeneralComponent } from './term-general.component';

describe('TermGeneralComponent', () => {
  let component: TermGeneralComponent;
  let fixture: ComponentFixture<TermGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
