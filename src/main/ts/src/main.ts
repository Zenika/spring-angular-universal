import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { provideRouter, withDebugTracing } from '@angular/router'
import { routes } from './app-routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
]
})
  .catch(err => console.error(err));
