import { Component, OnInit } from '@angular/core';
import { Caneca } from '../../../models/caneca.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanecaService } from '../../../services/caneca.service';
import { debounceTime, merge } from 'rxjs';

@Component({
  selector: 'app-comparacao-canecas',
  standalone: false,
  templateUrl: './comparacao-canecas.component.html',
  styleUrl: './comparacao-canecas.component.css'
})

export class ComparacaoCanecasComponent implements OnInit{

  // 2 formularios para a comparação
  formCanecaA: FormGroup;
  formCanecaB: FormGroup;

  // para salvar o catalogo de canecas
  catalogoCanecas: Caneca[] = []

  // tabela do meio
  diferencas = {
    volumeCaneca: 0.0,
    capacidade: 0.0,
    volumeBorda: 0.0,
    enchimento: 0.0,
    resistenciaBrasao: 0.0,
    resistenciaTracao: 0.0,
    deslocamento: 0.0,
    profundidade: 0.0,
    largura: 0.0,
    projecao: 0.0,
    velocidade: 0.0,
    densidade: 0.0,
    numeroDeFileiras: 0,
    canecasMetro: 0,
    passo: 0.0,
  };

  // construtor iniciando os forms
  constructor(
    private fb: FormBuilder,
    private canecaService: CanecaService
  ) {
    this.formCanecaA = this.criarFormularioCaneca();
    this.formCanecaB = this.criarFormularioCaneca();
  }

  // metodo para Criar um formulário vazio
  criarFormularioCaneca(): FormGroup {
    return this.fb.group({
      id: [null],
      nomeModelo: [''],
      volumeCaneca: [null],
      capacidade: [null],
      volumeBorda: [null],
      enchimento: [null],
      resistenciaBrasao: [null],
      resistenciaTracao: [null],
      deslocamento: [null],
      profundidade: [null],
      largura: [null],
      projecao: [null],
      velocidade: [null],
      densidade: [null],
      numeroDeFileiras: [null],
      canecasMetro: [null],
      passo: [null]
    });
  }

  ngOnInit(): void {
    // busca o catálogo de canecas da API quando o componente carregar
    this.canecaService.buscarCanecas().subscribe(canecas => {
      this.catalogoCanecas = canecas;
    });

    // calcula as diferencas nos 2 forms
    // merge combina os 2 forms em um so
    // dobouncetime vai dar um delay apos o usuario digitar
    merge(this.formCanecaA.valueChanges, this.formCanecaB.valueChanges)
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.calcularDiferencas();
      });
  }

  // quando o catalogo for selecionado
  onCatalogoSelect(event: Event, form: FormGroup): void {
    const selectEl = event.target as HTMLSelectElement;
    const canecaId = Number(selectEl.value);

    // encontra a caneca no catalogo de acordo com o id da caneca
    const canecaSelecionada = this.catalogoCanecas.find(c => c.id === canecaId);

    if (canecaSelecionada) {
      // o a funcao patchvalue preenche o form de acordo com os dados da caneca selecionada
      form.patchValue(canecaSelecionada);
    } else {
      // preencher manualmente reseta o form
      form.reset();
    }
  }

  // calcula as diferencas dos campos
  calcularDiferencas(): void {
    const valA = this.formCanecaA.value;
    const valB = this.formCanecaB.value;

    // (valA.x || 0) previne erros se o campo estiver vazio/nulo
    this.diferencas.velocidade = (valA.velocidade || 0) - (valB.velocidade || 0);
    this.diferencas.capacidade = (valA.capacidade || 0) - (valB.capacidade || 0);
    this.diferencas.volumeBorda = (valA.volumeBorda || 0) - (valB.volumeBorda || 0);
    this.diferencas.resistenciaBrasao = (valA.resistenciaBrasao || 0) - (valB.resistenciaBrasao || 0);
    this.diferencas.volumeCaneca = (valA.volumeCaneca || 0) - (valB.volumeCaneca || 0);
    this.diferencas.enchimento = (valA.enchimento || 0) - (valB.enchimento || 0);
    this.diferencas.resistenciaTracao = (valA.resistenciaTracao || 0) - (valB.resistenciaTracao || 0);
    this.diferencas.deslocamento = (valA.deslocamento || 0) - (valB.deslocamento || 0);
    this.diferencas.profundidade = (valA.profundidade || 0) - (valB.profundidade || 0);
    this.diferencas.largura = (valA.largura || 0) - (valB.largura || 0);
    this.diferencas.projecao = (valA.projecao || 0) - (valB.projecao || 0);
    this.diferencas.densidade = (valA.densidade || 0) - (valB.densidade || 0);
    this.diferencas.numeroDeFileiras = (valA.numeroDeFileiras || 0) - (valB.numeroDeFileiras || 0);
    this.diferencas.canecasMetro = (valA.canecasMetro || 0) - (valB.canecasMetro || 0);
    this.diferencas.passo = (valA.passo || 0) - (valB.passo || 0);
  }

  // helper para o html
  getDiferencaClass(valor: number): string {
    // se o valor retornado (diferenca) for maior que 0 = fonte verde
    if (valor > 0) return 'text-green-500 font-bold';
    // se o valor retornado (diferenca) for menor que 0 = fonte vermelho
    if (valor < 0) return 'text-red-500 font-bold';
    return 'text-gray-400';
  }

}
