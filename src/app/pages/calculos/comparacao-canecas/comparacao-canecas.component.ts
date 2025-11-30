import { DownloadArquivoService } from './../../../services/download-arquivo.service';
import { CalculadoraService } from './../../../services/calculadora.service';
import { Component, OnInit } from '@angular/core';
import { Caneca } from '../../../models/caneca.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanecaService } from '../../../services/caneca.service';
import { debounceTime, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comparacao-canecas',
  standalone: false,
  templateUrl: './comparacao-canecas.component.html',
  styleUrl: './comparacao-canecas.component.css'
})

export class ComparacaoCanecasComponent implements OnInit {
  formCanecaA: FormGroup;
  formCanecaB: FormGroup;
  catalogoCanecas: Caneca[] = [];
  estaCarregandoRelatorio: boolean = false;

  // Objeto para armazenar as diferenças numéricas
  diferencas = {
    velocidade: 0.0,
    passo: 0.0,
    capacidade: 0.0,
    volumeBorda: 0.0,
    resistenciaBrasao: 0.0,
    volumeCaneca: 0.0,
    enchimento: 0.0,
    resistenciaTracao: 0.0,
    deslocamento: 0.0,
    densidade: 0.0,
    numeroDeFileiras: 0,
    canecasMetro: 0,
    precoUnidade: 0.0,
    precoMetro: 0.0
  };

  // calcula as diferenças em porcentagem
  porcentagens = {
    velocidade: 0.0,
    passo: 0.0,
    capacidade: 0.0,
    volumeBorda: 0.0,
    resistenciaBrasao: 0.0,
    volumeCaneca: 0.0,
    enchimento: 0.0,
    resistenciaTracao: 0.0,
    deslocamento: 0.0,
    densidade: 0.0,
    numeroDeFileiras: 0.0,
    canecasMetro: 0.0,
    precoUnidade: 0.0,
    precoMetro: 0.0
  };

  constructor(
    private fb: FormBuilder,
    private canecaService: CanecaService,
    private calculadoraService: CalculadoraService,
    private downloadArquivoService: DownloadArquivoService,
  ) {
    // construtor iniciando os 2 forms A e B
    this.formCanecaA = this.criarFormularioCaneca();
    this.formCanecaB = this.criarFormularioCaneca();
  }

  // cria o formulario da caneca
  criarFormularioCaneca(): FormGroup {
    return this.fb.group({
      id: [null],
      nomeModelo: [''],
      velocidade: [null],
      passo: [null],
      capacidade: [null],
      volumeBorda: [null],
      resistenciaBrasao: [null],
      volumeCaneca: [null],
      enchimento: [null],
      resistenciaTracao: [null],
      deslocamento: [null],
      profundidade: [null],
      largura: [null],
      projecao: [null],
      densidade: [null],
      numeroDeFileiras: [null],
      canecasMetro: [null],
      precoUnidade: [null],
      precoMetro: [null]
    });
  }

  ngOnInit(): void {
    // inputs como readOnly
    this.formCanecaA.disable();
    this.formCanecaB.disable();

    this.canecaService.buscarCanecas().subscribe(canecas => {
      this.catalogoCanecas = canecas;
    });

    // junta os valores dos 2 formularios
    merge(this.formCanecaA.valueChanges, this.formCanecaB.valueChanges)
      .pipe(debounceTime(300))
      .subscribe(() => {
        // calcula as diferencas
        this.calcularDiferencas();
      });
  }

  // metodo para selecionar uma caneca
  onCatalogoSelect(event: Event, form: FormGroup): void {
    const selectEl = event.target as HTMLSelectElement;
    // Se o valor for "null" (string), reseta
    if (selectEl.value === 'null') {
      form.reset();
      return;
    }

    const canecaId = Number(selectEl.value);
    const canecaSelecionada = this.catalogoCanecas.find(c => c.id === canecaId);

    // se uma caneca foi selecionada
    if (canecaSelecionada) {
      // o form é preenchido
      form.patchValue(canecaSelecionada);
    } else {
      // se nao, reseta o form
      form.reset();
    }
  }

