import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ListCharactersComponent } from '../../components/list-characters/list-characters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ListCharactersComponent,],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
