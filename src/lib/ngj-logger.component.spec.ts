import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgjLoggerComponent } from './ngj-logger.component';

describe('NgjLoggerComponent', () => {
  let component: NgjLoggerComponent;
  let fixture: ComponentFixture<NgjLoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgjLoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgjLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
