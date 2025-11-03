import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CalculoCapacidadeResponse {
  capacidadeCalculada: number;
  unidade: string;
}

@Injectable({
  providedIn: 'root'
})

export class CalculadoraService {
  private apiUrl = 'http://localhost:8080/api/calculos';

  constructor(private http: HttpClient) { }

  calcularCapacidade(dadosForm: any): Observable<CalculoCapacidadeResponse> {
    return this.http.post<CalculoCapacidadeResponse>(`${this.apiUrl}/capacidade`, dadosForm);
  }
}