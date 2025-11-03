import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculadoraService, CalculoCapacidadeResponse } from '../../services/calculadora.service';

@Component({
  selector: 'app-calculo-capacidade',
  standalone: false,
  templateUrl: './calculo-capacidade.component.html',
  styleUrl: './calculo-capacidade.component.css'
})

export class CalculoCapacidadeComponent implements OnInit {
  calculoForm: FormGroup;
  resultado: CalculoCapacidadeResponse | null = null;
  erro: string | null = null

  constructor(
    private fb: FormBuilder,
    private calculadoraService: CalculadoraService
  ) {
    this.calculoForm = this.fb.group({
      velocidade: [null, Validators.required],
      passo: [null, Validators.required],
      numFileirasCorreia: [null, Validators.required],
      numCanecasPorMetro: [null, Validators.required],
      densidadeProduto: [null, Validators.required],
      volumeCaneca: [null, Validators.required],
      fatorEnchimento: [null, Validators.required],
      largura: [null, Validators.required],
      projecao: [null, Validators.required],
      profundidade: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.calculoForm.invalid) {
      this.erro = 'Por favor, preencha todos os campos.';
      return;
    }

    this.erro = null;
    this.resultado = null;
    
    // 4. Pega os valores e chama o service
    const dados = this.calculoForm.value;
    
    this.calculadoraService.calcularCapacidade(dados).subscribe({
      next: (resposta) => {
        // 5. Sucesso! Mostra o resultado
        this.resultado = resposta; 
        console.log(resposta)
      },
      error: (err) => {
        // 6. Erro! Mostra a falha
        this.erro = 'Houve um erro ao calcular. Tente novamente.';
        console.error(err);
      }
    });
  }
}