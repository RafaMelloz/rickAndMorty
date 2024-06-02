import { Component, OnInit, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RickApiService } from '../../service/rickapi.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: object,
  location: object,
  image: string,
  episode: object[],
  url: string,
  created: string
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterLink],
  templateUrl: './details.component.html',

})
export class DetailsComponent implements OnInit {

  #route = inject(ActivatedRoute);
  #api = inject(RickApiService);
  public urlCharacter: string = 'https://rickandmortyapi.com/api/character';
  public characterDetails = signal<null | Character>(null)

  ngOnInit(): void {
    const idParams = this.#route.snapshot.params['id'];
    this.#api.getCharacter$(`${this.urlCharacter}/${idParams}`).subscribe({
      next: (res) => {
        this.characterDetails.set(res)
      }
    })
  }
}
