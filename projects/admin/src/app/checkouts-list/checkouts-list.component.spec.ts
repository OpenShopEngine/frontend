import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutsListComponent } from './checkouts-list.component';

describe('CheckoutsListComponent', () => {
  let component: CheckoutsListComponent;
  let fixture: ComponentFixture<CheckoutsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
