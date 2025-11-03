import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CalculoCapacidadeComponent } from './pages/calculo-capacidade/calculo-capacidade.component';
import { SobreComponent } from './pages/sobre/sobre.component';

const routes: Routes = [
    {path: '', component: HomeComponent,},
    {path: 'calculadora-capacidade', component: CalculoCapacidadeComponent},
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