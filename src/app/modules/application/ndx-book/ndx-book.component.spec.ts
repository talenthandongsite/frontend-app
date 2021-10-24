import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NdxBookComponent } from './ndx-book.component';

describe('NdxBookComponent', () => {
  let component: NdxBookComponent;
  let fixture: ComponentFixture<NdxBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdxBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NdxBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
