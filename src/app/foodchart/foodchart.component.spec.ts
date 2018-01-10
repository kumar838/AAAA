/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FoodchartComponent } from './foodchart.component';

describe('FoodchartComponent', () => {
  let component: FoodchartComponent;
  let fixture: ComponentFixture<FoodchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
