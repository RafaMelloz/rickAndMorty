import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';


interface apiData {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string
  },
  results: Character[]
}
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

@Injectable({
  providedIn: 'root'
})
export class RickApiService {
  public page: number = 1;
  #http = inject(HttpClient);
  private pageSubject = new BehaviorSubject<number>(this.page);
  private url$ = this.pageSubject.asObservable().pipe(
    map(page => `https://rickandmortyapi.com/api/character?page=${page}`)
  );

  public getAllCharacters$(): Observable<apiData> {
    return this.url$.pipe(
      switchMap(url => this.#http.get<apiData>(url))
    );
  }

  public getCharacter$(url: string): Observable<Character> {
    return this.#http.get<Character>(url).pipe(map(res => res));
  }

  public setPage(page: number): void {
    this.page = page;
    this.pageSubject.next(this.page);
  }
}


