import 'zone.js/dist/zone-node';
import { renderApplication } from '@angular/platform-server'
import { AppComponent } from './src/app/app.component'

declare function setHtmlContent (html: string): void

renderApplication(AppComponent, {
  appId: 'server-app',
  document: '<app-root></app-root>'
}).then(html => setHtmlContent(html))
