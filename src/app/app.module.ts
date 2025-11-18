import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CalculoCapacidadeComponent } from './pages/calculos/calculo-capacidade/calculo-capacidade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CalculoVelocidadeComponent } from './pages/calculos/calculo-velocidade/calculo-velocidade.component';
import { LoginComponent } from './pages/security/login/login.component';
import { CadastroComponent } from './pages/security/cadastro/cadastro.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { HistoricoCalculosComponent } from './pages/calculos/historico-calculos/historico-calculos.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComparacaoCanecasComponent } from './pages/calculos/comparacao-canecas/comparacao-canecas.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    CalculoCapacidadeComponent,
    CalculoVelocidadeComponent,
    LoginComponent,
    CadastroComponent,
    HistoricoCalculosComponent,
    ComparacaoCanecasComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
