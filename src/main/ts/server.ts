import 'zone.js/dist/zone-node';
import '@angular/localize/init';

import { renderApplication } from '@angular/platform-server'
import { AppComponent } from './src/app/app.component'
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router'
import { routes } from './src/app-routes'

declare let render: (template: string, model: Map<string, any>) => Promise<string>

render = (template: string, model: Map<string, any>) => renderApplication(AppComponent, {
  appId: 'server-app',
  document: template,
  url: model.get("url") ?? "",
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation()
    ),
  ]
})

