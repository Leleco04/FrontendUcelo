import { DownloadArquivoService } from './../../../services/download-arquivo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CalculadoraService, CalculoVelocidadeResponse } from '../../../services/calculadora.service';

@Component({
  selector: 'app-calculo-velocidade',
  standalone: false,
  templateUrl: './calculo-velocidade.component.html',
  styleUrl: './calculo-velocidade.component.css'
})

export class CalculoVelocidadeComponent implements OnInit{

  calculoForm: FormGroup;
  resultado: CalculoVelocidadeResponse | null = null;
  erro: string | null = null
  estaCarregandoRelatorio: boolean = false;

  ngOnInit(): void { }

  constructor(
    private fb: FormBuilder,
    private calculadoraService: CalculadoraService,
    private downloadArquivoService: DownloadArquivoService
  ) {
    this.calculoForm = this.fb.group({
      oDoTambor: [null, [Validators.required, Validators.min(0)]],
      rotacaoDoTambor: [null, [Validators.required, Validators.min(0)]],
    });
  }

  get oDoTambor() { return this.calculoForm.get('oDoTambor'); }
  get rotacaoDoTamgor() { return this.calculoForm.get('rotacaoDoTamgor'); }

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

        this.calculadoraService.calcularVelocidade(dados).subscribe({
          next: (resposta) => {
            // sucesso
            this.resultado = resposta;
            console.log(resposta)
          },
          error: (err) => {
            // Erro Mostra a falha
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

      this.calculadoraService.gerarRelatorioVelocidade(dados).subscribe({
        next: (pdfBlob) => {
          this.estaCarregandoRelatorio = false;

          // chama o servico de download
          this.downloadArquivoService.baixarArquivo(pdfBlob, 'relatorio-velocidade.pdf');
        },
        error: (err) => {
          this.estaCarregandoRelatorio = false;
          Swal.fire('Erro', 'Não foi possível gerar o relatório.', 'error');
          console.error(err);
        }
      });
    }

}
