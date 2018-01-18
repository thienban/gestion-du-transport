import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperAdminComponent } from './wrapper-admin.component';

describe('WrapperAdminComponent', () => {
  let component: WrapperAdminComponent;
  let fixture: ComponentFixture<WrapperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
