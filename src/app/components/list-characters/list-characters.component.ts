import { Component, OnInit, inject, signal } from '@angular/core';
import { RickApiService } from '../../service/rickapi.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InputSearchComponent } from '../input-search/input-search.component';
import { PaginationComponent } from '../pagination/pagination.component';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: object;
  image: string;
  episode: object[];
  url: string;
  created: string;
}

interface Origin {
  name?: string;
  url?: string;
}

@Component({
  selector: 'list-characters',
  standalone: true,
  imports: [CommonModule, RouterLink, InputSearchComponent, PaginationComponent],
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.css'],
})
export class ListCharactersComponent implements OnInit {
  public rickApiService = inject(RickApiService);

  public setCharacters = signal<null | Character[]>(null);
  public getCharacters = signal<null | Character[]>(null);

  ngOnInit() {
    this.loadCharacters();
    this.rickApiService.getAllCharacters$().subscribe({
      next: (res) => {
        this.setCharacters.set(res.results);
        this.getCharacters.set(res.results);
      }
    });
  }

  loadCharacters() {
    this.rickApiService.getAllCharacters$().subscribe({
      next: (res) => {
        this.setCharacters.set(res.results);
        this.getCharacters.set(res.results);
      }
    });
  }

  public getSearch(value: string) {
    const characters = this.setCharacters();
    if (characters) {
      const filter = characters.filter((res: Character) => {
        return res.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      });
      this.getCharacters.set(filter);
    } else {
      this.getCharacters.set([]);
    }
  }
}
