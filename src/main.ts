import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle'

register();

platformBrowserDynamic().bootstrapModule(AppModule, {ngZoneEventCoalescing: true })
  .catch(err => console.error(err));