  onSubmit() {
    // pega todos os valores das canecas
    const canecaA = this.formCanecaA.getRawValue();
    const canecaB = this.formCanecaB.getRawValue();

    // se nao tiver nenhum id (caneca) selecionado, mostra alerta de erro
    if (!canecaA.id || !canecaB.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Seleção Incompleta',
        text: 'Por favor, selecione as duas canecas para realizar a comparação.',
        confirmButtonColor: '#145DFC',
        heightAuto: false
      });
      return;
    }

    this.estaCarregandoRelatorio = true;

    // objeto final para envio é montado
    const dadosComparacao = {
      caneca1: canecaA,
      caneca2: canecaB,
      diferencasAbsolutas: this.diferencas,
      diferencasPorcentagem: this.porcentagens,
      idCaneca1: canecaA.id,
      idCaneca2: canecaB.id
    };

    this.calculadoraService.salvarComparacao(dadosComparacao).subscribe({
      next: (res) => {

        // 2. Após salvar, gera o PDF (obtém o Blob)
        this.calculadoraService.gerarRelatorioComparacao(res.idHistoricoComparacao).subscribe({
          next: (pdfBlob) => {
            this.estaCarregandoRelatorio = false;

            // 3. Exibe o alerta com o PDF já "na mão"
            Swal.fire({
              title: 'Comparação Salva!',
              text: 'Deseja baixar o relatório em PDF agora?',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não',
              confirmButtonColor: '#145DFC',
              cancelButtonColor: '#d33'
            }).then((result) => {
              if (result.isConfirmed) {
                // se for confirmado, baixa o arquivo
                this.downloadArquivoService.baixarArquivo(pdfBlob, this.downloadArquivoService.gerarNomeRelatorioComparacao());
              }
            });
          },
          error: (err) => {
            this.estaCarregandoRelatorio = false;
            console.error(err);
            Swal.fire('Erro', 'Falha ao gerar o PDF do relatório.', 'error');
          }
        });
      },
      error: (err) => {
        this.estaCarregandoRelatorio = false;
        console.error(err);
        Swal.fire('Erro', 'Falha ao salvar a comparação.', 'error');
      }
    });
  }

  calcularDiferencas(): void {
    // getRawValue() é necessário porque .value ignora campos disabled
    const valA = this.formCanecaA.getRawValue();
    const valB = this.formCanecaB.getRawValue();

    // calcula a diferença de todos os campos
    this.diferencas.velocidade = (valA.velocidade || 0) - (valB.velocidade || 0);
    this.diferencas.passo = (valA.passo || 0) - (valB.passo || 0);
    this.diferencas.capacidade = (valA.capacidade || 0) - (valB.capacidade || 0);
    this.diferencas.volumeBorda = (valA.volumeBorda || 0) - (valB.volumeBorda || 0);
    this.diferencas.resistenciaBrasao = (valA.resistenciaBrasao || 0) - (valB.resistenciaBrasao || 0);
    this.diferencas.volumeCaneca = (valA.volumeCaneca || 0) - (valB.volumeCaneca || 0);
    this.diferencas.enchimento = (valA.enchimento || 0) - (valB.enchimento || 0);
    this.diferencas.resistenciaTracao = (valA.resistenciaTracao || 0) - (valB.resistenciaTracao || 0);
    this.diferencas.deslocamento = (valA.deslocamento || 0) - (valB.deslocamento || 0);
    this.diferencas.densidade = (valA.densidade || 0) - (valB.densidade || 0);
    this.diferencas.numeroDeFileiras = (valA.numeroDeFileiras || 0) - (valB.numeroDeFileiras || 0);
    this.diferencas.canecasMetro = (valA.canecasMetro || 0) - (valB.canecasMetro || 0);
    this.diferencas.precoUnidade = (valA.precoUnidade || 0) - (valB.precoUnidade || 0);
    this.diferencas.precoMetro = (valA.precoMetro || 0) - (valB.precoMetro || 0);

    // calcula a diferença em porcentagem
    this.porcentagens.velocidade = this.calcularPct(valA.velocidade, valB.velocidade);
    this.porcentagens.passo = this.calcularPct(valA.passo, valB.passo);
    this.porcentagens.capacidade = this.calcularPct(valA.capacidade, valB.capacidade);
    this.porcentagens.volumeBorda = this.calcularPct(valA.volumeBorda, valB.volumeBorda);
    this.porcentagens.resistenciaBrasao = this.calcularPct(valA.resistenciaBrasao, valB.resistenciaBrasao);
    this.porcentagens.volumeCaneca = this.calcularPct(valA.volumeCaneca, valB.volumeCaneca);
    this.porcentagens.enchimento = this.calcularPct(valA.enchimento, valB.enchimento);
    this.porcentagens.resistenciaTracao = this.calcularPct(valA.resistenciaTracao, valB.resistenciaTracao);
    this.porcentagens.deslocamento = this.calcularPct(valA.deslocamento, valB.deslocamento);
    this.porcentagens.densidade = this.calcularPct(valA.densidade, valB.densidade);
    this.porcentagens.numeroDeFileiras = this.calcularPct(valA.numeroDeFileiras, valB.numeroDeFileiras);
    this.porcentagens.canecasMetro = this.calcularPct(valA.canecasMetro, valB.canecasMetro);
    this.porcentagens.precoUnidade = this.calcularPct(valA.precoUnidade, valB.precoUnidade);
    this.porcentagens.precoMetro = this.calcularPct(valA.precoMetro, valB.precoMetro);
  }

  gerarRelatorio(): void {
    // 1. Validação: Verifica se as duas canecas foram selecionadas
    // getRawValue() é essencial aqui pois os inputs estão desativados (disabled)
    const valA = this.formCanecaA.getRawValue();
    const valB = this.formCanecaB.getRawValue();

    // Verifica se tem ID (significa que veio do catálogo)
    if (!valA.id || !valB.id) {
      Swal.fire('Atenção', 'Selecione dois modelos de caneca para comparar.', 'warning');
      return;
    }

    this.estaCarregandoRelatorio = true;

    // 2. Monta o Payload (Objeto para salvar)
    const dadosComparacao = {
      // Envia os objetos completos ou apenas IDs, dependendo do seu Backend
      caneca1: valA,
      caneca2: valB,
      // Opcional: Se seu backend espera IDs explicitamente
      idCaneca1: valA.id,
      idCaneca2: valB.id
    };

    // 3. Fluxo: Salvar -> Pegar ID -> Gerar PDF
    this.calculadoraService.salvarComparacao(dadosComparacao).pipe(
      // switchMap pega a resposta do 'salvar' e inicia a requisição do 'relatorio'
      switchMap((respostaSalvar: any) => {
        // Supondo que o backend retorne o objeto salvo com o ID
        const idCalculo = respostaSalvar.id;

        // Chama o endpoint que gera o PDF (blob)
        return this.calculadoraService.gerarRelatorioComparacao(idCalculo);
      })
    ).subscribe({
      next: (pdfBlob) => {
        this.estaCarregandoRelatorio = false;

        // Gera um nome de arquivo dinâmico
        const nomeArquivo = `Comparativo_${valA.nomeModelo}_vs_${valB.nomeModelo}.pdf`;

        // Chama seu serviço de download
        this.downloadArquivoService.baixarArquivo(pdfBlob, nomeArquivo);

        Swal.fire({
          icon: 'success',
          title: 'Relatório Gerado!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (err) => {
        this.estaCarregandoRelatorio = false;
        console.error(err);
        Swal.fire('Erro', 'Falha ao salvar ou gerar o relatório.', 'error');
      }
    });
}

  // TRANSFORMAR DIMENSÕES EM UM ÚNICO RESULTADO
  getDimensoesFormatadas(form: FormGroup): string {
    const val = form.getRawValue();
    if (!val.largura && !val.profundidade && !val.projecao) return '';
    // Formato: Largura x Projeção x Profundidade
    return `${val.largura || 0} x ${val.projecao || 0} x ${val.profundidade || 0}`;
  }

  // passa os 2 valores
  // retorna a porcentagem da diferença
  calcularPct(valA: number, valB: number): number {
    if(valA == 0 || valB == 0 || valA == null || valB == null) {
      return 100
    }
    return ((valA - valB) / valB) * 100
  }

  // TRANSFORMAR DIMENSÕES EM UM ÚNICO RESULTADO ~
  // largura - profundidade - projecao
  getDimensoesDiferenca(): string {
    const valA = this.formCanecaA.getRawValue();
    const valB = this.formCanecaB.getRawValue();

    // calcula a diferença das dimensoes
    const difL = (valA.largura || 0) - (valB.largura || 0);
    const difP = (valA.projecao || 0) - (valB.projecao || 0);
    const difProf = (valA.profundidade || 0) - (valB.profundidade || 0);

    const fmt = (n: number) => (n > 0 ? `+${n}` : `${n}`);

    // retorna as dimensoes formatadas L : P : A
    return `L:${fmt(difL)} | P:${fmt(difP)} | A:${fmt(difProf)}`;
  }

  // helper para diferença de valores (+ = verde / - = vermelho)
  getDiferencaClass(valor: number): string {
    if (valor > 0) return 'text-green-600 font-bold';
    if (valor < 0) return 'text-red-500 font-bold';
    return 'text-gray-400';
  }

  // helper para diferença de preço
  // ao contrario, pois se for positivo significa que é mais caro
  getDiferencaPrecoClass(valor: number): string {
    if (valor > 0) return 'text-red-500 font-bold';   // Ficou mais caro
    if (valor < 0) return 'text-green-600 font-bold'; // Ficou mais barato
    return 'text-gray-400';
  }

}
