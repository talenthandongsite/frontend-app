import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowPageComponent } from './allow-page.component';

describe('AllowPageComponent', () => {
  let component: AllowPageComponent;
  let fixture: ComponentFixture<AllowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
