import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GRPOCalculationComponent } from './grpocalculation.component';

describe('GRPOCalculationComponent', () => {
  let component: GRPOCalculationComponent;
  let fixture: ComponentFixture<GRPOCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GRPOCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GRPOCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
