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

    if (this.isFormularioInvalido()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos!',
        text: 'Por favor, preencha todos os campos antes de continuar.',
        confirmButtonColor: '#145DFC'
      });
      return; // Para a execução aqui se tiver erro
    }

    this.authService.registrar(this.dadosCadastro).subscribe({
      next: () => {
        // Sucesso!
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Cadastro realizado com sucesso!',
          timer: 500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        // Erro vindo do Backend (Ex: Email duplicado, erro de servidor)
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Erro no Cadastro',
          text: 'Ocorreu um erro ao tentar cadastrar. Verifique os dados ou tente novamente mais tarde.',
          confirmButtonColor: '#d33'
        });
      }
    });
  }

  isFormularioInvalido(): boolean {
      return !this.dadosCadastro.nomeEmpresa ||
              !this.dadosCadastro.email ||
              !this.dadosCadastro.cnpj ||
              !this.dadosCadastro.senha;
    }

}
