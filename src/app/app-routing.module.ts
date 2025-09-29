import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 2. Cole o array de rotas aqui
const routes: Routes = [
    {
        
    },
    // ...outras rotas que você tenha definido
];

@NgModule({
  // 3. Configure o RouterModule usando o array de rotas
  imports: [RouterModule.forRoot(routes)],
  // 4. Exporte o RouterModule para que o AppModule possa usá-lo
  exports: [RouterModule]
})
export class AppRoutingModule { }