import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    // RouterLink
  ],
  standalone: true
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

}
