import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderSelectionComponent } from './vender-selection.component';

describe('VenderSelectionComponent', () => {
  let component: VenderSelectionComponent;
  let fixture: ComponentFixture<VenderSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenderSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
