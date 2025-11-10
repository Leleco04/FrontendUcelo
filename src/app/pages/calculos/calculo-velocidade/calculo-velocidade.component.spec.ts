import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoVelocidadeComponent } from './calculo-velocidade.component';

describe('CalculoVelocidadeComponent', () => {
  let component: CalculoVelocidadeComponent;
  let fixture: ComponentFixture<CalculoVelocidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculoVelocidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculoVelocidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
