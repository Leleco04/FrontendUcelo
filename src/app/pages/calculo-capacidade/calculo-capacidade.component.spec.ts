import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoCapacidadeComponent } from './calculo-capacidade.component';

describe('CalculoCapacidadeComponent', () => {
  let component: CalculoCapacidadeComponent;
  let fixture: ComponentFixture<CalculoCapacidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculoCapacidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculoCapacidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
