import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsShowComponent } from './checkouts-show.component';

describe('CheckoutsShowComponent', () => {
  let component: CheckoutsShowComponent;
  let fixture: ComponentFixture<CheckoutsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
