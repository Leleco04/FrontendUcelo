import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // Usamos o método síncrono hasToken() para o guard
    if (this.authService.getToken()) {
      return true; // Usuário está logado, pode acessar
    }

    Swal.fire({
      icon: 'error',
      title: 'ERRO!',
      text: 'Faça login para continuar.',
    });

    // Usuário não está logado, redireciona para a página de login
    this.router.navigate(['/login']);
    return false;
  }
}
