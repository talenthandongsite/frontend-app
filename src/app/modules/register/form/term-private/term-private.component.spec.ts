import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermPrivateComponent } from './term-private.component';

describe('TermPrivateComponent', () => {
  let component: TermPrivateComponent;
  let fixture: ComponentFixture<TermPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
