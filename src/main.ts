import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppModule, {
  // A configuração de "eventCoalescing" que estava no app.config.ts vem para cá
  ngZoneEventCoalescing: true 
})
  .catch(err => console.error(err));
