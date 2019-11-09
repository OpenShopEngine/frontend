import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRestrictorComponent } from './content-restrictor.component';

describe('ContentRestrictorComponent', () => {
  let component: ContentRestrictorComponent;
  let fixture: ComponentFixture<ContentRestrictorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRestrictorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRestrictorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
