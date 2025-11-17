import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface para a Resposta Paginada do Spring
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

// Interface para o Histórico de Capacidade
export interface HistoricoCapacidade {
  id: number;
  cnpj: string;
  velocidade: number;
  passo: number;
  numFileirasCorreia: number; // (Nome vindo do seu DTO)
  profundidade: number;
  volumeCaneca: number;
  largura: number;
  projecao: number;
  fatorEnchimento: number;
  capacidadeCalculada: number;
  unidade: string;
  densidadeProduto: number;
}

// Interface para o Histórico de Velocidade
export interface HistoricoVelocidade {
  id: number;
  cnpj: string;
  diametroTambor: number;
  rotacaoDoTambor: number;
  velocidadeCalculada: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private apiUrl = 'http://localhost:8080/api/calculos';

  constructor(private http: HttpClient) { }

  getHistoricoCapacidade(page: number, size: number): Observable<Page<HistoricoCapacidade>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,desc');

    return this.http.get<Page<HistoricoCapacidade>>(
      `${this.apiUrl}/capacidade/historico`,
      { params }
    );
  }

  getHistoricoVelocidade(page: number, size: number): Observable<Page<HistoricoVelocidade>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,desc');

    return this.http.get<Page<HistoricoVelocidade>>(
      `${this.apiUrl}/velocidade/historico`,
      { params }
    );
  }

  // metodo para gerar o relatorio de calculo de capacidade
  gerarRelatorioCapacidade(calculo: HistoricoCapacidade): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/capacidade/relatorio`, calculo, {
      // diz para tratar o tipo de resposta como arquivo "blob"
      responseType: 'blob'
    });
  }

  // metodo para gerar o relatorio de calculo de velocidade
  gerarRelatorioVelocidade(calculo: HistoricoVelocidade): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/velocidade/relatorio`, calculo, {
      // diz para tratar o tipo de resposta como arquivo "blob"
      responseType: 'blob'
    });
  }
}
