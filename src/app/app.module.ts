import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CalculoCapacidadeComponent } from './pages/calculos/calculo-capacidade/calculo-capacidade.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CalculoVelocidadeComponent } from './pages/calculos/calculo-velocidade/calculo-velocidade.component';
import { LoginComponent } from './pages/security/login/login.component';
import { CadastroComponent } from './pages/security/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    CalculoCapacidadeComponent,
    CalculoVelocidadeComponent,
    LoginComponent,
    CadastroComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
