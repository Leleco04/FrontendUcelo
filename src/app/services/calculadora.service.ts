import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// interface para a resposta do calculo de capacidade
export interface CalculoCapacidadeResponse {
  id: number;
  capacidadeCalculada: number;
  unidade: string;
}

// interface para a resposta do calculo de velocidade
export interface CalculoVelocidadeResponse {
  id: number
  velocidadeCalculada: number;
  unidade: string;
}

export interface CalculoComparacaoResponse {
  idHistoricoComparacao: number;
}

@Injectable({
  providedIn: 'root'
})

export class CalculadoraService {
  // rota base da api
  private apiUrl = 'http://localhost:8080/api/calculos';

  constructor(private http: HttpClient) { }

  // metodo para calcular a capacidade
  calcularCapacidade(dadosForm: any): Observable<CalculoCapacidadeResponse> {
    return this.http.post<CalculoCapacidadeResponse>(`${this.apiUrl}/capacidade`, dadosForm);
  }

  // metodo para gerar o relatorio do calculo de capacidade
  gerarRelatorioCapacidade(idCalculo: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/capacidade/relatorio/${idCalculo}`, {
      responseType: 'blob'
    });
  }

  salvarComparacao(dadosComparacao: any): Observable<CalculoComparacaoResponse> {
    console.log(dadosComparacao)
    return this.http.post<CalculoComparacaoResponse>(`${this.apiUrl}/comparacao`, dadosComparacao);
  }

  // metodo para gerar o relatorio do calculo de comparacao
  gerarRelatorioComparacao(idCalculo: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/comparacao/relatorio/${idCalculo}`, {
      responseType: 'blob'
    });
  }

  // metodo para calcular a velocidade
  calcularVelocidade(dadosForm: any): Observable<CalculoVelocidadeResponse> {
    return this.http.post<CalculoVelocidadeResponse>(`${this.apiUrl}/velocidade`, dadosForm);
  }

  // metodo para gerar o relatorio do calculo de velocidade
  gerarRelatorioVelocidade(idCalculo: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/velocidade/relatorio/${idCalculo}`, {
      // tipo de resposta "blob"
        responseType: 'blob'
    });
  }

}
