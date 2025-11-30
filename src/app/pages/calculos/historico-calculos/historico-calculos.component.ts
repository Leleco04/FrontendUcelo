import { HistoricoService } from '../../../services/historico.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HistoricoCapacidade, HistoricoVelocidade } from '../../../services/historico.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DownloadArquivoService } from '../../../services/download-arquivo.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-historico-calculos',
  standalone: false,
  templateUrl: './historico-calculos.component.html',
  styleUrls: ['./historico-calculos.component.css'] // (CSS adicionado)
})

export class HistoricoCalculosComponent implements OnInit, AfterViewInit {

  // --- Colunas de Capacidade (sem 'unidade') ---
  columnsCapacidade: string[] =
  [
    'id',
    'velocidade',
    'passo',
    'numFileirasCorreia',
    'densidadeProduto',
    'volumeCaneca',
    'fatorEnchimento',
    'dimensoes', // Coluna combinada
    'capacidadeCalculada',
    'dataCalculo',
    'acoes',
  ];
  dataSourceCapacidade = new MatTableDataSource<HistoricoCapacidade>();
  totalCapacidade = 0;
  pageSizeCapacidade = 10;
  paginaCapacidade = 0;
  loadingCapacidade = true;

  // --- Colunas de Velocidade (sem 'unidade') ---
  columnsVelocidade: string[] =
  [
    'id',
    'diametroTambor',
    'rotacaoDoTambor',
    'velocidadeCalculada',
    'dataCalculo',
    'acoes',
  ];
  dataSourceVelocidade = new MatTableDataSource<HistoricoVelocidade>();
  totalVelocidade = 0;
  pageSizeVelocidade = 10;
  paginaVelocidade = 0;
  loadingVelocidade = false;
  velocidadeJaCarregada = false;

  idsBaixando = new Set<number>()

  @ViewChild('paginatorCapacidade') paginatorCapacidade!: MatPaginator;
  @ViewChild('paginatorVelocidade') paginatorVelocidade!: MatPaginator;

  // --- CORREÇÃO DO CONSTRUTOR ---
  // A variável 'historicoService' deve ser minúscula
  constructor(
    private historicoService: HistoricoService,
    private downloadArquivoService: DownloadArquivoService
  ) {}

  ngOnInit(): void {
    this.carregarCapacidade();
  }

  ngAfterViewInit() {
    // this.dataSourceCapacidade.paginator = this.paginatorCapacidade;
    // this.dataSourceVelocidade.paginator = this.paginatorVelocidade;
  }

  // --- Métodos de Carregamento (usando 'this.historicoService') ---
  carregarCapacidade() {
    this.loadingCapacidade = true;
    this.historicoService.getHistoricoCapacidade(this.paginaCapacidade, this.pageSizeCapacidade)
      .subscribe(pagina => {
        this.loadingCapacidade = false;
        this.totalCapacidade = pagina.totalElements;
        this.dataSourceCapacidade.data = pagina.content;
      });
  }

  mudarPaginaCapacidade(event: PageEvent) {
    this.paginaCapacidade = event.pageIndex;
    this.pageSizeCapacidade = event.pageSize;
    this.carregarCapacidade();
  }

  carregarVelocidade() {
    this.loadingVelocidade = true;
    this.velocidadeJaCarregada = true;
    this.historicoService.getHistoricoVelocidade(this.paginaVelocidade, this.pageSizeVelocidade)
      .subscribe(pagina => {
        this.loadingVelocidade = false;
        this.totalVelocidade = pagina.totalElements;
        this.dataSourceVelocidade.data = pagina.content;
      });
  }

  mudarPaginaVelocidade(event: PageEvent) {
    this.paginaVelocidade = event.pageIndex;
    this.pageSizeVelocidade = event.pageSize;
    this.carregarVelocidade();
  }

  tabAlterada(event: MatTabChangeEvent) {
    if (event.index === 1 && !this.velocidadeJaCarregada) {
      this.carregarVelocidade();
    }
  }

  // metodo para baixar o relatorio de capacidade
  baixarRelatorioCapacidade(item: HistoricoCapacidade) {
    this.idsBaixando.add(item.id); // Ativa o spinner para este ID
    this.historicoService.gerarRelatorioCapacidade(item) // Envia o item completo
      .pipe(
        finalize(() => this.idsBaixando.delete(item.id)) // Remove o spinner ao finalizar
      )
      .subscribe(
        (blob) => {
          const filename = this.downloadArquivoService.gerarNomeRelatorioCapacidade();
          this.downloadArquivoService.baixarArquivo(blob, filename);
        },
        (erro) => {
          console.error('Erro ao baixar relatório de capacidade:', erro);
          // Adicione uma notificação para o usuário aqui (ex: MatSnackBar)
        }
      );
  }

  // metodo para baixar o relatorio de velocidade
  baixarRelatorioVelocidade(item: HistoricoVelocidade) {
    this.idsBaixando.add(item.id); // Ativa o spinner para este ID
    this.historicoService.gerarRelatorioVelocidade(item) // Envia o item completo
      .pipe(
        finalize(() => this.idsBaixando.delete(item.id)) // Remove o spinner ao finalizar
      )
      .subscribe(
        (blob) => {
          const filename = this.downloadArquivoService.gerarNomeRelatorioVelocidade();
          this.downloadArquivoService.baixarArquivo(blob, filename);
        },
        (erro) => {
          console.error('Erro ao baixar relatório de velocidade:', erro);
          // Adicione uma notificação para o usuário aqui (ex: MatSnackBar)
        }
      );
  }
}
