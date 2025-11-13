import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupEscolhaOperacaoComponent } from '../../shared/components/popup-escolha-operacao/popup-escolha-operacao.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  constructor(public dialog: MatDialog) {}

  abrirPopup(): void {
    this.dialog.open(PopupEscolhaOperacaoComponent, {
      width: '500px'
    });
  }

} 