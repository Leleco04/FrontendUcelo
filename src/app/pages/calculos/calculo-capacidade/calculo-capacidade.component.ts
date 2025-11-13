import { DownloadArquivoService } from '../../../services/download-arquivo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculadoraService, CalculoCapacidadeResponse } from '../../../services/calculadora.service';
import Swal from 'sweetalert2';

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
  estaCarregandoRelatorio: boolean = false;

  constructor(
    private fb: FormBuilder,
    private calculadoraService: CalculadoraService,
    private downloadArquivoService: DownloadArquivoService
  ) {
    this.calculoForm = this.fb.group({
      velocidade: [null, [Validators.required, Validators.min(0)]],
      passo: [null, [Validators.required, Validators.min(0)]],
      numFileirasCorreia: [null, [Validators.required, Validators.min(0)]],
      densidadeProduto: [null, [Validators.required, Validators.min(0)]],
      volumeCaneca: [null, [Validators.required, Validators.min(0)]],
      fatorEnchimento: [null, [Validators.required, Validators.min(0)]],
      largura: [null, [Validators.required, Validators.min(0)]],
      projecao: [null, [Validators.required, Validators.min(0)]],
      profundidade: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  get velocidade() { return this.calculoForm.get('velocidade'); }
  get passo() { return this.calculoForm.get('passo'); }
  get numFileirasCorreia() { return this.calculoForm.get('numFileirasCorreia'); }
  get densidadeProduto() { return this.calculoForm.get('densidadeProduto'); }
  get volumeCaneca() { return this.calculoForm.get('volumeCaneca'); }
  get fatorEnchimento() { return this.calculoForm.get('fatorEnchimento'); }
  get largura() { return this.calculoForm.get('largura'); }
  get projecao() { return this.calculoForm.get('projecao'); }
  get profundidade() { return this.calculoForm.get('profundidade'); }

  // metodo submit do form
  onSubmit(): void {
    if (this.calculoForm.invalid) {
      const mensagemErro = this.getPrimeiroErroDoFormulario();

        // se algum campo nao foi preenchido corretamente exibe alerta
        Swal.fire({
            icon: 'error',
            title: 'Campo Inválido',
            text: mensagemErro,
        });

        return;
    }

    this.erro = null;
    this.resultado = null;

    // pega os valores e chama o service
    const dados = this.calculoForm.value;

    this.calculadoraService.calcularCapacidade(dados).subscribe({
      next: (resposta) => {
        // sucesso Mostra o resultado
        this.resultado = resposta;
        console.log(resposta)
      },
      error: (err) => {
        // erro Mostra a falha
        this.erro = 'Houve um erro ao calcular. Tente novamente.';
        console.error(err);
      }
    });
  }

  // metodo para pegar o primeiro erro encontrado no form
  private getPrimeiroErroDoFormulario(): string {
    // percorre o form
    for (const controlName in this.calculoForm.controls) {
      const control = this.calculoForm.get(controlName);

      // verifica se o campo é inválido
      if (control && control.invalid) {
        const nomeCampo = this.formatarNomeCampo(controlName); // formata o nome

        // Verifica os erros na ordem de prioridade
        // erro de campo obrigatorio
        if (control.hasError('required')) {
          return `O campo "${nomeCampo}" é obrigatório. Preencha todos os campos.`;
        }
        // erro de padrao
        if (control.hasError('pattern')) {
          return `O campo "${nomeCampo}" deve ser um número válido.`;
        }
        // erro de numero minimo
        if (control.hasError('min')) {
          return `O campo "${nomeCampo}" não pode ser um valor negativo.`;
        }
      }
    }

    // Mensagem padrão caso algo não seja pego
    return 'Por favor, preencha o formulário corretamente.';
  }

  // metodo q formata o nome do campo para apresentar
  private formatarNomeCampo(controlName: string): string {
    const nome = controlName.replace(/([A-Z])/g, ' $1');
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  gerarRelatorio(): void {
    // antes de gerar o relatorio é verificado se o formulario foi preenchido corretamente
    if (this.calculoForm.invalid) {
      // se nao foi, exibe alerta de err
        Swal.fire('Erro', 'Preencha os dados do cálculo primeiro.', 'error');
        return;
    }

    this.estaCarregandoRelatorio = true;
    const dados = this.calculoForm.value;

    this.calculadoraService.gerarRelatorioCapacidade(dados).subscribe({
      next: (pdfBlob) => {
        this.estaCarregandoRelatorio = false;

        // chama o servico de download
        this.downloadArquivoService.baixarArquivo(pdfBlob, 'relatorio-capacidade.pdf');
      },
      error: (err) => {
        this.estaCarregandoRelatorio = false;
        Swal.fire('Erro', 'Não foi possível gerar o relatório.', 'error');
        console.error(err);
      }
    });
  }

}
