import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ... outros imports
import { AppRoutingModule } from './app-routing.module'; // <-- GARANTA QUE ISSO ESTÁ AQUI
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }