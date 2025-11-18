import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caneca } from '../models/caneca.model';

@Injectable({
  providedIn: 'root'
})

export class CanecaService {
  private apiUrl = 'http://localhost:8080/api/canecas/todas';

  constructor(private http: HttpClient) { }

  buscarCanecas(): Observable<Caneca[]> {
    return this.http.get<Caneca[]>(this.apiUrl);
  }

}
