import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-escolha-operacao',
  standalone: false,
  templateUrl: './popup-escolha-operacao.component.html',
  styleUrl: './popup-escolha-operacao.component.css'
})

export class PopupEscolhaOperacaoComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupEscolhaOperacaoComponent>,
    private router: Router
  ) {}

  escolher(tipoCalculo: string): void {
    const rota = '/calculadora-' + tipoCalculo;
    this.router.navigate([rota]);
    
    this.dialogRef.close(); 
  }

  fechar(): void {
    this.dialogRef.close();
  }
}