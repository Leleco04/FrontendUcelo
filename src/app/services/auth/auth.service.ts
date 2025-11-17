import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Define a rota base da api de autenticação
  private apiUrl = 'http://localhost:8080/api/auth'
  private tokenKey = 'auth-token'

  private logado = new BehaviorSubject<boolean>(this.temToken())
  public estaLogado$ = this.logado.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private temToken(): boolean {
    return !!localStorage.getItem(this.tokenKey)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  registrar(dadosUsuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, dadosUsuario)
  }

  login(credenciais: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciais).pipe(
      tap(resposta => {
        // A API retorna um objeto { token: "..." }
        if (resposta && resposta.token) {
          localStorage.setItem(this.tokenKey, resposta.token);
          this.logado.next(true); // Atualiza o estado para "logado"
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.logado.next(false); // Atualiza o estado para "deslogado"
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

}
