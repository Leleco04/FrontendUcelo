import { Component } from '@angular/core';
import { PopupEscolhaOperacaoComponent } from '../popup-escolha-operacao/popup-escolha-operacao.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}

  abrirPopup(): void {
    this.dialog.open(PopupEscolhaOperacaoComponent, {
      width: '500px'
    });
    this.menuResponsivoAberto = false;
  }

  irHome() {
    this.router.navigate([''])
    this.menuResponsivoAberto = false;
  }

  irSobre() {
    this.router.navigate(['/sobre'])
    this.menuResponsivoAberto = false;
  }

  irLogin() {
    this.router.navigate(['/login'])
    this.menuResponsivoAberto = false;
  }

  irCadastro() {
    this.router.navigate(['/cadastro'])
    this.menuResponsivoAberto = false;
  }

  menuResponsivoAberto = false; // Controla o estado do menu

  toggleMobileMenu() {
    this.menuResponsivoAberto = !this.menuResponsivoAberto;
  }
}
