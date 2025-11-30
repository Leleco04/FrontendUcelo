import { AuthService } from './../../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  credenciais = {
    cnpj: '',
    senha: ''
  }

  erro: string = ''

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  irCadastro() {
    this.router.navigate(['/cadastro'])
  }

  onSubmit(): void {
    this.authService.login(this.credenciais).subscribe(
      () => {
        // Sucesso! Redireciona para o dashboard (ou home protegida)
        this.router.navigate(['/']);
      },
      (err) => {
        if(
            this.credenciais.cnpj.length == 0 ||
            this.credenciais.senha.length == 0
          ) {
              Swal.fire({
                icon: 'error',
                title: 'ERRO!',
                text: 'Por favor, preencha todos os campos corretamente.',
                heightAuto: false
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ERRO!',
                text: 'CNPJ ou senha incorretos.',
                heightAuto: false
              });
            }
      }
    );
  }

}
