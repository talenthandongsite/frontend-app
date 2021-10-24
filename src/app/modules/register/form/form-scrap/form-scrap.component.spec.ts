import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScrapComponent } from './form-scrap.component';

describe('FormScrapComponent', () => {
  let component: FormScrapComponent;
  let fixture: ComponentFixture<FormScrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormScrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
