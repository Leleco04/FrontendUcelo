import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEscolhaOperacaoComponent } from './popup-escolha-operacao.component';

describe('PopupEscolhaOperacaoComponent', () => {
  let component: PopupEscolhaOperacaoComponent;
  let fixture: ComponentFixture<PopupEscolhaOperacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupEscolhaOperacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEscolhaOperacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
