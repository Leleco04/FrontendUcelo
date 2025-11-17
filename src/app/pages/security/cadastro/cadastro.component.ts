import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {

  dadosCadastro = {
    cnpj: '',
    nomeEmpresa: '',
    email: '',
    senha: '',
  }

  erro: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  irLogin() {
    this.router.navigate(["/login"])
  }

  onSubmit(): void {
    this.authService.registrar(this.dadosCadastro).subscribe(
      () => {
        // Sucesso! Redireciona para o login
        this.router.navigate(['/login']);
      },
      (err) => {
        // Exibe o erro
        if(
          this.dadosCadastro.cnpj.length == 0 ||
          this.dadosCadastro.email.length == 0 ||
          this.dadosCadastro.senha.length == 0 ||
          this.dadosCadastro.nomeEmpresa.length == 0
        ) {
          Swal.fire({
                    icon: 'error',
                    title: 'ERRO!',
                    text: 'Por favor, preencha todos os campos corretamente.',
        });
        }

        return;
      }
    );
  }

}
