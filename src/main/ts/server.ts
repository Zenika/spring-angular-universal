import 'zone.js/dist/zone-node';
import { renderApplication } from '@angular/platform-server'
import { AppComponent } from './src/app/app.component'

declare function setHtmlContent (html: string): void
declare let template: string

renderApplication(AppComponent, {
  appId: 'server-app',
  document: template
}).then(html => setHtmlContent(html))
