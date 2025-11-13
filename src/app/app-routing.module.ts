import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculoCapacidadeComponent } from './pages/calculos/calculo-capacidade/calculo-capacidade.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CalculoVelocidadeComponent } from './pages/calculos/calculo-velocidade/calculo-velocidade.component';
import { CadastroComponent } from './pages/security/cadastro/cadastro.component';
import { LoginComponent } from './pages/security/login/login.component';

const routes: Routes = [
    {path: '', component: HomeComponent,},
    {path: 'calculadora-capacidade', component: CalculoCapacidadeComponent},
    {path: 'calculadora-velocidade', component: CalculoVelocidadeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'sobre', component: SobreComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
