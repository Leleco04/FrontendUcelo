import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculoCapacidadeComponent } from './pages/calculos/calculo-capacidade/calculo-capacidade.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { CalculoVelocidadeComponent } from './pages/calculos/calculo-velocidade/calculo-velocidade.component';
import { CadastroComponent } from './pages/security/cadastro/cadastro.component';
import { LoginComponent } from './pages/security/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { HistoricoCalculosComponent } from './pages/calculos/historico-calculos/historico-calculos.component';

const routes: Routes = [
    {path: '', component: HomeComponent,},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'sobre', component: SobreComponent},

    {
      path: 'calculadora-capacidade',
      component: CalculoCapacidadeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'calculadora-velocidade',
      component: CalculoVelocidadeComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'historico-calculos',
      component: HistoricoCalculosComponent,
      canActivate: [AuthGuard]
    },
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
