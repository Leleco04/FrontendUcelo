import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// interface para a resposta do calculo de capacidade
export interface CalculoCapacidadeResponse {
  capacidadeCalculada: number;
  unidade: string;
}

// interface para a resposta do calculo de velocidade
export interface CalculoVelocidadeResponse {
  velocidadeCalculada: number;
  unidade: string;
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
  gerarRelatorioCapacidade(dados: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/capacidade/relatorio`, dados, {
      // tipo de resposta "blob"
        responseType: 'blob'
    });
  }

  // metodo para calcular a velocidade
  calcularVelocidade(dadosForm: any): Observable<CalculoVelocidadeResponse> {
    return this.http.post<CalculoVelocidadeResponse>(`${this.apiUrl}/velocidade`, dadosForm);
  }

  // metodo para gerar o relatorio do calculo de velocidade
  gerarRelatorioVelocidade(dados: any): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/velocidade/relatorio`, dados, {
      // tipo de resposta "blob"
        responseType: 'blob'
    });
  }

}
