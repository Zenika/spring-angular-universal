import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  standalone: true
})
export class AppComponent {
  title = 'ts';
}
