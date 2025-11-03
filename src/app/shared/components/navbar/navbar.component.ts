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
  }

  irHome() {
    this.router.navigate([''])
  }

  irSobre() {
    this.router.navigate(['/sobre'])
  }

}