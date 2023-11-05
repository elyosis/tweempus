import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwimpListComponent } from './twimp-list.component';

describe('TwimpListComponent', () => {
  let component: TwimpListComponent;
  let fixture: ComponentFixture<TwimpListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwimpListComponent]
    });
    fixture = TestBed.createComponent(TwimpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
