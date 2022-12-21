import 'zone.js/dist/zone-node';
import '@angular/localize/init';

import { renderApplication } from '@angular/platform-server'
import { AppComponent } from './src/app/app.component'
import { provideRouter } from '@angular/router'
import { routes } from './src/app-routes'

declare function setHtmlContent (html: string): void
declare let template: string
declare let url: string

renderApplication(AppComponent, {
  appId: 'server-app',
  document: template,
  url: '/',
  providers: [
    provideRouter(routes),
  ]
}).then(html => setHtmlContent(html))
