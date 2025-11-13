import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { PopupEscolhaOperacaoComponent } from './components/popup-escolha-operacao/popup-escolha-operacao.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PopupEscolhaOperacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    NavbarComponent,
    PopupEscolhaOperacaoComponent,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class SharedModule { }
