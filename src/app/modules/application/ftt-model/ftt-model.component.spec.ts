import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FttModelComponent } from './ftt-model.component';

describe('FttModelComponent', () => {
  let component: FttModelComponent;
  let fixture: ComponentFixture<FttModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FttModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FttModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
