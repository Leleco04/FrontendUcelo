import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCalculosComponent } from './historico-calculos.component';

describe('HistoricoCalculosComponent', () => {
  let component: HistoricoCalculosComponent;
  let fixture: ComponentFixture<HistoricoCalculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoCalculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoCalculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
