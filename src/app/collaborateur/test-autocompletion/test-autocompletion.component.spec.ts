import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAutocompletionComponent } from './test-autocompletion.component';

describe('TestAutocompletionComponent', () => {
  let component: TestAutocompletionComponent;
  let fixture: ComponentFixture<TestAutocompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAutocompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAutocompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
